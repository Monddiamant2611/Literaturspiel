import { describe,expect,it } from "vitest";
import { glossaryEntries } from "../src/data/glossary";
import { comparisonTasks,createPhase3Tasks,featureSelectionTasks,featureText,getTextType,recallTaskPool,termNetworkTasks,validatePhase3Data } from "../src/data/phase3";
describe("Phase 3 task architecture",()=>{
 it("validates every task reference, option and solution",()=>expect(validatePhase3Data()).toEqual([]));
 it("creates eight recognition tasks and three of five comparisons",()=>{const tasks=createPhase3Tasks(()=>.5);expect(tasks.recall).toHaveLength(8);expect(tasks.comparisons).toHaveLength(3);expect(comparisonTasks).toHaveLength(5);for(const task of tasks.recall){expect(new Set(task.optionIds).size).toBe(4);expect(task.optionIds).toContain(task.answerId);expect(getTextType(task.answerId).recognitionFeatures.length).toBeGreaterThan(3)}});
 it("builds feature cards with several plausible distractors",()=>{for(const task of featureSelectionTasks){expect(task.distractors.length).toBeGreaterThanOrEqual(4);expect(task.correctFeatureIndexes.length+task.distractors.length).toBeGreaterThanOrEqual(7);for(const index of task.correctFeatureIndexes)expect(featureText({textTypeId:task.textTypeId,featureIndex:index})).not.toBe("");for(const ref of task.distractors)expect(featureText(ref)).not.toBe("")}});
 it("actively checks mixed Phase 3 glossary terms without answer-bearing hints",()=>{const covered=new Set(termNetworkTasks.flatMap(task=>task.answerIds));expect(covered.size).toBeGreaterThanOrEqual(27);for(const id of covered)expect(glossaryEntries.some(entry=>entry.id===id)).toBe(true);for(const task of termNetworkTasks)for(const answer of task.answerIds)expect(task.hint.toLocaleLowerCase("de")).not.toContain(answer)});
 it("uses plausible same-category distractors",()=>{for(const task of recallTaskPool){const answer=getTextType(task.answerId);expect(task.optionIds.filter(id=>getTextType(id).category===answer.category).length).toBeGreaterThanOrEqual(3)}});
});
