import {createHmac,timingSafeEqual} from 'node:crypto';
const idPattern=/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i;
export function createResultViewToken(id:string,key:string,now=Date.now()){
 if(!idPattern.test(id))throw new Error('Invalid result ID');
 const payload=`${id}.${now+15*60*1000}`;
 return `${payload}.${createHmac('sha256',key).update(`result-view:${payload}`).digest('hex')}`;
}
export function verifyResultViewToken(token:unknown,key:string,now=Date.now()):string|null{
 if(typeof token!=='string'||token.length>200)return null;
 const [id,expires,signature,...extra]=token.split('.');
 if(extra.length||!idPattern.test(id)||!/^\d{13}$/.test(expires)||!signature||!/^[a-f0-9]{64}$/.test(signature))return null;
 const expiry=Number(expires);if(expiry<now||expiry>now+15*60*1000)return null;
 const expected=createHmac('sha256',key).update(`result-view:${id}.${expires}`).digest();
 return timingSafeEqual(expected,Buffer.from(signature,'hex'))?id:null;
}
