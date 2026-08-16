import type { RichText } from "../data/textTypes";
import { GlossaryTerm } from "./GlossaryTerm";
export function RichTextRenderer({ content }: { content:RichText }) { return <>{content.map((segment,index)=>segment.type==="text"?<span key={index}>{segment.value}</span>:<GlossaryTerm key={`${segment.termId}-${index}`} glossaryId={segment.termId}>{segment.value}</GlossaryTerm>)}</>; }
