import { useState } from "react";
import { AppShell } from "./components/AppShell";
import { AssetImage } from "./components/AssetImage";
import { Button } from "./components/Button";
import type { Decoration } from "./components/DecorativeLayer";
import { GlossaryArchive } from "./components/GlossaryArchive";
import { ProgressBar } from "./components/ProgressBar";
import { SectionHeader } from "./components/SectionHeader";
import { TextTypeLearningCard } from "./components/TextTypeLearningCard";
import { categoryLabels,createLearningRound,type TextCategory } from "./data/textTypes";
import { Phase3Flow } from "./features/phase3/Phase3Flow";
import { Phase4Flow } from "./features/phase4/Phase4Flow";
import { GenreIntroduction } from "./features/genres/GenreIntroduction";

type Screen="start"|"glossary"|"genres"|"round"|"complete"|"phase3"|"phase4";
const frames:readonly Decoration[]=[{asset:"frameTopLeft",position:"top-left",size:"clamp(9rem,17vw,17rem)",opacity:.4,visibility:"tablet-up"},{asset:"frameTopRight",position:"top-right",size:"clamp(9rem,17vw,17rem)",opacity:.4,visibility:"tablet-up"}];
const neutralDecorations:readonly Decoration[]=[...frames,{asset:"scroll",position:"bottom-left",size:"clamp(12rem,23vw,22rem)",opacity:.24,rotation:-7,visibility:"tablet-up"},{asset:"writingTools",position:"bottom-right",size:"clamp(13rem,25vw,24rem)",opacity:.2,rotation:2,visibility:"desktop"}];
const categoryDecoration:Record<TextCategory,Decoration>={epik:{asset:"openBook",position:"bottom-left",size:"clamp(12rem,23vw,22rem)",opacity:.24,visibility:"tablet-up"},lyrik:{asset:"lyre",position:"bottom-right",size:"clamp(11rem,21vw,19rem)",opacity:.22,rotation:4,visibility:"tablet-up"},dramatik:{asset:"theatreMasks",position:"bottom-right",size:"clamp(12rem,23vw,22rem)",opacity:.2,visibility:"tablet-up"},sachtext:{asset:"eye",position:"bottom-right",size:"clamp(8rem,15vw,13rem)",opacity:.14,visibility:"desktop"},contextual:{asset:"hourglass",position:"bottom-left",size:"clamp(10rem,18vw,16rem)",opacity:.2,rotation:-3,visibility:"tablet-up"}};
const completionDecorations:readonly Decoration[]=[...frames,{asset:"seal",position:"bottom-right",size:"clamp(11rem,21vw,20rem)",opacity:.32,rotation:4,visibility:"tablet-up"}];

export function App(){
 const[screen,setScreen]=useState<Screen>("start");const[index,setIndex]=useState(0);const[round,setRound]=useState(createLearningRound);const[revealedCategory,setRevealedCategory]=useState<TextCategory|null>(null);const entry=round[index];const learningTextTypes=round;
 const beginRound=()=>{setRound(createLearningRound());setIndex(0);setRevealedCategory(null);setScreen("round")};const begin=()=>setScreen("genres");
 const next=()=>{if(index===round.length-1){setScreen("complete");return}setIndex(value=>value+1);setRevealedCategory(null)};
 if(screen==="start")return <AppShell decorations={neutralDecorations}><section className="view view--start" aria-labelledby="main-title"><p className="eyebrow">Entdecken · Zuordnen · Verstehen</p><h1 id="main-title">Das Literatur-Archiv</h1><p className="subtitle">Erste Orientierung in der Welt der Textsorten</p><AssetImage id="bookDivider" decorative className="divider"/><p className="intro">Lernen Sie zentrale Textsorten und literaturwissenschaftliche Fachbegriffe kennen.</p><div className="completion-actions"><Button onClick={begin}>Archiv öffnen <AssetImage id="arrowRight" decorative className="button__icon"/></Button><Button variant="secondary" onClick={()=>setScreen("glossary")}>Begriffsarchiv</Button></div></section></AppShell>;
 if(screen==="glossary")return <GlossaryArchive onBack={()=>setScreen("start")}/>;
 if(screen==="genres")return <GenreIntroduction onComplete={beginRound}/>;
 if(screen==="round")return <AppShell decorations={revealedCategory?[...frames,categoryDecoration[revealedCategory]]:neutralDecorations}><section className="view view--round"><div className="round-header"><SectionHeader eyebrow="Lernrunde 01" title={revealedCategory?`${entry.name} · ${categoryLabels[entry.category]}`:"Textsorte zuordnen"} description={revealedCategory?"Die Einordnung ist aufgelöst. Vertiefen Sie nun die Erkennungsmerkmale.":"Entscheiden Sie direkt oder öffnen Sie zuerst die lösungsneutrale Beschreibung."}/><ProgressBar value={index+1} max={learningTextTypes.length} label="Textsortenfortschritt"/></div><TextTypeLearningCard key={entry.id} entry={entry} isLast={index===learningTextTypes.length-1} onAnswer={()=>setRevealedCategory(entry.category)} onNext={next}/></section></AppShell>;
 if(screen==="phase3")return <Phase3Flow onComplete={()=>setScreen("phase4")}/>;
 if(screen==="phase4")return <Phase4Flow/>;
 return <AppShell decorations={completionDecorations}><section className="view view--complete" aria-labelledby="complete-title"><div className="completion-icon"><AssetImage id="bookIcon"/><span aria-hidden="true">✓</span></div><p className="eyebrow">Lernrunde abgeschlossen</p><h1 id="complete-title">Erste Ordnung hergestellt</h1><p className="completion-copy">Sie haben zentrale Textsorten kennengelernt und den Bereichen Epik, Lyrik, Dramatik, Sachtext oder Kontextabhängig zugeordnet.</p><p className="completion-outlook">Im nächsten Schritt erkennen und verbinden Sie Merkmale selbstständig.</p><div className="completion-actions"><Button onClick={()=>setScreen("phase3")}>Das Archiv prüfen <AssetImage id="arrowRight" decorative className="button__icon"/></Button><Button variant="secondary" onClick={begin}><AssetImage id="arrowLeft" decorative className="button__icon"/> Lernrunde erneut beginnen</Button></div></section></AppShell>
}
