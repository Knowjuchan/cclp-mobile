import Image from 'next/image';
import assets from '../lib/assets.json';
// Display a region of the supplied page without altering the original image file.
export function SourceArt({src,alt,bounds}:{src:string;alt:string;bounds:[number,number,number,number]}){
 const [x,y,w,h]=bounds;
 return <div className="sourceArt" style={{aspectRatio:`${w}/${h}`}}><Image src={src} alt={alt} width={794} height={1123} sizes="(max-width:760px) 150vw, 1000px" style={{width:`${794/w*100}%`,left:`${-x/w*100}%`,top:`${-y/h*100}%`}}/></div>;
}
export function CharacterArt({name}:{name:string}){
 const src=assets.characters[name as keyof typeof assets.characters] as string|null;
 if(!src)return null;
 return <div className="characterArt"><Image src={src} alt={`${name}을 표현한 남녀 리더 일러스트`} width={1024} height={1536} sizes="(max-width:540px) 240px, 300px" className="characterCutout"/></div>;
}
