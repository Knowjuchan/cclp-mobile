import characterGuide from '../../lib/character-guide.json';
import axisGuide from '../../lib/axis-guide.json';
import Link from 'next/link';
import Brand from '../brand';
import GuidePanels from './guide-panels';
import {CharacterArt,SourceArt} from '../source-art';
import {characters,axisCopy,types} from '../../lib/interpretation';
export const metadata={title:'애니어그램과 CCLP 알아보기 | 사랑의교회 대학부',description:'개발자의 소개와 함께 애니어그램, CCLP 4축, 아홉 성경인물 리더십 프로파일을 알아봅니다.'};
const chapters=[
 {id:'developer',number:'01',title:'개발자 소개와 인사말',description:'이 검사를 함께 나누는 마음'},
 {id:'enneagram',number:'02',title:'애니어그램 소개',description:'행동 너머의 동기와 성향 이해하기'},
 {id:'cclp',number:'03',title:'CCLP 4축 소개',description:'공동체를 세우는 네 가지 자원'},
 {id:'characters',number:'04',title:'CCLP 성경인물 소개',description:'아홉 인물로 살펴보는 리더십의 모습'}
];
const axes=Object.values(axisGuide);
const examples:Record<string,string>={
 '공동체축':'새가족 모임을 준비할 때 담당자를 연결하고, 역할과 일정을 정리하며, 누구나 함께할 수 있는 운영의 기반을 마련합니다.',
 '사람축':'새가족 한 사람의 이야기를 듣고, 낯설거나 어려운 점을 살피며, 그 사람이 관계 안에서 편안히 성장하도록 동행합니다.',
 '진리축':'모임의 목적을 말씀에 비추어 돌아보고, 무엇을 중요하게 지켜야 할지 함께 나눌 기준과 배움의 내용을 준비합니다.',
 '사명축':'새가족에게 필요한 섬김을 발견하고, 새로운 시도를 제안하며, 구체적인 계획과 행동으로 모임을 실제로 시작합니다.'
};
const characterNames=['아브라함형','느헤미야형','여호수아형','바나바형','다윗형','에스라형','엘리야형','요셉형','베드로형'] as const;
function ChapterLabel({number,children}:{number:string;children:React.ReactNode}){return <span className="sectionLabel">CHAPTER {number} · {children}</span>}
export default function About(){return <main className="shell about modelGuide">
 <Brand/>
 <nav className="aboutNav" aria-label="페이지 이동"><Link href="/">← 검사 시작 화면</Link><a href="#guide-contents">목차 보기 ↓</a></nav>
 <header className="aboutHero"><p className="eyebrow">BEFORE WE START</p><h1>애니어그램과<br/>CCLP 알아보기</h1><p>나는 왜 이렇게 생각하고 행동할까요?<br/>나에게 주어진 강점으로 공동체를 어떻게 세울 수 있을까요?</p><p>검사에 담긴 관점과 각 영역의 의미를 차근차근 살펴보세요. 자신의 경험을 떠올리며 읽으면 결과를 더 깊이 이해할 수 있습니다.</p></header>
 <GuidePanels chapters={chapters}>
 <section id="developer" className="card handbook guideChapter developerWelcome"><ChapterLabel number="01">WELCOME</ChapterLabel><h2>개발자 소개와 인사말</h2><div className="developerIdentity"><span aria-hidden="true">CCLP</span><div><h3>노주찬 목사</h3><div className="developerBio"><p>총신대학교 / 총신대학교 신학대학원 / 총신대학교 일반대학원</p><p>전)강남교회 청년부 / 현)사랑의교회 대학부</p></div></div></div><div className="developerGreeting"><p className="greetingSalutation">샬롬!<br/>주님의 이름으로 문안드립니다.</p>
