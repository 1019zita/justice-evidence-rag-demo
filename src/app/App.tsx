import { useState } from "react";
import { AnalysisPipeline } from "../components/analysis/AnalysisPipeline";
import { demoSamplesById, type DemoCaseId } from "../demo/demoCases";
import { MockAnalysisService } from "../services/mockAnalysisService";
import { HttpAnalysisService } from "../services/httpAnalysisService";
import type { AnalysisService } from "../services/analysisService";
import { AnalysisInputPage } from "../pages/AnalysisInputPage";
import { AnalysisWorkspacePage } from "../pages/AnalysisWorkspacePage";
import { HomePage } from "../pages/HomePage";
import type { AnalysisInput, AnalysisMode, AnalysisResult } from "../types/analysis";

type Screen = "home" | "input" | "pipeline" | "workspace";

const analysisService: AnalysisService = import.meta.env.VITE_ANALYSIS_MODE === "mock"
  ? new MockAnalysisService()
  : new HttpAnalysisService();
const demoMode = import.meta.env.VITE_DEMO_MODE === "true";

export function App() {
  const [screen, setScreen] = useState<Screen>("home");
  const [mode, setMode] = useState<AnalysisMode>("case-analysis");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [pipelineStep, setPipelineStep] = useState(0);
  const [pipelineError, setPipelineError] = useState<string>();

  function openInput(nextMode: AnalysisMode) { setMode(nextMode); setScreen("input"); }
  function openDemo(caseId: DemoCaseId) {
    setResult(demoSamplesById[caseId].result);
    setScreen("workspace");
  }
  function startAnalysis(input: AnalysisInput) {
    setPipelineError(undefined);
    setPipelineStep(0);
    setScreen("pipeline");
    const method = mode === "case-analysis" ? "analyzeCase" : "checkViewpoint";
    const progressTimer = window.setInterval(() => setPipelineStep(step => Math.min(step + 1, 7)), 700);
    analysisService[method](input).then(nextResult => {
      window.clearInterval(progressTimer);
      setPipelineStep(7);
      setResult(nextResult);
      setScreen("workspace");
    }).catch((error: unknown) => {
      window.clearInterval(progressTimer);
      setPipelineError(error instanceof Error ? error.message : "实时分析失败，请检查本地 API。");
    });
  }
  function resetToHome() { setResult(null); setScreen("home"); }
  if (screen === "input") return <AnalysisInputPage demoMode={demoMode} mode={mode} onBack={resetToHome} onSubmit={startAnalysis} />;
  if (screen === "home") return <HomePage demoMode={demoMode} onSelectMode={openInput} onSelectDemo={openDemo} />;
  if (screen === "pipeline") return <AnalysisPipeline activeStep={pipelineStep} error={pipelineError} />;
  return result ? <AnalysisWorkspacePage result={result} onNewAnalysis={resetToHome} /> : <AnalysisPipeline activeStep={pipelineStep} error="分析结果为空，请返回重新提交。" />;
}
