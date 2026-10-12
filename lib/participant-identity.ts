export type ParticipantIdentity={name:string;gender:'남자'|'여자';birthday:string;phoneLast4:string};
export function validParticipantIdentity(value:unknown):value is ParticipantIdentity{
 if(!value||typeof value!=='object')return false;
 const p=value as Record<string,unknown>;
 if(typeof p.name!=='string'||!p.name.trim()||p.name.trim().length>40||typeof p.gender!=='string'||!['남자','여자'].includes(p.gender)||typeof p.phoneLast4!=='string'||!/^\d{4}$/.test(p.phoneLast4)||typeof p.birthday!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(p.birthday))return false;
 const time=Date.parse(p.birthday);
 return Number.isFinite(time)&&new Date(time).toISOString().slice(0,10)===p.birthday&&p.birthday>='1900-01-01'&&p.birthday<=new Date().toLocaleDateString('en-CA',{timeZone:'Asia/Seoul'});
}
