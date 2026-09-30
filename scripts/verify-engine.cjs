const assert=require('node:assert/strict');
const fs=require('node:fs');const path=require('node:path');const ts=require('typescript');
const Module=require('node:module');
const filename=path.resolve(__dirname,'../lib/engine.ts');
const compiled=ts.transpileModule(fs.readFileSync(filename,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,esModuleInterop:true,target:ts.ScriptTarget.ES2022}}).outputText;
const instance=new Module(filename,module);instance.filename=filename;instance.paths=module.paths;instance._compile(compiled,filename);
const {calculate,displayScore}=instance.exports;
const fixtures=JSON.parse(fs.readFileSync(process.argv[2]||path.resolve(__dirname,'engine-fixtures.json'),'utf8'));
for(const fixture of fixtures){const result=calculate(fixture.answers);for(const kind of ['axes','characters'])for(const item of result[kind]){const expected=fixture.expected[kind][item.name];assert.ok(Math.abs(item.raw-expected.raw)<1e-9);assert.ok(Math.abs(item.internal-expected.internal)<1e-9);assert.equal(item.score,expected.score);}}
for(const v of [NaN,Infinity,-1,4,1.5,undefined])assert.throws(()=>calculate(Array(180).fill(v)));
assert.throws(()=>calculate(Array(180)));assert.throws(()=>calculate([0]));
assert.equal(calculate(Array(180).fill(0)).tiedTypes.length,9);
assert.equal(calculate(Array(180).fill(0)).tiedCharacters.length,9);
assert.equal(displayScore(0),10);assert.equal(displayScore(60),85);assert.equal(displayScore(80),95);assert.equal(displayScore(100),100);
const interp=fs.readFileSync(path.resolve(__dirname,'../lib/interpretation.ts'),'utf8');
const psychological=interp.split('export const axisCopy')[0];
assert.ok(!/하나님|사명|소명|말씀|기도|교회|성경/.test(psychological));
console.log(`${fixtures.length} source-formula fixtures passed; invalid answers, ties, score boundaries and language separation passed.`);
