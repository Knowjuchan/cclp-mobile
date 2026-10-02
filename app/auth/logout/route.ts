import {NextRequest,NextResponse} from 'next/server';
import {authClient,authConfigured} from '../../../lib/supabase/server';
export async function POST(request:NextRequest){
 if(request.headers.get('origin')!==`${request.nextUrl.protocol}//${request.headers.get('host')}`)return new NextResponse(null,{status:403});
 if(authConfigured())await (await authClient()).auth.signOut();
 return NextResponse.redirect(new URL('/admin',request.url),303);
}
