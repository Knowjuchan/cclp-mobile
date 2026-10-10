export function ageAtAssessment(birthday?:string|null,assessmentDate?:string|null):number|null{
 if(!birthday||!assessmentDate||!/^\d{4}-\d{2}-\d{2}$/.test(birthday))return null;
 const birth=new Date(birthday),exam=new Date(assessmentDate);
 if(!Number.isFinite(birth.getTime())||!Number.isFinite(exam.getTime())||birth.toISOString().slice(0,10)!==birthday)return null;
 const date=exam.toLocaleDateString('en-CA',{timeZone:'Asia/Seoul'});
 if(birthday>date)return null;
 return Number(date.slice(0,4))-Number(birthday.slice(0,4))-(date.slice(5)<birthday.slice(5)?1:0);
}
export function participantLabel(name:string,gender?:string|null,birthday?:string|null,assessmentDate?:string|null,displayAge?:number|null){
 const age=displayAge===undefined?ageAtAssessment(birthday,assessmentDate):displayAge;
 const details=[gender==='남자'||gender==='여자'?gender:null,age===null?null:`만${age}세`].filter(Boolean).join(' ');
 return details?`${name}(${details})`:name;
}
