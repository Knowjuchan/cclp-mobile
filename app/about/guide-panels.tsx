'use client';
import {Children,isValidElement,useEffect,useState} from 'react';
import {guideChapterForHash,GuideChapter} from '../../lib/guide-navigation';
type Chapter={id:string;number:string;title:string;description:string};
export default function GuidePanels({chapters,children}:{chapters:Chapter[];children:React.ReactNode}){
 const [active,setActive]=useState<GuideChapter>('developer');
 useEffect(()=>{const sync=()=>{const next=guideChapterForHash(window.location.hash);if(next)setActive(next);};sync();window.addEventListener('hashchange',sync);return()=>window.removeEventListener('hashchange',sync);},[]);
 useEffect(()=>{const id=window.location.hash.slice(1);if(!id)return;const frame=requestAnimationFrame(()=>document.getElementById(id)?.scrollIntoView({block:'start'}));return()=>cancelAnimationFrame(frame);},[active]);
 const panel=Children.toArray(children).find(child=>isValidElement<{id?:string}>(child)&&child.props.id===active);
 return <><nav id="guide-contents" className="guideContents" aria-label="검사 모델 설명 목차">{chapters.map(chapter=><a href={`#${chapter.id}`} key={chapter.id} aria-current={active===chapter.id?'page':undefined}><span>{chapter.number}</span><div><b>{chapter.title}</b><small>{chapter.description}</small></div><span aria-hidden="true">{active===chapter.id?'•':'↗'}</span></a>)}</nav>{panel}<a className="guideReturn" href="#guide-contents">↑ 다른 소개 보기</a></>;
}
