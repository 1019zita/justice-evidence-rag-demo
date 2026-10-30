import { case01Facts, createCase01Analysis } from "../mock/case01";
import type { AnalysisInput, AnalysisResult } from "../types/analysis";
import type { AnalysisService } from "./analysisService";

const DEMO_DELAY_MS = 260;

function ensureFacts(input: AnalysisInput): AnalysisInput {
  return { ...input, facts: input.facts.trim() || case01Facts };
}

function delayed<T>(value: T): Promise<T> {
  return new Promise((resolve) => window.setTimeout(() => resolve(value), DEMO_DELAY_MS));
}

export class MockAnalysisService implements AnalysisService {
  analyzeCase(input: AnalysisInput): Promise<AnalysisResult> {
    return delayed(createCase01Analysis(ensureFacts(input), "case-analysis"));
  }

  checkViewpoint(input: AnalysisInput): Promise<AnalysisResult> {
    return delayed(createCase01Analysis(ensureFacts(input), "viewpoint-check"));
  }

  refineAnalysis(input: AnalysisInput & { analysisId: string }): Promise<AnalysisResult> {
    return delayed(createCase01Analysis(ensureFacts(input), input.viewpoint ? "viewpoint-check" : "case-analysis"));
  }
}
