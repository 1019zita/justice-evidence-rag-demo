import { case01Input, createCase01Analysis } from "../mock/case01";
import type { AnalysisResult } from "../types/analysis";
import type { EvidenceItem } from "../types/evidence";

export type DemoCaseId = "CASE-01" | "CASE-02" | "CASE-03";

export type DemoSample = {
  id: DemoCaseId;
  title: string;
  field: string;
  summary: string;
  result: AnalysisResult;
};

const canonicalArtifact: AnalysisResult["canonicalArtifact"] = {
  version: "HG2-0005",
  internalConditionArtifactVersion: "HG2-0004",
  sourcePaths: [
    "experiments/human_gate_v2/HG2-0005/EXPERIMENT_VIGNETTE_MANIFEST.json",
    "experiments/human_gate_v2/HG2-0005/EVIDENCE_KEY_SENTENCE_AUDIT.csv",
    "experiments/human_gate_v2/HG2-0005/CONDITION_ARTIFACTS.json",
  ],
  contentHashEquivalent: {
    hg2_0004: { vignetteManifest: "NO", keySentenceAudit: "YES", conditionArtifacts: "YES" },
    hg2_0003: { vignetteManifest: "NO", keySentenceAudit: "YES", conditionArtifacts: "NO" },
  },
};

const sourceEvidenceSource = "HG2-0005 / EVIDENCE_KEY_SENTENCE_AUDIT.csv + CONDITION_ARTIFACTS.json";

function verifiedExcerptEvidence(config: {
  id: string;
  issueIds: string[];
  direction: "supporting" | "weakening";
  title: string;
  sourceType: string;
  keySentence: string;
  sourceOrigin: string;
  relevanceReason: string;
}): EvidenceItem {
  return {
    id: config.id,
    issueIds: config.issueIds,
    direction: config.direction,
    title: config.title,
    sourceType: config.sourceType,
    authorityLevel: "已审核来源",
    authorityReason: "标题、来源类型与 key sentence 对照 HG2-0005 冻结材料。",
    sourceEvidenceStatus: "verified",
    sourceEvidenceSource,
    keySentence: config.keySentence,
    relevanceReason: config.relevanceReason,
    applicability: {
      level: "medium",
      reason: "当前展示仅保留冻结 key sentence；单条适用性审计字段未随样板开放。",
      status: "unavailable",
    },
    fullText: config.keySentence,
    source: { origin: config.sourceOrigin },
    retrievalProvenance: {
      status: "unavailable",
      authorityAuditStatus: "unavailable",
      applicabilityAuditStatus: "unavailable",
    },
  };
}

function unavailableCoverage(sourceCount: number): AnalysisResult["retrievalCoverage"] {
  const unavailable = { status: "unavailable" as const, source: "HG2-0005 audit payload did not expose this field" };
  return {
    sourceCounts: { "审核独立来源": sourceCount },
    candidateCount: sourceCount,
    authorityPassedCount: 0,
    applicabilityPassedCount: 0,
    citedCount: 0,
    coveredSources: [],
    knownGaps: [],
    provenance: {
      sourceCounts: { status: "verified", source: "HG2-0005 CONDITION_ARTIFACTS.json audit_panel.coverage.independent_source_count" },
      candidateCount: { status: "verified", source: "HG2-0005 CONDITION_ARTIFACTS.json audit_panel.coverage.independent_source_count" },
      authorityPassedCount: unavailable,
      applicabilityPassedCount: unavailable,
      citedCount: unavailable,
      timeRange: unavailable,
      coveredSources: unavailable,
      knownGaps: unavailable,
    },
  };
}

const case02Facts = "2024年3月1日，当事人甲（男）与当事人乙通过相亲相识。3月3日，双方在当事人乙老家甲省见面。3月4日，双方办理结婚登记。同日，当事人甲通过现金、转账方式共给付当事人乙彩礼20万元。3月6日，双方回到乙省当事人甲家。同年3月14日，当事人乙以旅游为由离开。之后当事人甲多次要求当事人乙返回共同生活，当事人乙均未返回。2024年4月15日当事人乙通过微信告知当事人甲称：“我们相识几天就匆匆结婚，双方不了解，并没有任何感情基础，所以我现在准备与你离婚……”。因当事人甲要求当事人乙返还彩礼未果，遂诉请离婚并要求当事人乙返还彩礼20万元。";

const case03Facts = "行为人乙醉酒驾驶机动车与行为人甲发生交通争执，随即下车殴打行为人甲，后返回车内取出管制砍刀连续击打行为人甲颈部、腰部等要害部位；击打过程中砍刀脱手落地，行为人甲抢先捡起砍刀反击，在行为人乙受伤跑向轿车时继续追砍数刀（部分未中）；最终行为人乙因失血性休克死亡。";

