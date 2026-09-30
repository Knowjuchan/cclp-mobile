import questions from './questions.json';
import source from './source.json';
export type Score={name:string;raw:number;internal:number;score:number;rank:number};
export type Result={enneagram:Score[];axes:Score[];characters:Score[];topType:string;topCharacters:string[];topAxis:string;lowAxis:string;synergy:string;caution:string;synergyReason:string;cautionReason:string;wings:Score[];influences:Score[];tiedTypes:string[];tiedCharacters:string[];flat:boolean;evidence:string[]};
export const displayScore=(x:number)=>Math.round(Math.min(100,Math.max(0,x<60?x*1.25+10:x<80?x*.5+55:x*.25+75))*100)/100;
export function calculate(a:number[]):Result{
 if(a.length!==questions.length||!Array.from(a).every(v=>Number.isInteger(v)&&v>=0&&v<=source.maxAnswer))throw new Error('180개 문항에 0~3점으로 응답해 주세요.');
 const e=Array(9).fill(0) as number[];
 const aggregate=(names:string[],primary:'primaryAxis'|'primaryCharacter',secondary:'secondaryAxis'|'secondaryCharacter')=>names.map(name=>{
  let raw=0,max=0;
  questions.forEach((q,i)=>{const p=primary==='primaryAxis'?source.primaryAxisWeight:q.primaryCharacterWeight;const s=secondary==='secondaryAxis'?source.secondaryAxisWeight:q.secondaryCharacterWeight;const weight=q.publicWeight*((q[primary]===name?p:0)+(q[secondary]===name?s:0));raw+=a[i]*weight;max+=source.maxAnswer*weight;});
  const internal=max?raw/max*100:0;return{name,raw,internal,score:displayScore(internal),rank:0};
 });
 const ranked=(items:Score[])=>items.map(x=>({...x,rank:1+items.filter(y=>y.score>x.score).length})).sort((x,y)=>y.score-x.score);
 questions.forEach((q,i)=>{e[q.enneagram-1]+=a[i]});const maxE=Math.max(...e);
 const enneagram=ranked(e.map((raw,i)=>({name:`${i+1}유형`,raw,internal:maxE?raw/maxE*100:0,score:maxE?Math.round(raw/maxE*10000)/100:0,rank:0})));
 const axes=ranked(aggregate(source.axes,'primaryAxis','secondaryAxis'));const characters=ranked(aggregate(source.characters,'primaryCharacter','secondaryCharacter'));
 const topType=enneagram[0].name;const t=Number(topType[0]);const wings=enneagram.filter(x=>[t===1?9:t-1,t===9?1:t+1].includes(Number(x.name[0])));const influences=enneagram.filter(x=>x.name!==topType).slice(0,2);
 const top=characters[0].name;const relation=source.relations[top as keyof typeof source.relations];
 const evidence=questions.filter((q,i)=>a[i]>=2&&q.category==='역량'&&q.primaryCharacter===top).map(q=>q.publicExpression);
 return{enneagram,axes,characters,topType,topCharacters:characters.slice(0,3).map(x=>x.name),topAxis:axes[0].name,lowAxis:axes.at(-1)!.name,...relation,wings,influences,tiedTypes:enneagram.filter(x=>x.raw===maxE).map(x=>x.name),tiedCharacters:characters.filter(x=>x.score===characters[0].score).map(x=>x.name),flat:new Set(a).size===1,evidence:[...new Set(evidence)].slice(0,3)};
}
