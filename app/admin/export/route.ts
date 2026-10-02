import {authClient,authConfigured} from '../../../lib/supabase/server';
import {isAdmin} from '../../../lib/admin';
import {calculate} from '../../../lib/engine';
export const dynamic='force-dynamic';
const cell=(value:unknown)=>`"${String(value??'').replace(/"/g,'""')}"`;
export async function GET(){
 if(!authConfigured())return new Response('연결 준비 중',{status:503});
 const client=await authClient();const {data:{user}}=await client.auth.getUser();
 if(!isAdmin(user))return new Response('관리자 로그인이 필요합니다.',{status:403});
 const rows:string[]=[];let offset=0;
 for(;;){
  const {data,error}=await client.from('assessment_results').select('id,created_at,answers,engine_version').order('created_at',{ascending:true}).order('id',{ascending:true}).range(offset,offset+499);
  if(error)return new Response('데이터를 내보내지 못했습니다.',{status:502});
  for(const row of data||[]){try{const r=calculate(row.answers);r.enneagram.sort((a,b)=>a.name.localeCompare(b.name));r.axes.sort((a,b)=>a.name.localeCompare(b.name));r.characters.sort((a,b)=>a.name.localeCompare(b.name));if(!rows.length)rows.push(['표본ID','검사일','엔진버전',...Array.from({length:180},(_,i)=>`Q${i+1}`),...r.enneagram.map(x=>x.name),...r.axes.map(x=>x.name),...r.characters.map(x=>x.name)].map(cell).join(','));const scores=[...r.enneagram,...r.axes,...r.characters];rows.push([row.id,row.created_at,row.engine_version,...row.answers,...scores.map(x=>x.score)].map(cell).join(','));}catch{return new Response('손상된 응답이 있어 내보내기를 중단했습니다.',{status:422})}}
  if(!data||data.length<500)break;offset+=500;
 }
 return new Response('\ufeff'+rows.join('\r\n'),{headers:{'Content-Type':'text/csv; charset=utf-8','Content-Disposition':'attachment; filename="cclp-samples.csv"','Cache-Control':'private, no-store'}});
}
