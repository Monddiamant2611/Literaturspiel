import { useState } from "react";
import type { TextCategory,TextType } from "../data/textTypes";
import { AssetImage } from "./AssetImage";
import { Button } from "./Button";
import { Card } from "./Card";
import { CategoryChoiceGrid } from "./CategoryChoiceGrid";
import { ClassificationFeedback } from "./ClassificationFeedback";
import { KnowledgeCard } from "./KnowledgeCard";
import { PreClassificationInfo } from "./PreClassificationInfo";
export function TextTypeLearningCard({ entry,isLast,onAnswer,onNext }: { entry:TextType;isLast:boolean;onAnswer:(category:TextCategory)=>void;onNext:()=>void }) { const[descriptionOpen,setDescriptionOpen]=useState(false);const[selected,setSelected]=useState<TextCategory|null>(null);const choose=(category:TextCategory)=>{if(selected)return;setSelected(category);onAnswer(category)};return <div className="learning-cycle"><Card className="text-type-card"><p className="card-label">Textsorte entdecken</p><h2>{entry.name}</h2><PreClassificationInfo content={entry.preClassificationDescription} open={descriptionOpen} onOpen={()=>setDescriptionOpen(true)}/><CategoryChoiceGrid selected={selected} onSelect={choose}/></Card>{selected&&<><ClassificationFeedback selected={selected} correct={entry.category}/><KnowledgeCard entry={entry}/><div className="actions"><Button onClick={onNext}>{isLast?"Lernrunde abschließen":"Nächste Textsorte"}<AssetImage id="arrowRight" decorative className="button__icon"/></Button></div></>}</div>; }
