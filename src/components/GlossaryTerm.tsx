import { useRef,useState,type ReactNode } from "react";
import { glossaryById,type GlossaryEntry } from "../data/glossary";
import { GlossaryPopup } from "./GlossaryPopup";
export function GlossaryTerm({ glossaryId,children }: { glossaryId:GlossaryEntry["id"];children?:ReactNode }) { const[open,setOpen]=useState(false);const triggerRef=useRef<HTMLButtonElement>(null);const entry=glossaryById[glossaryId];return <><button ref={triggerRef} type="button" className="glossary-term" aria-haspopup="dialog" aria-expanded={open} onClick={()=>setOpen(true)}>{children??entry.term}</button><GlossaryPopup entry={entry} open={open} onClose={()=>setOpen(false)} triggerRef={triggerRef}/></>; }
