const pipelineSteps = [
  "解析案件事实",
  "识别主要争点",
  "生成竞争性检索请求",
  "检索支持当前判断的材料",
  "检索可能削弱当前判断的材料",
  "整理来源与证据",
  "生成综合核查结果",
];

type AnalysisPipelineProps = { activeStep: number; demoMode: boolean; error?: string };

export function AnalysisPipeline({ activeStep, demoMode, error }: AnalysisPipelineProps) {
  return (
    <main className="pipeline-page">
      <div className="pipeline-orbit orbit-one" /><div className="pipeline-orbit orbit-two" />
      <section className="pipeline-card" aria-live="polite">
        <div className="pipeline-card-header"><span className="brand-mark">证</span><div><p className="eyebrow">{demoMode ? "DEMO ANALYSIS PIPELINE" : "LIVE ANALYSIS PIPELINE"}</p><h1>正在建立证据链</h1></div><span className="pipeline-id">{demoMode ? "DEMO / STATIC AUDIT" : "LIVE / CV-0005"}</span></div>
        <p className="pipeline-copy">系统正在按顺序识别争点、建立竞争性检索请求，并整理支持与可能削弱当前判断的材料。</p>
        <div className="pipeline-progress"><span style={{ width: `${Math.min((activeStep / pipelineSteps.length) * 100, 100)}%` }} /></div>
        <ol className="pipeline-steps">
          {pipelineSteps.map((step, index) => {
            const state = index < activeStep ? "done" : index === activeStep ? "active" : "pending";
            return <li key={step} className={`pipeline-step ${state}`}><span className="pipeline-step-icon">{state === "done" ? "✓" : state === "active" ? "·" : "○"}</span><span>{step}</span>{state === "active" && <small>进行中</small>}</li>;
          })}
        </ol>
        {error ? <div className="inline-error" role="alert">{error}</div> : <p className="pipeline-footnote">这不是一次 prompt completion · 每一步都会保留可回看的分析轨迹</p>}
      </section>
    </main>
  );
}
