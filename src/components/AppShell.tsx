import type { ReactNode } from "react";
import { DecorativeLayer,type Decoration } from "./DecorativeLayer";
export function AppShell({ children,decorations=[] }: { children:ReactNode;decorations?:readonly Decoration[] }) { return <main className="app-shell"><DecorativeLayer items={decorations}/><div className="app-shell__frame" aria-hidden="true"><i/><i/><i/><i/></div><div className="app-shell__content">{children}</div></main>; }
