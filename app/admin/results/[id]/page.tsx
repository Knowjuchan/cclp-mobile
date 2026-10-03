import Link from 'next/link';
import {notFound,redirect} from 'next/navigation';
import {authClient,authConfigured} from '../../../../lib/supabase/server';
import {isAdmin} from '../../../../lib/admin';
import {calculate} from '../../../../lib/engine';
import Report from '../../../report';
import PrintButton from '../../../print-button';
export const dynamic='force-dynamic';
export default async function Detail({params}:{params:Promise<{id:string}>}){
 if(!authConfigured())redirect('/admin');
 const client=await authClient();const {data:{user}}=await client.auth.getUser();if(!isAdmin(user))redirect('/admin');
 const {id}=await params;if(!/^[a-f0-9-]{36}$/i.test(id))notFound();
 const {data,error}=await client.from('assessment_results').select('name,answers,created_at').eq('id',id).maybeSingle();if(error||!data)notFound();
 let result;try{result=calculate(data.answers)}catch{notFound()}
 return <main className="shell result"><Link className="adminBack" href="/admin">← 관리자 목록</Link><PrintButton/><Report result={result} name={data.name}/><p className="caption">검사일 {new Date(data.created_at).toLocaleString('ko-KR',{timeZone:'Asia/Seoul'})}</p></main>;
}
