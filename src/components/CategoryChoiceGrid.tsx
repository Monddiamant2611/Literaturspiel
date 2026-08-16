import { useMemo } from "react";
import { categoryLabels,categoryOrder,type TextCategory } from "../data/textTypes";
import { shuffle } from "../utils/shuffle";
export function CategoryChoiceGrid({selected,onSelect}:{selected:TextCategory|null;onSelect:(category:TextCategory)=>void}){const options=useMemo(()=>shuffle(categoryOrder),[]);return <fieldset className="category-fieldset" disabled={selected!==null}><legend>Welchem Bereich ordnen Sie die Textsorte zu?</legend><div className="category-grid">{options.map(category=><button type="button" key={category} className={`category-choice ${selected===category?"category-choice--selected":""}`} aria-pressed={selected===category} onClick={()=>onSelect(category)}>{categoryLabels[category]}</button>)}</div></fieldset>}
