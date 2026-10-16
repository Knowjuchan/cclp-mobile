const fs=require('fs'),ts=require('typescript'),vm=require('vm'),assert=require('node:assert/strict');
const ctx={exports:{}};vm.runInNewContext(ts.transpileModule(fs.readFileSync('lib/guide-navigation.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText,ctx);
const select=ctx.exports.guideChapterForHash;
for(const chapter of ['developer','enneagram','cclp','characters'])assert.equal(select('#'+chapter),chapter);
for(const hash of ['#axes','#axis-0','#axis-3'])assert.equal(select(hash),'cclp');
for(const hash of ['#character-0','#character-8'])assert.equal(select(hash),'characters');
assert.equal(select(''),'developer');assert.equal(select('#guide-contents'),null);assert.equal(select('#unknown'),null);assert.equal(select('#axis-9'),null);
console.log('Guide chapter selection, deep links and contents navigation passed.');
