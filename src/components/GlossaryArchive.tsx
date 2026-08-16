import { AppShell } from "./AppShell";
import { Button } from "./Button";
import { Card } from "./Card";
import { GlossaryTerm } from "./GlossaryTerm";
import type { GlossaryId } from "../data/glossary";
const groups:readonly {title:string;ids:readonly GlossaryId[]}[]=[
 {title:"Literarische Texte",ids:["fiktionalitaet","poetizitaet","mehrdeutigkeit","ambiguitaet","semantische-verdichtung","leerstelle"]},
 {title:"Gattung und Form",ids:["gattung","textsorte","vers","strophe","quartett","terzett","reim","dialog","monolog","regieanweisung","figurenrede","auffuehrungsbezug"]},
 {title:"Literarische Kommunikation",ids:["autor","erzaehler","impliziter-leser","realer-leser"]},
 {title:"Interpretation",ids:["werkimmanent","produktionsorientiert","rezeptionsorientiert"]}
];
export function GlossaryArchive({onBack}:{onBack:()=>void}){return <AppShell decorations={[{asset:"openBook",position:"bottom-right",size:"clamp(11rem,21vw,19rem)",opacity:.16,visibility:"desktop"}]}><section className="view glossary-archive"><header className="task-heading"><p className="eyebrow">Nachschlagen und wiederholen</p><h1>Begriffsarchiv</h1><p>Zentrale Fachbegriffe der Literaturwissenschaft entdecken und wiederholen.</p></header>{groups.map(group=><section key={group.title}><h2>{group.title}</h2><div className="glossary-archive__grid">{group.ids.map(id=><Card key={id}><GlossaryTerm glossaryId={id}/></Card>)}</div></section>)}<div className="actions"><Button variant="secondary" onClick={onBack}>Zurück zum Start</Button></div></section></AppShell>}