<p>지난 9년 동안 청년사역의 현장에서 수많은 청년들과 함께 울고 웃으며, 한 가지 질문을 깊이 고민하게 되었습니다.</p>
<blockquote className="greetingQuestion">“하나님께서는 이 청년을 어떤 사람으로 지으셨으며, 어떤 모습으로 빚어가시고, 어디로 부르고 계시는가?”</blockquote>
<p>청년의 시기는 자신의 정체성을 발견하고, 삶의 방향을 설정하며, 하나님께서 맡기신 사명을 준비하는 중요한 시간입니다. 그러나 많은 청년들이 자신을 충분히 이해하지 못한 채 타인과 비교하거나, 주어진 역할과 기대 속에서 자신의 고유한 모습을 잃어버리기도 합니다.</p>
<p>이러한 고민 속에서 청년들이 자신을 바르게 이해하고, 하나님의 부르심에 응답하는 리더로 성장하도록 돕기 위해 세 가지 방향을 중심으로 사역을 고민해 왔습니다.</p>
<ol className="greetingDirections"><li><h3>하나님께서 나를 창조하신 고유한 모습을 발견하는 것입니다.</h3><p>자신의 기질과 성향, 강점과 약점을 이해하며, 하나님께서 각 사람에게 허락하신 고유한 아름다움과 가능성을 발견하는 것입니다.</p></li>
<li><h3>하나님께서 나를 빚어가시는 성장의 과정을 이해하는 것입니다.</h3><p>자신의 내면을 정직하게 돌아보고, 익숙한 사고와 행동의 패턴을 이해하며, 그리스도를 닮아가는 성숙의 여정을 걸어가는 것입니다.</p></li>
<li><h3>하나님께서 나를 부르신 사명의 방향을 준비하는 것입니다.</h3><p>자신에게 주어진 은사와 역량을 발견하고, 그것을 공동체와 하나님 나라를 위해 어떻게 사용할 것인지 고민하며, 부르심에 응답하는 리더로 성장하는 것입니다.</p></li></ol>
<p>이 세 가지 과정은 결국 자신을 이해하는 데서 시작하여, 그리스도를 닮아가고, 하나님의 부르심에 응답하는 삶으로 나아가는 하나의 여정입니다.</p>
<p>우리는 모두 서로 다른 모습으로 지음받았지만, 그리스도 안에서 하나의 몸을 이루도록 부름받았습니다. 그러므로 건강한 리더십은 자신을 깊이 이해하는 데서 시작하여, 서로의 다름을 존중하고, 함께 하나님 나라를 세워가는 성숙한 공동체성으로 나아가야 합니다.</p>
<p>이를 위해 개발된 이 작은 시도가 청년들이 자신을 더욱 깊이 이해하고, 하나님의 손길을 발견하며, 각자의 자리에서 부르심에 충실한 리더로 세워지는 데 유익한 도구가 되기를 소망합니다.</p>
<p className="greetingSignature">노주찬 드림</p><p className="developmentNote">본 검사는 기존 애니어그램 문항을 바탕으로, 공동체 리더십의 관점에서 문항 분류와 점수 산정 체계를 재구성하여 자체 개발하였습니다. 이를 통해 한 번의 검사로 애니어그램 성향과 CCLP 4축 모델, 성경인물 프로파일을 함께 확인할 수 있도록 설계하였습니다.</p></div></section>
 <section id="enneagram" className="card handbook guideChapter"><ChapterLabel number="02">ENNEAGRAM</ChapterLabel><h2>행동 너머의 나를 이해하다</h2><p className="guideLead">같은 행동을 해도, 그 행동을 선택하는 마음은 다를 수 있습니다.</p><h3>애니어그램은 무엇을 살펴보나요?</h3><p>애니어그램은 반복해서 나타나는 생각과 감정, 행동의 패턴을 아홉 가지 유형의 관점으로 이해하는 도구입니다. 겉으로 보이는 모습뿐 아니라 그 안의 동기, 중요하게 여기는 가치, 불안해하는 지점을 함께 돌아봅니다.</p><p>예를 들어 누군가를 돕는 행동에도 관계를 맺고 싶은 마음, 책임을 다하고 싶은 마음, 함께 목표를 이루고 싶은 마음이 담길 수 있습니다. “무엇을 했는가?”와 함께 “왜 그렇게 하고 싶었는가?”를 묻는 것이 출발점입니다.</p><div className="purposeGrid">{['자기이해','타인이해','성장모색','관계발전'].map(x=><article key={x}><b>{x}</b></article>)}</div>
 <h3>아홉 가지 기본유형</h3><p>숫자는 유형을 구분하는 이름입니다. 높고 낮음의 순서나 성격의 우열을 뜻하지 않습니다. 아래 유형을 눌러 내면의 동기와 강점, 성장 방향을 살펴보세요.</p><SourceArt src="/images/enneagram-types.png" alt="애니어그램 아홉 가지 유형의 연결을 보여 주는 도형" bounds={[80,233,635,548]}/>
 <div className="typeGuideList">{Object.entries(types).map(([name,type])=><details className="guideDisclosure" key={name}><summary><span className="guideNumber">{name.replace('유형','')}</span><span><b>{name}</b><small>{type.title}</small></span><span className="disclosurePlus" aria-hidden="true">+</span></summary><div className="disclosureBody"><dl className="guideFacts"><div><dt>핵심동기</dt><dd>{type.motivation}</dd></div><div><dt>염려하는 지점</dt><dd>{type.fear}</dd></div><div><dt>강점</dt><dd>{type.strength}</dd></div><div><dt>성장 방향</dt><dd>{type.growth}</dd></div></dl></div></details>)}</div>
 <h3>세 가지 힘의 중심</h3><p>각 유형은 주로 무엇에 먼저 반응하는지에 따라 장·가슴·머리의 세 중심으로도 살펴볼 수 있습니다. 이는 성향을 설명하는 표현이며 신체 기능을 측정한다는 뜻은 아닙니다.</p><SourceArt src="/images/enneagram-centers.png" alt="장 중심 8·9·1, 가슴 중심 2·3·4, 머리 중심 5·6·7" bounds={[122,433,605,522]}/><div className="centerGrid"><article><h4>장 중심 · 8, 9, 1</h4><p>행동과 본능, 자율성과 힘의 사용을 중심으로 자신의 반응을 돌아봅니다.</p></article><article><h4>가슴 중심 · 2, 3, 4</h4><p>감정과 관계, 자신이 어떻게 받아들여지는지에 주목합니다.</p></article><article><h4>머리 중심 · 5, 6, 7</h4><p>생각과 준비, 안전과 가능성을 중심으로 상황을 살펴봅니다.</p></article></div>
 <h3>애니어그램 결과 표기 안내</h3><p>애니어그램 결과는 <b>‘주유형 숫자 + w + 날개유형 숫자’</b>로 표기합니다. ‘w’는 날개를 뜻하는 영어 단어 ‘wing’의 약자입니다.</p><p>예를 들어 <b>5w4는 주유형이 5유형, 날개유형이 4유형</b>임을 의미합니다. 날개유형은 주유형에 인접한 두 유형 중 함께 나타나는 성향을 설명합니다.</p>
 <aside className="guideCallout"><h3>결과를 나의 경험과 연결해 보세요</h3><p>“이 설명이 늘 맞는가?”보다 “어떤 상황에서 이런 모습이 나타나는가?”를 떠올려 보세요. 유형별 점수는 60점 만점의 응답 점수이며, 능력이나 성숙도의 순위가 아닙니다.</p><p>유형은 자신을 고정하는 이름표가 아니라, 익숙한 반응을 이해하고 더 자유롭게 선택하기 위한 대화의 출발점입니다.</p></aside></section>
 <section id="cclp" className="card handbook guideChapter"><ChapterLabel number="03">CCLP FOUR AXES</ChapterLabel><h2>공동체를 세우는 네 가지 자원</h2><p className="guideLead">나는 공동체 안에서 어떤 방식으로 기여하고 있을까요?</p><h3>CCLP란 무엇인가요?</h3><p>CCLP는 <b>Christian Community Leadership Profile</b>의 약자로, 교회 공동체 안에서 나타나는 리더십의 특성과 섬김의 방향을 살펴보는 프로파일입니다. 애니어그램이 내면의 동기를 돌아보게 한다면, CCLP는 그 사람이 공동체에서 어떻게 관계를 맺고, 기준을 세우고, 함께 실행하는지를 살펴봅니다.</p><p>애니어그램 유형에 성경인물 이름을 단순히 붙이는 방식이 아닙니다. 같은 문항 응답을 공동체 영향력·사역 성향·리더십 특징·공동체 기여 방식의 관점으로 살펴봅니다. 결과는 공동체·사람·진리·사명의 네 축과 성경인물 프로파일로 나누어 읽을 수 있습니다.</p>
 <div id="axes" className="axesIntro"><h3>4축을 한눈에 보기</h3><p>각 축을 누르면 정의, 강점, 주의할 점과 성장 방향으로 이동합니다.</p><div className="axisOverview">{axes.map((axis,i)=><a key={axis.name} href={`#axis-${i}`}><span>0{i+1} · {axis.english}</span><b>{axis.name}</b><small>{axis.definition}</small></a>)}</div></div>
 {axes.map((axis,i)=><article key={axis.name} id={`axis-${i}`} className={`axisDetail axisGuide axisGuide${i}`}><p className="eyebrow">{axis.english}</p><h3>{axis.name}</h3><p className="guideLead">{axis.definition}</p><p className="axisQuestion">“{axis.question}”</p><p>{axis.description}</p><dl className="guideFacts"><div><dt>핵심 가치</dt><dd>{axis.values}</dd></div><div><dt>대표 인물</dt><dd>{axis.representatives}</dd></div></dl><div className="strengthGrid"><article><h4>강점</h4><ul>{axis.strengths.map(x=><li key={x}>{x}</li>)}</ul></article><article><h4>주의할 점</h4><ul>{axis.cautions.map(x=><li key={x}>{x}</li>)}</ul></article></div><h4>공동체에서는 이렇게 드러날 수 있어요</h4><p>{examples[axis.name]}</p><h4>CCLP 관점</h4><p>{axis.perspective}</p><h4>강점을 키우는 작은 연습</h4><p>{axisCopy[axis.name].practice}</p><p className="verseReference">{axis.verse} · “{axis.quote}”</p><a className="guideBack" href="#axes">↑ 4축 한눈에 보기</a></article>)}
 <aside className="guideCallout"><h3>네 자원은 서로를 보완합니다</h3><p>같은 새가족 모임에서도 공동체축은 함께할 기반을, 사람축은 한 사람의 필요를, 진리축은 목적과 기준을, 사명축은 실행과 새로운 시도를 살핍니다. 한 사람 안에도 여러 자원이 함께 나타날 수 있습니다.</p><p>높은 점수는 응답에서 두드러진 경향이며, 낮은 점수가 무능력이나 믿음의 부족을 뜻하지 않습니다. 자신의 강점을 나누고 다른 사람의 자원과 협력할 방향을 찾아보세요.</p></aside></section>
 <section id="characters" className="card handbook guideChapter"><ChapterLabel number="04">BIBLICAL PROFILES</ChapterLabel><h2>성경인물로 살펴보는 리더십</h2><p className="guideLead">하나님께서 사람을 세우고 공동체를 이끄시는 다양한 모습을 만납니다.</p><p>CCLP는 아홉 성경인물의 부르심과 책임, 사역 방식, 공동체에서의 역할을 참고해 리더십의 서로 다른 모습을 설명합니다. 검사 결과에서는 자신의 응답과 상대적 유사성이 높은 성경인물 TOP 3를 살펴봅니다.</p><p>특정 애니어그램 유형이 한 성경인물과 반드시 대응하지 않습니다. 같은 성향의 사람도 경험과 응답에 따라 다른 인물 프로파일을 보일 수 있으며, 유사성 점수가 영적 성숙이나 믿음의 수준을 평가하는 것은 아닙니다.</p>
 <nav className="characterIndex" aria-label="아홉 성경인물 바로가기">{characterNames.map((name,i)=><a key={name} href={`#character-${i}`}>{name}</a>)}</nav>
 <div className="characterGuideList">{characterNames.map((name,i)=>{const guide=characterGuide[name];const copy=characters[name];return <article id={`character-${i}`} className="characterGuideCard" key={name}><div className="characterGuideHeader"><div><p className="eyebrow">BIBLICAL PROFILE · {String(i+1).padStart(2,'0')}</p><h3>{name}</h3><p className="characterIdentity">{guide.identity}</p><p>{guide.summary}</p></div><CharacterArt name={name}/></div><details className="guideDisclosure"><summary><b>{name} 자세히 알아보기</b><span className="disclosurePlus" aria-hidden="true">+</span></summary><div className="disclosureBody"><dl className="guideFacts"><div><dt>핵심 강점</dt><dd>{guide.strengths.join(' · ')}</dd></div><div><dt>대표본문</dt><dd><b>{guide.passage}</b><br/>{guide.story}</dd></div><div><dt>리더십 스타일</dt><dd>{guide.style}</dd></div><div><dt>대표 사역과 열매</dt><dd>{guide.fruit.join(' · ')}</dd></div><div><dt>함께 살펴볼 애니어그램 경향</dt><dd>{guide.tendencies.map(n=>`${n}유형`).join(' · ')}<br/><small>가능한 경향을 이해하는 참고이며 고정된 대응 관계가 아닙니다.</small></dd></div><div><dt>공동체에 더하는 유익</dt><dd>{copy.benefit}</dd></div><div><dt>주의할 수 있는 패턴</dt><dd>{copy.caution}</dd></div><div><dt>성장을 위한 질문과 권면</dt><dd>{copy.counsel}</dd></div></dl></div></details></article>})}</div>
 <aside className="guideCallout"><h3>‘나는 이 인물과 같은 사람’이라는 뜻일까요?</h3><p>성경인물 프로파일은 한 사람의 삶 전체를 재현하거나 소명을 확정하는 판정이 아닙니다. 결과에서 공감되는 모습을 실제 경험과 연결하고, 강점을 어떻게 건강하게 사용할지 함께 생각하기 위한 해석 자료입니다.</p></aside></section>
 </GuidePanels>
 <section className="card guideClosing"><span className="sectionLabel">YOUR NEXT STEP</span><h2>이제, 나의 이야기를 살펴볼 차례입니다</h2><p>180문항에 평소 모습과 가까운 정도를 0~3점으로 응답합니다. 검사 후에는 애니어그램, CCLP 4축, CCLP 성경유형을 통해 자신의 모습과 성장 방향을 함께 읽을 수 있습니다.</p><p className="caption">검사결과는 성경적인 자기이해와 영적 성장 대화를 위한 참고자료이며, 진단이나 사역배치 명령이 아닙니다.</p><Link className="primary actionLink" href="/">나의 프로파일 살펴보기 →</Link></section>
 <footer className="siteFooter"><div className="developerCredit"><span>Designed &amp; Developed by <a href="https://www.instagram.com/knowjuchan/" target="_blank" rel="noopener noreferrer">@knowjuchan</a></span><a href="mailto:knowjuchan@sarang.org">문의 : knowjuchan@sarang.org</a></div></footer>
 </main>}
