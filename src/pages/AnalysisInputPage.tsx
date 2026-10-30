import { useState } from "react";
import { case01Input } from "../mock/case01";
import type { AnalysisInput, AnalysisMode } from "../types/analysis";

type AnalysisInputPageProps = {
  demoMode: boolean;
  mode: AnalysisMode;
  onBack: () => void;
  onSubmit: (input: AnalysisInput) => void;
};

const modeCopy = {
  "case-analysis": {
    eyebrow: "MODE A · CASE ANALYSIS",
    title: "分析案件",
    description: "输入案件事实或法律问题，系统将自动识别主要争点，并同时检索支持与削弱不同判断的证据。",
  },
  "viewpoint-check": {
    eyebrow: "MODE B · VIEWPOINT CHECK",
    title: "核查我的观点",
    description: "输入案件事实及你的当前判断，系统将专门检索支持依据、可能削弱该判断的证据、适用边界及其他合理解释。",
  },
} as const;

export function AnalysisInputPage({ demoMode, mode, onBack, onSubmit }: AnalysisInputPageProps) {
  const copy = modeCopy[mode];
  const [facts, setFacts] = useState(mode === "case-analysis" ? case01Input.facts : "");
  const [question, setQuestion] = useState(mode === "case-analysis" ? case01Input.question ?? "" : "");
  const [viewpoint, setViewpoint] = useState(mode === "viewpoint-check" ? case01Input.viewpoint ?? "" : "");

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit({ facts, question: question || undefined, viewpoint: mode === "viewpoint-check" ? viewpoint || undefined : undefined });
  }

  function loadDemo() {
    setFacts(case01Input.facts);
    setQuestion(case01Input.question ?? "");
    setViewpoint(case01Input.viewpoint ?? "");
  }

  const canSubmit = facts.trim().length > 20 && (mode === "case-analysis" || viewpoint.trim().length > 5);
  const modeNotice = demoMode ? "静态展示模式：提交使用预置 mock，不请求外部后端。" : "实时模式：材料将发送到本地分析 API，不会静默回退到 mock。";

  return (
    <div className="input-page">
      <header className="workspace-header page-width">
        <button className="brand brand-button" type="button" onClick={onBack} aria-label="返回首页">
          <span className="brand-mark">证</span><span><strong>司法证据核查助手</strong><small>司法竞争性证据工作台</small></span>
        </button>
        <div className="header-step"><span>01</span><b>输入案件</b><i /> <span>02</span> 分析 <i /> <span>03</span> 核查</div>
      </header>
      <main className="input-main page-width">
        <button className="back-link" type="button" onClick={onBack}>← 返回选择工作方式</button>
        <div className="input-layout">
          <section className="input-intro">
            <p className="eyebrow">{copy.eyebrow}</p>
            <h1>{copy.title}</h1>
            <p>{copy.description}</p>
            <div className="method-note"><span className="method-note-icon">⌁</span><div><strong>竞争性证据检索</strong><span>系统不会只找能印证当前方向的材料。</span></div></div>
            <div className="input-flow-list"><span><b>01</b> 解析事实与已有判断</span><span><b>02</b> 生成多个争点查询</span><span><b>03</b> 分别核查支持与削弱证据</span></div>
          </section>
          <form className="case-form" onSubmit={submit}>
            <div className="form-topline"><div><span className="form-label">案件材料</span><span className="required-mark">必填</span></div><button type="button" className="text-button" onClick={loadDemo}>载入 CASE-01 demo ↗</button></div>
            <label className="field-label" htmlFor="facts">案件事实 <span>描述已知事实、时间线和争议行为</span></label>
            <textarea id="facts" value={facts} onChange={(event) => setFacts(event.target.value)} placeholder="例如：某高校依据校规对学生作出退学处理……" rows={8} />
            {mode === "viewpoint-check" && <>
              <label className="field-label" htmlFor="viewpoint">我的当前判断 <span>系统会主动寻找可能削弱它的证据</span></label>
              <textarea id="viewpoint" value={viewpoint} onChange={(event) => setViewpoint(event.target.value)} placeholder="例如：我认为学校退学处理存在程序合法性问题……" rows={4} />
            </>}
            <label className="field-label" htmlFor="question">希望重点核查的问题 <span>可选</span></label>
            <textarea id="question" value={question} onChange={(event) => setQuestion(event.target.value)} placeholder="例如：重点核查处分程序是否合法" rows={3} />
            <div className="form-bottom"><span className="privacy-note"><span>◌</span> {modeNotice}</span><button className="primary-button" type="submit" disabled={!canSubmit}>开始分析 <span>→</span></button></div>
          </form>
        </div>
      </main>
    </div>
  );
}
