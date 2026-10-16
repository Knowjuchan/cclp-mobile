export type GuideChapter='developer'|'enneagram'|'cclp'|'characters';
export function guideChapterForHash(hash:string):GuideChapter|null{
 const id=hash.replace(/^#/,'');
 if(!id)return 'developer';
 if(['developer','enneagram','cclp','characters'].includes(id))return id as GuideChapter;
 if(id==='axes'||/^axis-[0-3]$/.test(id))return 'cclp';
 if(/^character-[0-8]$/.test(id))return 'characters';
 return null;
}
