import {createHash} from 'node:crypto';
import {createClient} from '@supabase/supabase-js';
import {NextRequest,NextResponse} from 'next/server';
import {sendResultEmail} from '../../../lib/result-email';
import {calculate} from '../../../lib/engine';
export const dynamic='force-dynamic';
export async function GET(){return NextResponse.json({enabled:Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL&&process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY&&process.env.SUPABASE_SERVICE_ROLE_KEY)},{headers:{'Cache-Control':'no-store'}})}
export async function POST(request:NextRequest){
 if(request.headers.get('origin')!==`${request.nextUrl.protocol}//${request.headers.get('host')}`)return NextResponse.json({error:'허용되지 않은 요청입니다.'},{status:403});
 const url=process.env.NEXT_PUBLIC_SUPABASE_URL,key=process.env.SUPABASE_SERVICE_ROLE_KEY;
 if(!url||!key)return NextResponse.json({error:'중앙 저장이 아직 연결되지 않았습니다.'},{status:503});
 if(Number(request.headers.get('content-length')||0)>12000)return NextResponse.json({error:'요청이 너무 큽니다.'},{status:413});
 try{
  const text=await request.text();if(text.length>12000)return NextResponse.json({error:'요청이 너무 큽니다.'},{status:413});
  const data=JSON.parse(text);
  if(data.noticeVersion!=='collection-notice-v1'||typeof data.name!=='string'||!data.name.trim()||data.name.trim().length>40||typeof data.code!=='string'||!/^CCLP-[A-F0-9]{32}$/.test(data.code)||!Array.isArray(data.answers))return NextResponse.json({error:'저장 안내 버전과 응답을 확인해 주세요.'},{status:400});
  const result=calculate(data.answers);
  const client=createClient(url,key,{auth:{persistSession:false,autoRefreshToken:false}});
  const codeHash=createHash('sha256').update(data.code).digest('hex');
  const {data:inserted,error}=await client.from('assessment_results').insert({code_hash:codeHash,name:data.name.trim(),answers:data.answers,engine_version:'v2.5_REPORT_SCORE',report:result,consent_version:'collection-notice-v1'}).select('id,created_at,email_status').single();
  if(error&&error.code!=='23505')return NextResponse.json({error:'중앙 저장에 실패했습니다. 다시 시도해 주세요.'},{status:502});
  let record=inserted;
  if(!record){const existing=await client.from('assessment_results').select('id,created_at,email_status,name,answers').eq('code_hash',codeHash).single();if(existing.error||!existing.data||existing.data.name!==data.name.trim()||JSON.stringify(existing.data.answers)!==JSON.stringify(data.answers))return NextResponse.json({error:'저장 기록을 확인하지 못했습니다.'},{status:409});record=existing.data;}
  let notification=record.email_status;
  if(notification!=='accepted'){notification=await sendResultEmail(record.id,data.name.trim(),record.created_at,result);await client.from('assessment_results').update({email_status:notification}).eq('id',record.id);}
  return NextResponse.json({saved:true,notification},{headers:{'Cache-Control':'no-store'}});
 }catch{return NextResponse.json({error:'올바른 180개 응답이 필요합니다.'},{status:400})}
}
