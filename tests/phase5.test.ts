import { describe,expect,it } from "vitest";
import { finalTestTasks,isExactAnswer,scoreTest,transferTasks } from "../src/data/phase5";
describe("Phase 5 core",()=>{
 it("provides five transfer and eight final-test tasks",()=>{expect(transferTasks).toHaveLength(5);expect(finalTestTasks).toHaveLength(8)});
 it("evaluates transfer multiple choice exactly",()=>{const task=transferTasks.find(item=>item.correctAnswers.length>1)!;const distractor=task.options.find(option=>!task.correctAnswers.includes(option))!;expect(isExactAnswer(task,task.correctAnswers)).toBe(true);expect(isExactAnswer(task,task.correctAnswers.slice(0,-1))).toBe(false);expect(isExactAnswer(task,[...task.correctAnswers,distractor])).toBe(false)});
 it("scores only completely correct test answers",()=>{const answers=finalTestTasks.map(task=>[...task.correctAnswers]);expect(scoreTest(answers)).toBe(8);answers[7]=[];expect(scoreTest(answers)).toBe(7);answers[0]=[finalTestTasks[0].options.find(option=>!finalTestTasks[0].correctAnswers.includes(option))!];expect(scoreTest(answers)).toBe(6)});
 it("contains no glossary-backed task data or answer feedback",()=>{for(const task of finalTestTasks){expect(Object.keys(task)).toEqual(["id","prompt","options","correctAnswers","multipleChoice"]);expect(task.options).toContain(task.correctAnswers[0])}});
});
