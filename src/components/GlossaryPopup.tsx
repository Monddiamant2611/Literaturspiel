import type { RefObject } from "react";
import type { GlossaryEntry } from "../data/glossary";
import { Button } from "./Button";
import { Modal } from "./Modal";
export function GlossaryPopup({ entry,open,onClose,triggerRef }: { entry:GlossaryEntry;open:boolean;onClose:()=>void;triggerRef:RefObject<HTMLElement|null> }) { const titleId=`glossary-${entry.id}`;return <Modal open={open} onClose={onClose} titleId={titleId} triggerRef={triggerRef}><Button variant="secondary" className="modal__close" aria-label="Glossar schließen" onClick={onClose}>×</Button><p className="eyebrow">Glossar</p><h2 id={titleId}>{entry.term}</h2><p className="modal__definition">{entry.shortDefinition}</p><p>{entry.explanation}</p>{entry.example&&<><h3>Mini-Beispiel</h3><p>{entry.example}</p></>}</Modal>; }
