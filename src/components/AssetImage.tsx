import type { ImgHTMLAttributes } from "react";
import { assets, type AssetId } from "../data/assets";
export function AssetImage({ id, decorative, ...props }: Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "alt"> & { id: AssetId; decorative?: boolean }) { const item = assets[id]; const isDecorative = decorative ?? item.decorative; return <img src={item.path} alt={isDecorative ? "" : item.alt} aria-hidden={isDecorative || undefined} draggable={false} {...props} />; }
