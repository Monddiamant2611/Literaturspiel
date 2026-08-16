import { describe,expect,it } from "vitest";
import { glossaryById } from "../src/data/glossary";
import { createLearningRound,learningTextTypes,plainText,textTypes,validateTextTypes } from "../src/data/textTypes";

describe("text type catalogue",()=>{
 it("creates mixed learning rounds containing episches Theater",()=>{let index=0;const values=Array.from({length:learningTextTypes.length},(_,i)=>((i*7)%learningTextTypes.length)/learningTextTypes.length);const round=createLearningRound(()=>values[index++]);expect(round).toHaveLength(learningTextTypes.length);expect(round.some(item=>item.id==="episches-theater")).toBe(true);expect(round.map(item=>item.category).some((category,i,categories)=>i>0&&category!==categories[i-1])).toBe(true)});
 it("contains 45 unique forms without false duplicates",()=>{expect(textTypes).toHaveLength(45);expect(new Set(textTypes.map(item=>item.id)).size).toBe(45);expect(textTypes.filter(item=>item.id==="ballade")).toHaveLength(1);expect(textTypes.filter(item=>item.id==="prosagedicht")).toHaveLength(1);expect(textTypes.some(item=>item.name==="Dialog"||item.name==="Monolog")).toBe(false)});
 it("passes validation with complete learning data",()=>{expect(validateTextTypes(textTypes)).toEqual([]);for(const entry of textTypes){expect(plainText(entry.fullExplanation)).not.toBe("");expect(entry.recognitionFeatures.length).toBeGreaterThanOrEqual(3);for(const content of [entry.preClassificationDescription,entry.fullExplanation,...entry.recognitionFeatures])for(const segment of content)if(segment.type==="glossary")expect(glossaryById[segment.termId]).toBeDefined()}});
});