const case02Result: AnalysisResult = {
  analysisId: "case02-static-demo",
  mode: "case-analysis",
  createdAt: "2026-10-30T00:00:00.000Z",
  input: { facts: case02Facts, question: "彩礼返还是否应结合共同生活、彩礼使用和合理支出综合判断？" },
  canonicalArtifact,
  caseSummary: case02Facts,
  issues: [
    { id: "case02-issue-01", title: "彩礼缔结婚姻的核心目的是否实现", description: "重点观察登记、共同生活、婚姻关系存续和共同体是否实质形成。" },
    { id: "case02-issue-02", title: "返还比例应考虑哪些共同生活与支出事实", description: "彩礼使用、共同消费、孕育、嫁妆及双方过错均可能影响具体比例。" },
  ],
  overallAssessment: {
    summary: "当前已审核材料支持将共同生活实质、彩礼使用、合理支出等事实作为返还评价的核心；但具体比例仍取决于共同生活、支出和经济数据等尚未完整核实的信息。",
    strength: "moderate",
    uncertaintySummary: "仍有 3 项关键事实会影响具体返还比例。",
  },
  supportingEvidence: [
    verifiedExcerptEvidence({ id: "case02-e01", issueIds: ["case02-issue-01"], direction: "supporting", title: "山西省高级人民法院、山西省妇女联合会联合发布涉彩礼纠纷典型案例", sourceType: "典型案例", keySentence: "未办理结婚登记且未共同生活的，给付彩礼目的完全未实现，人民法院应支持较高比例返还。", sourceOrigin: "北大法宝 / HG2-0005 审核材料", relevanceReason: "直接对应未形成婚姻共同生活时彩礼给付目的是否实现这一争点。" }),
    verifiedExcerptEvidence({ id: "case02-e02", issueIds: ["case02-issue-01", "case02-issue-02"], direction: "supporting", title: "《最高人民法院关于审理涉彩礼纠纷案件适用法律若干问题的规定》", sourceType: "司法解释", keySentence: "已登记但共同生活时间极短且彩礼数额过高的，应综合多项事实确定较高比例返还。", sourceOrigin: "中华人民共和国最高人民法院", relevanceReason: "说明登记本身不是唯一判断因素，返还评价需要结合共同生活与彩礼数额。" }),
  ],
  weakeningEvidence: [
    verifiedExcerptEvidence({ id: "case02-e03", issueIds: ["case02-issue-02"], direction: "weakening", title: "最高人民法院、民政部、全国妇联联合发布涉彩礼纠纷典型案例之三", sourceType: "典型案例", keySentence: "双方办理结婚登记且有短暂同居经历的，法院认定应扣除共同消费等合理开支后仅部分返还。", sourceOrigin: "北大法宝", relevanceReason: "提示短婚登记、短暂同居和共同消费等事实可能削弱直接全额返还的解释。" }),
    verifiedExcerptEvidence({ id: "case02-e04", issueIds: ["case02-issue-01", "case02-issue-02"], direction: "weakening", title: "《人民法院涉彩礼纠纷典型案例》", sourceType: "司法解释", keySentence: "已登记且存在共同生活或终止妊娠等事实的，应当综合考量双方权益，不支持全额返还。", sourceOrigin: "中华人民共和国最高人民法院", relevanceReason: "提示共同生活和孕育等事实会改变返还比例评价。" }),
  ],
  alternativeExplanations: [{ id: "case02-alt-01", issueIds: ["case02-issue-01", "case02-issue-02"], text: "登记后拒绝共同生活支持较高比例返还，但若存在短暂同居或共同支出则需酌情扣减。" }],
  unresolvedFacts: [
    { id: "case02-fact-01", fact: "双方是否形成稳定共同生活及共同家庭状态尚需核实", whyItMatters: "共同生活实质是区分彩礼目的是否实现的重要事实。", severity: "high" },
    { id: "case02-fact-02", fact: "彩礼是否实际使用、是否存在共同消费或嫁妆尚需核实", whyItMatters: "合理支出和财物使用可能影响返还比例。", severity: "high" },
    { id: "case02-fact-03", fact: "双方所在地经济数据与当地习俗尚未完整提供", whyItMatters: "可能影响彩礼是否过高及具体比例判断。", severity: "medium" },
  ],
  retrievalCoverage: unavailableCoverage(5),
  followUpSuggestions: ["重点核查共同生活事实", "只查看最高人民法院来源", "如果存在共同消费，会如何影响返还比例？"],
};

