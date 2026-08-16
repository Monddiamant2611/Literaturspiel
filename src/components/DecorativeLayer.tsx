import { AssetImage } from "./AssetImage";
import type { AssetId } from "../data/assets";
export type Decoration={asset:AssetId;position:"top-left"|"top-right"|"bottom-left"|"bottom-right";size?:string;opacity?:number;rotation?:number;zIndex?:number;visibility?:"all"|"tablet-up"|"desktop";flipX?:boolean};
export function DecorativeLayer({ items }: { items:readonly Decoration[] }) { return <div className="decorative-layer" aria-hidden="true">{items.map((item,index)=><span key={`${item.asset}-${index}`} className={`decoration decoration--${item.position} decoration--${item.visibility??"all"}`} style={{width:item.size,opacity:item.opacity,zIndex:item.zIndex,transform:`rotate(${item.rotation??0}deg) scaleX(${item.flipX?-1:1})`}}><AssetImage id={item.asset} decorative /></span>)}</div>; }
