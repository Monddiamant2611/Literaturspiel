import type { RichText } from "../data/textTypes";
import { RichTextRenderer } from "./RichTextRenderer";
export function RecognitionFeatureList({ features }: { features:readonly RichText[] }) { return <section className="recognition"><h3>Woran erkenne ich sie?</h3><ul>{features.map((feature,index)=><li key={index}><RichTextRenderer content={feature}/></li>)}</ul></section>; }
