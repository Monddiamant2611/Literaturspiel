import type { GlossaryId } from "../../data/glossary";
export type Phase3Stats={secureTextTypeIds:string[];reviewTextTypeIds:string[];wrongTermIds:GlossaryId[];hintedTextTypeIds:string[]};
export const emptyPhase3Stats=():Phase3Stats=>({secureTextTypeIds:[],reviewTextTypeIds:[],wrongTermIds:[],hintedTextTypeIds:[]});
export const addUnique=<T,>(items:readonly T[],values:readonly T[]):T[]=>[...new Set([...items,...values])];
