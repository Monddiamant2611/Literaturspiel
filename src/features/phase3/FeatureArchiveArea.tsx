import { useMemo,useState } from "react";
import { AssetImage } from "../../components/AssetImage";
import { Button } from "../../components/Button";
import { Card } from "../../components/Card";
import { featureText,getTextType,type FeatureSelectionTask } from "../../data/phase3";
import { shuffle } from "../../utils/shuffle";

type Option={id:string;text:string;correct:boolean};

export function FeatureArchiveArea({tasks,onComplete}:{tasks:readonly FeatureSelectionTask[];onComplete:(reviewIds:string[])=>void}){
 const[index,setIndex]=useState(0);const[selected,setSelected]=useState<string[]>([]);const[checked,setChecked]=useState(false);const[review,setReview]=useState<string[]>([]);const task=tasks[index];
 const options=useMemo<Option[]>(()=>shuffle([...task.correctFeatureIndexes.map(featureIndex=>({id:`correct-${featureIndex}`,text:featureText({textTypeId:task.textTypeId,featureIndex}),correct:true})),...task.distractors.map((ref,i)=>({id:`distractor-${i}`,text:featureText(ref),correct:false}))]),[task]);
 const toggle=(id:string)=>{if(!checked)setSelected(items=>items.includes(id)?items.filter(item=>item!==id):[...items,id])};
 const exact=options.every(option=>option.correct===selected.includes(option.id));
 const check=()=>{setChecked(true);if(!exact)setReview(items=>[...items,task.textTypeId])};
 const next=()=>{if(index===tasks.length-1){onComplete(review);return}setIndex(value=>value+1);setSelected([]);setChecked(false)};
 const status=(option:Option)=>{if(!checked)return selected.includes(option.id)?"selected":"idle";if(option.correct&&selected.includes(option.id))return"correct";if(option.correct)return"missing";if(selected.includes(option.id))return"incorrect";return"idle"};
 return <section className="phase-area"><header className="task-heading"><p className="eyebrow">Bereich B · Aufgabe {index+1} von {tasks.length}</p><h1>Merkmalsarchiv</h1><p>Wählen Sie alle Merkmale, die zu <strong>{getTextType(task.textTypeId).name}</strong> gehören.</p></header><div className="feature-card-grid">{options.map(option=>{const state=status(option);return <button type="button" key={option.id} className={`feature-choice feature-choice--${state}`} aria-pressed={selected.includes(option.id)} disabled={checked} onClick={()=>toggle(option.id)}><span>{option.text}</span>{checked&&state!=="idle"&&<span className="feature-status">{state==="correct"&&<><AssetImage id="check"/> Richtig</>}{state==="incorrect"&&<><AssetImage id="x"/> Gehört nicht dazu</>}{state==="missing"&&<>Fehlte noch</>}</span>}</button>})}</div>{!checked?<div className="actions"><Button onClick={check} disabled={!selected.length}>Auswahl prüfen</Button></div>:<><Card className="result-note"><p>{exact?"Alle passenden Merkmale erkannt.":"Die Zuordnung ist aufgelöst. Fehlende und unpassende Merkmale sind gekennzeichnet."}</p></Card><div className="actions"><Button onClick={next}>{index===tasks.length-1?"Zum Vergleich":"Nächste Textsorte"}</Button></div></>}</section>;
}
