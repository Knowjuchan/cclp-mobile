const ts=require('typescript'),fs=require('fs'),assert=require('node:assert/strict');
const source=ts.transpileModule(fs.readFileSync('lib/result-email.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
const moduleObject={exports:{}};new Function('exports','require','module',source)(moduleObject.exports,(name)=>name==='./engine'?{enneagramLabel:r=>r.topType}:require(name),moduleObject);
const {sendResultEmail,resultEmail}=moduleObject.exports;
(async()=>{
 delete process.env.RESEND_API_KEY;assert.equal(await sendResultEmail('test','test','2026-10-03',{}),'unconfigured');
 process.env.RESEND_API_KEY='test-only';process.env.RESULT_EMAIL_FROM='CCLP <test@example.org>';process.env.APP_URL='https://example.org';
 const r={topType:'1유형',axes:[{name:'공동체축',score:50}],topCharacters:['느헤미야형','에스라형','요셉형']};let calls=0;
 global.fetch=async(url,options)=>{calls++;assert.equal(url,'https://api.resend.com/emails');const body=JSON.parse(options.body);assert.deepEqual(body.to,['shwncks15@gmail.com']);assert.equal(options.headers['Idempotency-Key'],'cclp-result/test-id');assert.ok(body.text.includes('/admin/results/test-id'));return {ok:true}};
 assert.equal(await sendResultEmail('test-id','가상 검사자','2026-10-03',r),'accepted');assert.equal(calls,1);
 global.fetch=async()=>({ok:false});assert.equal(await sendResultEmail('test-id','가상','2026-10-03',r),'failed');
 global.fetch=async()=>{throw Error('network')};assert.equal(await sendResultEmail('test-id','가상','2026-10-03',r),'failed');
 assert.equal(resultEmail('test-id','가상','2026-10-03',r).subject,'CCLP 새 검사 결과');
 console.log('Email recipient, summary, admin link, idempotency, missing config and failure handling passed; no real emails sent.');
})().catch(e=>{console.error(e);process.exitCode=1});
