import {NextRequest,NextResponse} from 'next/server';
import {createClient} from '@supabase/supabase-js';
import {authClient,authConfigured} from '../../../lib/supabase/server';
import {isAdmin} from '../../../lib/admin';
import {calculate} from '../../../lib/engine';
import {sendResultEmail} from '../../../lib/result-email';
export async function POST(request:NextRequest){
 if(request.headers.get('origin')!==`${request.nextUrl.protocol}//${request.headers.get('host')}`)return new Response('허용되지 않은 요청',{status:403});
 if(!authConfigured()||!process.env.SUPABASE_SERVICE_ROLE_KEY)return new Response('연결 준비 중',{status:503});
 const client=await authClient();const {data:{user}}=await client.auth.getUser();if(!isAdmin(user))return new Response('관리자 로그인 필요',{status:403});
 const form=await request.formData();const id=String(form.get('id')||'');if(!/^[0-9a-f-]{36}$/i.test(id))return new Response('잘못된 결과',{status:400});
 const {data,error}=await client.from('assessment_results').select('id,name,answers,created_at,email_status').eq('id',id).single();if(error||!data)return new Response('결과 없음',{status:404});
 if(data.email_status!=='accepted'){
  let result;try{result=calculate(data.answers)}catch{return new Response('손상된 응답',{status:422})}
  const status=await sendResultEmail(data.id,data.name,data.created_at,result);
  const server=createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!,process.env.SUPABASE_SERVICE_ROLE_KEY,{auth:{persistSession:false}});
  const {error:updateError}=await server.from('assessment_results').update({email_status:status}).eq('id',id);if(updateError)return new Response('발송 상태 저장 실패',{status:502});
 }
 return NextResponse.redirect(new URL('/admin',request.url),303);
}
