import { describe,expect,it } from "vitest";
import { communicationTasks,createPhase4Round,interpretationTasks,isCorrectPhase4Answer } from "../src/data/phase4";

describe("Phase 4 core data",()=>{
 it("contains varied communication tasks and strict Ich-Erzähler true/false choices",()=>{expect(communicationTasks).toHaveLength(9);for(const task of communicationTasks)expect(isCorrectPhase4Answer(task,task.answer)).toBe(true);expect(new Set(communicationTasks.find(task=>task.id==="autor-erzaehler")?.options)).toEqual(new Set(["Richtig","Falsch"]))});
 it("contains three cases for every interpretation approach and can mix them",()=>{expect(interpretationTasks).toHaveLength(9);for(const answer of ["werkimmanent","produktionsorientiert","rezeptionsorientiert"])expect(interpretationTasks.filter(task=>task.answer===answer)).toHaveLength(3);let index=0;const mixed=createPhase4Round(interpretationTasks,()=>[.8,.1,.6,.2,.9,.3,.7,.4,.5][index++%9]);expect(mixed.some((task,i)=>i>0&&task.answer!==mixed[i-1].answer)).toBe(true)});
});
