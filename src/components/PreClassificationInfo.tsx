import type { RichText } from "../data/textTypes";
import { Button } from "./Button";
import { RichTextRenderer } from "./RichTextRenderer";
export function PreClassificationInfo({ content,open,onOpen }: { content:RichText;open:boolean;onOpen:()=>void }) { if(!open)return <Button variant="secondary" onClick={onOpen} aria-expanded="false">Beschreibung öffnen</Button>;return <div className="pre-info" aria-live="polite"><p className="card-label">Neutrale Beschreibung</p><p><RichTextRenderer content={content}/></p></div>; }
