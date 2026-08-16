import type { ReactNode } from "react";
export type FeedbackTone="neutral"|"correct"|"incorrect"|"hint"|"borderline";
const labels:Record<FeedbackTone,string>={neutral:"Information",correct:"Richtig",incorrect:"Nicht richtig",hint:"Hinweis",borderline:"Grenzfall"};
export function FeedbackBox({ children,tone="neutral" }: { children:ReactNode;tone?:FeedbackTone }) { return <aside className={`feedback feedback--${tone}`} aria-live="polite"><strong>{labels[tone]}</strong><div>{children}</div></aside>; }
