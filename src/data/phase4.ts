import { shuffle } from "../utils/shuffle";
export type CommunicationAnswer="realer Autor"|"Erzähler"|"realer Leser"|"impliziter Leser"|"Leerstelle"|"Richtig"|"Falsch"|"Mehrdeutigkeit"|"Rezeption";
export type InterpretationAnswer="werkimmanent"|"produktionsorientiert"|"rezeptionsorientiert";
export type Phase4Task<T extends string>={id:string;prompt:string;answer:T;options:readonly T[];feedback:string};
const people:readonly CommunicationAnswer[]=["realer Autor","Erzähler","realer Leser","impliziter Leser"];
const communicationTaskPool:readonly Phase4Task<CommunicationAnswer>[]=[
 {id:"autor",prompt:"Wer hat den literarischen Text tatsächlich geschrieben?",answer:"realer Autor",options:people,feedback:"Der reale Autor verfasst den Text."},
 {id:"vermittlung",prompt:"Wer vermittelt innerhalb eines Romans das Geschehen?",answer:"Erzähler",options:people,feedback:"Der Erzähler ist die textinterne Vermittlungsinstanz."},
 {id:"wirkliche-person",prompt:"Eine Schülerin liest den Roman im Unterricht.",answer:"realer Leser",options:people,feedback:"Sie ist eine tatsächlich lesende Person."},
 {id:"leserrolle",prompt:"Ein Text setzt voraus, dass bestimmte kulturelle Anspielungen verstanden werden.",answer:"impliziter Leser",options:people,feedback:"Hier zeigt sich die im Text angelegte Leserrolle."},
 {id:"autor-erzaehler",prompt:"Ein Ich-Erzähler ist automatisch mit dem realen Autor identisch.",answer:"Falsch",options:["Richtig","Falsch"],feedback:"Autor und Erzähler sind nicht automatisch identisch."},
 {id:"ich-perspektive",prompt:"Ein Ich-Erzähler vermittelt das Geschehen aus einer Ich-Perspektive.",answer:"Richtig",options:["Richtig","Falsch"],feedback:"Die grammatische Ich-Form kennzeichnet seine Vermittlungsperspektive."},
 {id:"mehrdeutung",prompt:"Zwei Schülerinnen erklären das offene Ende derselben Kurzgeschichte unterschiedlich.",answer:"Mehrdeutigkeit",options:["Mehrdeutigkeit","Erzähler","realer Autor","impliziter Leser"],feedback:"Unterschiedliche, textuell begründbare Deutungen sind möglich."},
 {id:"offene-stelle",prompt:"Der Text sagt nicht, warum die Figur weint.",answer:"Leerstelle",options:["Leerstelle","Mehrdeutigkeit","Erzähler","Rezeption"],feedback:"Die nicht erklärte Information bildet eine Leerstelle."},
 {id:"historische-leser",prompt:"Eine heutige Leserin bewertet eine Figur anders als Leser im 19. Jahrhundert.",answer:"Rezeption",options:["Rezeption","realer Autor","Erzähler","Leerstelle"],feedback:"Unterschiedliche reale Leser prägen die Rezeption."}
];
const approaches:readonly InterpretationAnswer[]=["werkimmanent","produktionsorientiert","rezeptionsorientiert"];
const interpretationTaskPool:readonly Phase4Task<InterpretationAnswer>[]=[
 {id:"metaphern",prompt:"Sie untersuchen die Metaphern eines Gedichts.",answer:"werkimmanent",options:approaches,feedback:"Sprache des Textes: werkimmanent."},
 {id:"figuren",prompt:"Sie analysieren die Figurenkonstellation eines Dramas.",answer:"werkimmanent",options:approaches,feedback:"Figuren im Werk: werkimmanent."},
 {id:"erzaehlperspektive",prompt:"Sie untersuchen die Erzählperspektive einer Kurzgeschichte.",answer:"werkimmanent",options:approaches,feedback:"Erzählweise des Textes: werkimmanent."},
 {id:"politik",prompt:"Sie beziehen die politischen Zustände der Entstehungszeit ein.",answer:"produktionsorientiert",options:approaches,feedback:"Entstehungskontext: produktionsorientiert."},
 {id:"briefe",prompt:"Sie untersuchen Briefe des Autors.",answer:"produktionsorientiert",options:approaches,feedback:"Biografisches Material: produktionsorientiert."},
 {id:"epoche",prompt:"Sie vergleichen das Werk mit zentralen Ideen seiner literarischen Epoche.",answer:"produktionsorientiert",options:approaches,feedback:"Literaturgeschichtlicher Kontext: produktionsorientiert."},
 {id:"rezensionen",prompt:"Sie vergleichen zeitgenössische Rezensionen mit heutigen Bewertungen.",answer:"rezeptionsorientiert",options:approaches,feedback:"Leserurteile und Wirkung: rezeptionsorientiert."},
 {id:"altersgruppen",prompt:"Sie untersuchen, wie Jugendliche und Erwachsene dieselbe Figur beurteilen.",answer:"rezeptionsorientiert",options:approaches,feedback:"Unterschiedliche Lesergruppen: rezeptionsorientiert."},
 {id:"zeiten",prompt:"Sie fragen, warum Leser verschiedener Zeiten eine Leerstelle unterschiedlich füllen.",answer:"rezeptionsorientiert",options:approaches,feedback:"Reale Leser und ihre Deutungen: rezeptionsorientiert."}
];
export const createPhase4Round=<T extends string>(tasks:readonly Phase4Task<T>[],random=Math.random)=>shuffle(tasks,random).map(task=>({...task,options:shuffle(task.options,random)}));
export const communicationTasks:readonly Phase4Task<CommunicationAnswer>[]=createPhase4Round(communicationTaskPool);
export const interpretationTasks:readonly Phase4Task<InterpretationAnswer>[]=createPhase4Round(interpretationTaskPool);
export const isCorrectPhase4Answer=<T extends string>(task:Phase4Task<T>,answer:T)=>task.answer===answer;
