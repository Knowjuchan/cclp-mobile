import {NextRequest,NextResponse} from 'next/server';
import {authClient,authConfigured} from '../../../lib/supabase/server';
export async function GET(request:NextRequest){
 if(!authConfigured())return NextResponse.redirect(new URL('/admin?error=setup',request.url));
 const client=await authClient();
 const {data,error}=await client.auth.signInWithOAuth({provider:'google',options:{redirectTo:new URL('/auth/callback',request.url).toString(),queryParams:{prompt:'select_account'}}});
 if(error||!data.url)return NextResponse.redirect(new URL('/admin?error=login',request.url));
 return NextResponse.redirect(data.url);
}
