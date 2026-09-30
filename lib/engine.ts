import questions from './questions.json';
export type Result={enneagram:{name:string,score:number}[];axes:{name:string,score:number}[];characters:{name:string,score:number}[];topType:string;topCharacters:string[];topAxis:string;lowAxis:string;synergy:string;caution:string};
const axes=['공동체축','사람축','진리축','사명축'];
const chars=['여호수아형','느헤미야형','아브라함형','바나바형','다윗형','에스라형','엘리야형','요셉형','베드로형'];
const relations:Record<string,[string,string]>= {'베드로형':['요셉형','느헤미야형'],'요셉형':['베드로형','바나바형'],'엘리야형':['에스라형','바나바형'],'에스라형':['엘리야형','베드로형'],'다윗형':['바나바형','느헤미야형'],'바나바형':['에스라형','엘리야형'],'여호수아형':['느헤미야형','베드로형'],'느헤미야형':['바나바형','베드로형'],'아브라함형':['여호수아형','엘리야형']};
const display=(x:number)=>Math.round(Math.min(100,Math.max(0,x<60?x*1.25+10:x<80?x*.5+55:x*.25+75))*100)/100;
export function calculate(a:number[]):Result{
 if(a.length!==180||a.some(v=>v<0||v>3))throw new Error('180개 문항에 0~3점으로 응답해 주세요.');
 const e=Array(9).fill(0); const axisRaw=Object.fromEntries(axes.map(x=>[x,0])); const axisMax=Object.fromEntries(axes.map(x=>[x,0])); const charRaw=Object.fromEntries(chars.map(x=>[x,0])); const charMax=Object.fromEntries(chars.map(x=>[x,0]));
 questions.forEach((q,i)=>{const v=a[i]; e[q.enneagram-1]+=v; const p=q.publicWeight; const ps=v*p; const mx=3*p; axisRaw[q.primaryAxis]+=ps; axisMax[q.primaryAxis]+=mx; axisRaw[q.secondaryAxis]+=ps*.2; axisMax[q.secondaryAxis]+=mx*.2; charRaw[q.primaryCharacter]+=ps*q.primaryCharacterWeight; charMax[q.primaryCharacter]+=mx*q.primaryCharacterWeight; charRaw[q.secondaryCharacter]+=ps*q.secondaryCharacterWeight; charMax[q.secondaryCharacter]+=mx*q.secondaryCharacterWeight;});
 const maxE=Math.max(...e); const enneagram=e.map((v,i)=>({name:`${i+1}유형`,score:maxE?Math.round(v/maxE*100):0})).sort((a,b)=>b.score-a.score);
 const axesOut=axes.map(name=>({name,score:display(axisMax[name]?axisRaw[name]/axisMax[name]*100:0)})).sort((a,b)=>b.score-a.score);
 const charsOut=chars.map(name=>({name,score:display(charMax[name]?charRaw[name]/charMax[name]*100:0)})).sort((a,b)=>b.score-a.score);
 const top=charsOut[0].name; const [synergy,caution]=relations[top]; return{enneagram,axes:axesOut,characters:charsOut,topType:enneagram[0].name,topCharacters:charsOut.slice(0,3).map(x=>x.name),topAxis:axesOut[0].name,lowAxis:axesOut.at(-1)!.name,synergy,caution};
}
