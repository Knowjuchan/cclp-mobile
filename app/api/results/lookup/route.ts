import {createHash} from 'node:crypto';
import {createClient} from '@supabase/supabase-js';
import {NextRequest,NextResponse} from 'next/server';
import {calculate} from '../../../../lib/engine';
import {ageAtAssessment} from '../../../../lib/participant';
export const dynamic='force-dynamic';
const headers={'Cache-Control':'no-store','Referrer-Policy':'no-referrer'};
export async function POST(request:NextRequest){
 if(request.headers.get('origin')!==`${request.nextUrl.protocol}//${request.headers.get('host')}`)return NextResponse.json({error:'허용되지 않은 요청입니다.'},{status:403,headers});
 const url=process.env.NEXT_PUBLIC_SUPABASE_URL,key=process.env.SUPABASE_SERVICE_ROLE_KEY;
 if(!url||!key)return NextResponse.json({error:'온라인 결과 조회를 연결하지 못했습니다. 잠시 후 다시 시도해 주세요.'},{status:503,headers});
 try{
  const text=await request.text();if(text.length>256)return NextResponse.json({error:'결과 코드를 확인해 주세요.'},{status:400,headers});
  const {code}=JSON.parse(text);if(typeof code!=='string'||!/^CCLP-[A-F0-9]{32}$/.test(code))return NextResponse.json({error:'결과 코드를 확인해 주세요.'},{status:400,headers});
  const client=createClient(url,key,{auth:{persistSession:false,autoRefreshToken:false}});
  const {data,error}=await client.from('assessment_results').select('name,birthday,gender,answers,created_at').eq('code_hash',createHash('sha256').update(code).digest('hex')).maybeSingle();
  if(error)return NextResponse.json({error:'결과를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.'},{status:502,headers});
  if(!data)return NextResponse.json({error:'해당 코드의 저장된 결과를 찾지 못했습니다. 코드와 검사 완료 여부를 확인해 주세요.'},{status:404,headers});
  return NextResponse.json({record:{code,name:data.name,gender:data.gender??undefined,age:ageAtAssessment(data.birthday,data.created_at),result:calculate(data.answers),date:data.created_at}},{headers});
 }catch{return NextResponse.json({error:'결과 코드를 확인해 주세요.'},{status:400,headers});}
}
