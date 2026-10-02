import {NextRequest,NextResponse} from 'next/server';
import {authClient,authConfigured} from '../../../lib/supabase/server';
export async function GET(request:NextRequest){
 const code=request.nextUrl.searchParams.get('code');
 if(code&&authConfigured()){
  const client=await authClient();const {error}=await client.auth.exchangeCodeForSession(code);
  if(!error)return NextResponse.redirect(new URL('/admin',request.url));
 }
 return NextResponse.redirect(new URL('/admin?error=login',request.url));
}
