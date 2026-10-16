import {createClient} from '@supabase/supabase-js';
import {NextRequest,NextResponse} from 'next/server';
import {verifyResultViewToken} from '../../../../lib/result-view-token';
export const dynamic='force-dynamic';
const headers={'Cache-Control':'no-store'};
export async function POST(request:NextRequest){
 if(request.headers.get('origin')!==`${request.nextUrl.protocol}//${request.headers.get('host')}`)return NextResponse.json({saved:false},{status:403,headers});
 const url=process.env.NEXT_PUBLIC_SUPABASE_URL,key=process.env.SUPABASE_SERVICE_ROLE_KEY;
 if(!url||!key)return NextResponse.json({saved:false},{status:503,headers});
 try{
  const text=await request.text();if(text.length>300)return NextResponse.json({saved:false},{status:400,headers});
  const id=verifyResultViewToken(JSON.parse(text).token,key);if(!id)return NextResponse.json({saved:false},{status:403,headers});
  const client=createClient(url,key,{auth:{persistSession:false,autoRefreshToken:false}});
  const {error}=await client.from('assessment_results').update({last_self_viewed_at:new Date().toISOString()}).eq('id',id);
  return NextResponse.json({saved:!error},{status:error?502:200,headers});
 }catch{return NextResponse.json({saved:false},{status:400,headers});}
}
