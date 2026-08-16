import { useState } from "react";
import { AppShell } from "../../components/AppShell";
import type { Decoration } from "../../components/DecorativeLayer";
import { ProgressBar } from "../../components/ProgressBar";
import { createPhase3Tasks } from "../../data/phase3";
import { ComparisonArea } from "./ComparisonArea";
import { FeatureArchiveArea } from "./FeatureArchiveArea";
import { Phase3Summary } from "./Phase3Summary";
import { RecallArea } from "./RecallArea";
import { TermNetworkArea } from "./TermNetworkArea";
import { addUnique,emptyPhase3Stats,type Phase3Stats } from "./types";
type ActiveArea="recall"|"features"|"compare"|"terms";
type Area=ActiveArea|"summary";
const areaOrder:readonly ActiveArea[]=["recall","features","compare","terms"];
const areaLabels:Record<ActiveArea,string>={recall:"Erkennen",features:"Merkmale",compare:"Vergleichen",terms:"Vernetzen"};
const decorations:Record<ActiveArea,readonly Decoration[]>={recall:[{asset:"bookStack",position:"bottom-left",size:"clamp(10rem,20vw,18rem)",opacity:.18,visibility:"tablet-up"},{asset:"scroll",position:"bottom-right",size:"clamp(9rem,17vw,15rem)",opacity:.14,visibility:"desktop"}],features:[{asset:"writingTools",position:"bottom-right",size:"clamp(11rem,22vw,20rem)",opacity:.16,visibility:"tablet-up"},{asset:"quillIcon",position:"bottom-left",size:"clamp(6rem,11vw,9rem)",opacity:.1,visibility:"desktop"}],compare:[{asset:"bustGlobe",position:"bottom-left",size:"clamp(10rem,20vw,18rem)",opacity:.16,visibility:"tablet-up"},{asset:"columns",position:"bottom-right",size:"clamp(10rem,20vw,18rem)",opacity:.13,visibility:"desktop"}],terms:[{asset:"eye",position:"bottom-left",size:"clamp(6rem,12vw,10rem)",opacity:.1,visibility:"desktop"},{asset:"hourglass",position:"bottom-right",size:"clamp(8rem,14vw,12rem)",opacity:.15,visibility:"tablet-up"}]};
export function Phase3Flow({onComplete}:{onComplete:()=>void}){
 const[tasks]=useState(()=>createPhase3Tasks());const[area,setArea]=useState<Area>("recall");const[stats,setStats]=useState<Phase3Stats>(emptyPhase3Stats);
 if(area==="summary")return <Phase3Summary stats={stats} onContinue={onComplete}/>;
 const activeArea:ActiveArea=area;const areaIndex=areaOrder.indexOf(activeArea);const advance=(next:Area)=>setArea(next);
 return <AppShell decorations={decorations[activeArea]}><section className="view view--phase3"><div className="phase-progress"><div className="phase-steps" aria-label="Bereiche der Lernrunde">{areaOrder.map((item,index)=><span key={item} className={index===areaIndex?"active":index<areaIndex?"complete":""}>{areaLabels[item]}</span>)}</div><ProgressBar value={areaIndex+1} max={4} label={`Bereich ${areaIndex+1} von 4`}/></div>
 {activeArea==="recall"&&<RecallArea tasks={tasks.recall} onComplete={result=>{setStats(value=>({...value,secureTextTypeIds:addUnique(value.secureTextTypeIds,result.secure),reviewTextTypeIds:addUnique(value.reviewTextTypeIds,result.review),hintedTextTypeIds:addUnique(value.hintedTextTypeIds,result.hinted)}));advance("features")}}/>}
 {activeArea==="features"&&<FeatureArchiveArea tasks={tasks.features} onComplete={review=>{setStats(value=>({...value,reviewTextTypeIds:addUnique(value.reviewTextTypeIds,review)}));advance("compare")}}/>}
 {activeArea==="compare"&&<ComparisonArea tasks={tasks.comparisons} onComplete={review=>{setStats(value=>({...value,reviewTextTypeIds:addUnique(value.reviewTextTypeIds,review)}));advance("terms")}}/>}
 {activeArea==="terms"&&<><h2 className="eyebrow">Begriffsnetz</h2><TermNetworkArea tasks={tasks.terms} onComplete={wrong=>{setStats(value=>({...value,wrongTermIds:addUnique(value.wrongTermIds,wrong)}));advance("summary")}}/></>}
 </section></AppShell>
}
