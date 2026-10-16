import {createHash} from 'node:crypto';
import {createClient} from '@supabase/supabase-js';
import {NextRequest,NextResponse} from 'next/server';
import {calculate} from '../../../../lib/engine';
import {ageAtAssessment} from '../../../../lib/participant';
import {validParticipantIdentity} from '../../../../lib/participant-identity';
import {createResultViewToken} from '../../../../lib/result-view-token';
export const dynamic='force-dynamic';
const headers={'Cache-Control':'no-store','Referrer-Policy':'no-referrer'};
// Best-effort per-instance request budget; never retain the submitted identity in this map.
const budgets=new Map<string,{count:number;expires:number}>();
export async function POST(request:NextRequest){
 if(request.headers.get('origin')!==`${request.nextUrl.protocol}//${request.headers.get('host')}`)return NextResponse.json({error:'허용되지 않은 요청입니다.'},{status:403,headers});
 const now=Date.now();const ip=request.headers.get('x-vercel-forwarded-for')||request.headers.get('x-forwarded-for');
 if(ip){for(const [key,value] of budgets)if(value.expires<=now)budgets.delete(key);const key=createHash('sha256').update(ip).digest('hex');const budget=budgets.get(key);if(budget&&budget.count>=60)return NextResponse.json({error:'잠시 후 다시 조회해 주세요.'},{status:429,headers:{...headers,'Retry-After':'60'}});if(budget)budget.count++;else{if(budgets.size>=5000)return NextResponse.json({error:'잠시 후 다시 조회해 주세요.'},{status:429,headers});budgets.set(key,{count:1,expires:now+60000});}}
 const url=process.env.NEXT_PUBLIC_SUPABASE_URL,key=process.env.SUPABASE_SERVICE_ROLE_KEY;
 if(!url||!key)return NextResponse.json({error:'온라인 결과 조회를 연결하지 못했습니다. 잠시 후 다시 시도해 주세요.'},{status:503,headers});
 try{
  const text=await request.text();if(text.length>1024)return NextResponse.json({error:'조회 정보를 확인해 주세요.'},{status:400,headers});
  const identity=JSON.parse(text);const client=createClient(url,key,{auth:{persistSession:false,autoRefreshToken:false}});
  // Preserve previously issued codes for older clients, without displaying them in the new UI.
  if(typeof identity.code==='string'&&/^CCLP-[A-F0-9]{32}$/.test(identity.code)){
   const {data,error}=await client.from('assessment_results').select('name,birthday,gender,answers,created_at').eq('code_hash',createHash('sha256').update(identity.code).digest('hex')).maybeSingle();
   if(error)return NextResponse.json({error:'결과를 불러오지 못했습니다.'},{status:502,headers});
   if(!data)return NextResponse.json({error:'저장된 결과를 찾지 못했습니다.'},{status:404,headers});
   return NextResponse.json({record:{code:identity.code,name:data.name,gender:data.gender??undefined,age:ageAtAssessment(data.birthday,data.created_at),result:calculate(data.answers),date:data.created_at}},{headers});
  }
  if(!validParticipantIdentity(identity))return NextResponse.json({error:'이름, 성별, 생년월일, 연락처 뒷번호 4개를 모두 확인해 주세요.'},{status:400,headers});
  const {data,error}=await client.from('assessment_results').select('id,name,birthday,gender,answers,created_at').eq('name',identity.name.trim()).eq('gender',identity.gender).eq('birthday',identity.birthday).eq('phone_last4',identity.phoneLast4).order('created_at',{ascending:false}).limit(50);
  if(error)return NextResponse.json({error:'결과를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.'},{status:502,headers});
  if(!data?.length)return NextResponse.json({error:'입력한 정보와 일치하는 저장된 결과가 없습니다. 검사할 때 입력한 정보를 확인해 주세요.'},{status:404,headers});
  return NextResponse.json({records:data.map(row=>({id:row.id,viewToken:createResultViewToken(row.id,key),name:row.name,gender:row.gender,age:ageAtAssessment(row.birthday,row.created_at),result:calculate(row.answers),date:row.created_at}))},{headers});
 }catch{return NextResponse.json({error:'조회 정보를 확인해 주세요.'},{status:400,headers});}
}
