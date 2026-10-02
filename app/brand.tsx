import Image from 'next/image';
import assets from '../lib/assets.json';
export default function Brand(){
 const logo=assets.logo as string|null;
 return <header className="brandHeader"><span className="brandIdentity">{logo?<span className="ministryLogoFrame"><Image src={logo} alt="사랑의교회 대학부" width={1920} height={1080} sizes="200px" priority className="ministryLogo"/></span>:<span className="brandName">사랑의교회 대학부</span>}</span><span className="brandMark">Christian Community<br/>Leadership Profile</span></header>;
}
