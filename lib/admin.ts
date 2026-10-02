import type {User} from '@supabase/supabase-js';
export const adminEmail='shwncks15@gmail.com';
export function isAdmin(user:User|null){
 return Boolean(user?.email_confirmed_at&&user.email?.toLowerCase()===adminEmail&&user.identities?.some(identity=>identity.provider==='google'&&identity.identity_data?.email?.toLowerCase()===adminEmail));
}