const case03Result: AnalysisResult = {
  analysisId: "case03-static-demo",
  mode: "case-analysis",
  createdAt: "2026-10-30T00:00:00.000Z",
  input: { facts: case03Facts, question: "追砍阶段的不法侵害是否仍处于正在进行状态？" },
  canonicalArtifact,
  caseSummary: case03Facts,
  issues: [
    { id: "case03-issue-01", title: "不法侵害是否仍处于正在进行状态", description: "重点观察侵害人是否实质脱离现场，以及是否仍有继续攻击的现实可能。" },
    { id: "case03-issue-02", title: "防卫行为是否明显超过必要限度", description: "需要结合暴力工具、现场危险和防卫连续性综合判断。" },
    { id: "case03-issue-03", title: "防卫判断应采用何种情境视角", description: "区分行为时的紧迫情境与事后完整信息下的评价。" },
  ],
  overallAssessment: {
    summary: "当前已审核材料围绕“侵害是否仍在进行”形成竞争性规则；支持材料强调现场危险的延续可能，削弱材料提示若侵害人已经失去能力或放弃侵害，评价将发生变化。",
    strength: "mixed",
    uncertaintySummary: "仍有 2 项关键事实会影响对追砍阶段的评价。",
  },
  supportingEvidence: [
    verifiedExcerptEvidence({ id: "case03-e01", issueIds: ["case03-issue-01", "case03-issue-03"], direction: "supporting", title: "马某海、李某正当防卫案", sourceType: "参考案例", keySentence: "判断不法侵害是否结束不能苛求防卫人精准判断，危险仍有延续可能的应认定侵害仍在进行。", sourceOrigin: "四川省广元市中级人民法院", relevanceReason: "直接对应紧迫现场中侵害是否结束以及防卫人判断标准。" }),
    verifiedExcerptEvidence({ id: "case03-e02", issueIds: ["case03-issue-02", "case03-issue-03"], direction: "supporting", title: "最高人民检察院指导性案例第 47 号：于海明正当防卫案", sourceType: "指导性案例", keySentence: "正当防卫应当立足具体行为与现场紧迫情境，综合研判侵害行为的发展过程与防卫连续性。", sourceOrigin: "最高人民检察院", relevanceReason: "支持从行为当时的紧迫情境和连续过程评价防卫，而非单看结果。" }),
  ],
  weakeningEvidence: [
    verifiedExcerptEvidence({ id: "case03-e03", issueIds: ["case03-issue-01"], direction: "weakening", title: "马某海、李某正当防卫案", sourceType: "参考案例", keySentence: "不法侵害人失去侵害能力或确已放弃侵害的，客观上应当认定不法侵害已经结束。", sourceOrigin: "四川省广元市中级人民法院", relevanceReason: "提示若现场事实能够证明侵害已经终止，后续行为可能不满足防卫时间条件。" }),
    verifiedExcerptEvidence({ id: "case03-e04", issueIds: ["case03-issue-01", "case03-issue-02"], direction: "weakening", title: "马某海、李某正当防卫案", sourceType: "参考案例", keySentence: "不法侵害人确已脱离现场或放弃不法侵害后，后续实施的殴打追击行为不符合防卫适时性条件。", sourceOrigin: "四川省广元市中级人民法院", relevanceReason: "构成对“追砍仍是连续防卫行为”解释的事实边界提醒。" }),
  ],
  alternativeExplanations: [{ id: "case03-alt-01", issueIds: ["case03-issue-01", "case03-issue-03"], text: "侵害人砍刀脱手但跑向车辆，防卫人认定其取刀继续侵害与事后侵害已结束主张存在判断视角差异。" }],
  unresolvedFacts: [
    { id: "case03-fact-01", fact: "行为人乙跑向轿车时的真实意图尚缺少直接证据", whyItMatters: "取刀继续攻击与逃离现场会影响侵害是否仍在进行的判断。", severity: "high" },
    { id: "case03-fact-02", fact: "抢刀、追砍和停止追击之间的精确时间间隔尚未完整确认", whyItMatters: "时间连续性会影响追砍是否属于制止现实危险。", severity: "medium" },
  ],
  retrievalCoverage: unavailableCoverage(2),
  followUpSuggestions: ["重点核查防卫时间条件", "如果侵害人已经放弃攻击，会改变评价吗？", "只查看指导性案例来源"],
};

export const demoSamples: DemoSample[] = [
  { id: "CASE-01", title: "高校学籍与证书管理", field: "教育行政 / 行政诉讼", summary: "高校退学处理、程序保障与后续证书颁发争议。", result: createCase01Analysis(case01Input, "case-analysis") },
  { id: "CASE-02", title: "彩礼返还", field: "婚姻家庭 / 民事争议", summary: "登记、共同生活与彩礼返还比例的竞争性证据核查。", result: case02Result },
  { id: "CASE-03", title: "正当防卫", field: "刑事法律 / 正当防卫", summary: "追砍阶段侵害是否仍在进行，以及防卫判断的情境边界。", result: case03Result },
];

export const demoSamplesById: Record<DemoCaseId, DemoSample> = Object.fromEntries(demoSamples.map(sample => [sample.id, sample])) as Record<DemoCaseId, DemoSample>;
