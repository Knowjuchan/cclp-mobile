import type {Result} from './engine';
export const resultRecipient='1988since@naver.com';
export function emailConfigured(){return Boolean(process.env.RESEND_API_KEY&&process.env.RESULT_EMAIL_FROM&&process.env.APP_URL)}
export function resultEmail(id:string,name:string,date:string,result:Result){
 const url=new URL(`/admin/results/${id}`,process.env.APP_URL!);
 return {from:process.env.RESULT_EMAIL_FROM!,to:[resultRecipient],subject:'CCLP 새 검사 결과',text:[`검사자: ${name}`,`검사일: ${new Date(date).toLocaleString('ko-KR',{timeZone:'Asia/Seoul'})}`,`애니어그램: ${result.topType}`,`4축: ${result.axes.map(x=>`${x.name} ${x.score.toFixed(2)}`).join(' / ')}`,`성경유형 TOP 3: ${result.topCharacters.join(' / ')}`,`상세 결과: ${url}`, '상세 결과는 지정된 Google 관리자 계정으로 로그인해야 볼 수 있습니다.'].join('\n')};
}
export async function sendResultEmail(id:string,name:string,date:string,result:Result){
 if(!emailConfigured())return 'unconfigured' as const;
 try{
  const response=await fetch('https://api.resend.com/emails',{method:'POST',signal:AbortSignal.timeout(8000),headers:{Authorization:`Bearer ${process.env.RESEND_API_KEY}`,'Content-Type':'application/json','Idempotency-Key':`cclp-result/${id}`},body:JSON.stringify(resultEmail(id,name,date,result))});
  return response.ok?'accepted' as const:'failed' as const;
 }catch{return 'failed' as const}
}
