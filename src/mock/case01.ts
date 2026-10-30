import type { AnalysisInput, AnalysisMode, AnalysisResult } from "../types/analysis";
import type { EvidenceItem } from "../types/evidence";

export const case01Facts =
  "学生甲在补考过程中夹带纸条，某高校依据本校 068 号通知作出退学处理。学校作出处理后，未向学生甲送达书面处理决定，也未安排其陈述或申辩，学生甲的学籍随后未被注销；学生甲继续在校完成学业，毕业时学校拒发毕业证、学位证，学生甲提起行政诉讼。";

export const case01Input: AnalysisInput = {
  facts: case01Facts,
  question: "退学处理的程序合法性，以及后续拒发毕业证、学位证的行政法评价。",
  viewpoint: "学校退学处理存在程序合法性问题，后续拒发证书也应受到司法审查。",
};

const evidence = {
  authorityReason: "来源标题、来源类型、来源原文与 key sentence 对照自 HG2-0005 冻结 artifact。",
  sourceEvidenceStatus: "verified" as const,
  sourceEvidenceSource: "experiments/human_gate_v2/HG2-0005/CONDITION_ARTIFACTS.json + experiments/human_gate_v2/HG2-0005/EVIDENCE_KEY_SENTENCE_AUDIT.csv",
} as const;

function simulatedRetrieval(query: string, rank: number, score: number, chunkId: string): EvidenceItem["retrievalProvenance"] {
  return {
    status: "simulated",
    query,
    rank,
    score,
    chunkId,
    retrievalChannel: "Phase 1 deterministic mock provider",
    authorityAuditStatus: "unavailable",
    applicabilityAuditStatus: "unavailable",
  };
}
const tanFanFrozenExcerpt = "谭帆诉西南大学不服退学处理决定案参考性案例2号　关键词　行政 退学处理 程序违法　裁判要点　1、高等学校作出的退学处理决定属于学校行使法律赋予的教育行政管理职权，学生不服学校作出的处理决定提起诉讼，属于行政诉讼受案范围；　2、学校作出退学处理决定，应当遵循《普通高等学校学生管理规定》的程序要求，否则应当认定为违法。";

const case38FrozenExcerpt = "指导案例38号：学生甲诉某高校拒绝颁发毕业证、学位证案\n来源：最高人民法院\n关键词 行政诉讼 颁发证书 高等学校 受案范围 正当程序\n裁判要点\n1.高等学校对受教育者因违反校规、校纪而拒绝颁发学历证书、学位证书，受教育者不服的，可以依法提起行政诉讼。\n2.高等学校依据违背国家法律、行政法规或规章的校规、校纪，对受教育者作出退学处理等决定的，人民法院不予支持。\n3.高等学校对因违反校规、校纪的受教育者作出影响其基本权利的决定时，应当允许其申辩并在决定作出后及时送达，否则视为违反法定程序。";
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

const simulatedCoverageProvenance: AnalysisResult["retrievalCoverage"]["provenance"] = {
  sourceCounts: { status: "simulated", source: "Phase 1 deterministic mock provider", note: "不是正式检索覆盖统计。" },
  candidateCount: { status: "simulated", source: "Phase 1 deterministic mock provider", note: "不是正式检索候选数。" },
  authorityPassedCount: { status: "simulated", source: "Phase 1 deterministic mock provider", note: "不是冻结 authority audit 统计。" },
  applicabilityPassedCount: { status: "simulated", source: "Phase 1 deterministic mock provider", note: "不是冻结 applicability audit 统计。" },
  citedCount: { status: "simulated", source: "Phase 1 deterministic mock provider", note: "不是正式引用计数。" },
  timeRange: { status: "simulated", source: "Phase 1 deterministic mock provider", note: "不是正式检索时间范围。" },
  coveredSources: { status: "simulated", source: "Phase 1 deterministic mock provider", note: "不是正式来源覆盖清单。" },
  knownGaps: { status: "simulated", source: "Phase 1 deterministic mock provider", note: "不是正式检索缺口审计。" },
};

const supportingEvidence: EvidenceItem[] = [
  {
    id: "case01-e01",
    issueIds: ["issue-01"],
    direction: "supporting",
    ...evidence,
    title: "谭帆诉西南大学不服退学处理决定案",
    sourceType: "参阅案例",
    authorityLevel: "高权威",
    authorityReason: evidence.authorityReason,
    keySentence: "高等学校作出的退学处理决定属于行使法律赋予的教育行政管理职权，学生不服提起诉讼属于行政诉讼受案范围。",
    relevanceReason: "直接回答高校退学处理是否属于可诉的教育行政管理行为，支撑争点 01 的受案范围判断。",
    applicability: { level: "high", reason: "案件同样涉及高校退学处理和学生对管理决定提起行政诉讼。", status: "simulated" },
    fullText: tanFanFrozenExcerpt,
    source: { origin: "重庆市北碚区人民法院", documentId: "DOC-SRC-AUTH-CASE01-06-0001-C0001" },
    retrievalProvenance: simulatedRetrieval("高校退学处理 教育行政管理职权 行政诉讼受案范围", 1, 0.94, "C0001"),
  },
  {
    id: "case01-e02",
    issueIds: ["issue-02"],
    direction: "supporting",
    ...evidence,
    title: "最高人民法院指导案例 38 号：田永诉北京科技大学拒绝颁发毕业证、学位证案",
    sourceType: "指导性案例",
    authorityLevel: "高权威",
    authorityReason: evidence.authorityReason,
    keySentence: "高校享有依据法律规定制定校规校纪并进行日常教学与学籍管理的自主办学权力。",
    relevanceReason: "说明高校确有学籍管理和校规制定权限，但该权限必须放在上位规范和司法审查框架内理解。",
    applicability: { level: "high", reason: "事实同样涉及高校校规、退学处理和证书颁发。", status: "simulated" },
    fullText: case38FrozenExcerpt,
    source: { origin: "最高人民法院", documentId: "DOC-SRC-AUTH-CASE01-06-0001-C0002" },
    retrievalProvenance: simulatedRetrieval("高校校规 自主办学权 司法审查 退学处分", 2, 0.91, "C0002"),
  },
  {
    id: "case01-e03",
    issueIds: ["issue-03"],
    direction: "supporting",
    ...evidence,
    title: "最高人民法院指导案例 38 号：田永诉北京科技大学拒绝颁发毕业证、学位证案",
    sourceType: "指导性案例",
    authorityLevel: "高权威",
    authorityReason: evidence.authorityReason,
    keySentence: "影响学生受教育基本权利的纪律惩戒决定须遵循法定程序，体现对不同管理事项的区分规制。",
    relevanceReason: "将退学处分与一般学术评价区分开，突出送达、陈述申辩等程序保障的独立重要性。",
    applicability: { level: "high", reason: "本案涉及直接影响学籍和毕业证书取得的纪律惩戒决定。", status: "simulated" },
    fullText: case38FrozenExcerpt,
    source: { origin: "最高人民法院", documentId: "DOC-SRC-AUTH-CASE01-06-0001-C0002" },
    retrievalProvenance: simulatedRetrieval("高校退学处分 陈述申辩 及时送达 正当程序", 1, 0.96, "C0003"),
  },
];

const weakeningEvidence: EvidenceItem[] = [
  {
    id: "case01-e04",
    issueIds: ["issue-02", "issue-03"],
    direction: "weakening",
    ...evidence,
    title: "最高人民法院指导案例 38 号：田永诉北京科技大学拒绝颁发毕业证、学位证案",
    sourceType: "指导性案例",
    authorityLevel: "高权威",
    authorityReason: evidence.authorityReason,
    keySentence: "高校依据违背国家法律法规的校纪校规对受教育者作出退学处理的，人民法院不予支持且可依法审查。",
    relevanceReason: "提示程序瑕疵之外仍需独立审查 068 号通知的规范层级、具体内容以及与上位规范的关系。",
    applicability: { level: "medium", reason: "案件事实方向一致，但 068 号通知全文和案发时规范版本尚待核实。", status: "simulated" },
    fullText: case38FrozenExcerpt,
    source: { origin: "最高人民法院", documentId: "DOC-SRC-AUTH-CASE01-06-0001-C0002" },
    retrievalProvenance: simulatedRetrieval("068号通知 上位法 校规 退学处理 合法性", 3, 0.88, "C0004"),
  },
  {
    id: "case01-e05",
    issueIds: ["issue-01", "issue-02"],
    direction: "weakening",
    ...evidence,
    title: "谭帆诉西南大学不服退学处理决定案",
    sourceType: "参阅案例",
    authorityLevel: "中高权威",
    authorityReason: evidence.authorityReason,
    keySentence: "生效裁判认定退学处理涉及教育行政管理职权，不能作为纯粹校内自治事项排除行政诉讼。",
    relevanceReason: "削弱将本案完全归入学校内部自治、排除外部司法审查的解释，但不当然决定所有程序后果。",
    applicability: { level: "medium", reason: "可比较退学处理的性质，但个案程序后果仍受事实时间线影响。", status: "simulated" },
    fullText: tanFanFrozenExcerpt,
    source: { origin: "重庆市北碚区人民法院", documentId: "DOC-SRC-AUTH-CASE01-06-0001-C0001" },
    retrievalProvenance: simulatedRetrieval("退学处理 校内自治 行政诉讼 可诉性", 4, 0.84, "C0005"),
  },
];

export function createCase01Analysis(input: AnalysisInput, mode: AnalysisMode): AnalysisResult {
  const summary = mode === "viewpoint-check"
    ? "当前材料较强地支持“学校退学处理存在程序合法性问题”的判断；但对于处分实体依据本身是否无效，仍需进一步核对 068 号通知的具体内容及其规范层级。"
    : "当前材料较强地支持对学校退学处理程序进行严格合法性审查；但处分实体依据、通知送达事实和学籍时间线仍需要补充材料。";

  return {
    analysisId: `case01-${mode}-demo`,
    mode,
    createdAt: "2026-10-28T09:30:00.000Z",
    input,
    canonicalArtifact,
    caseSummary: case01Facts,
    issues: [
      { id: "issue-01", title: "高校是否具有作出相关学籍管理行为的行政主体资格", description: "退学处理和证书颁发是否属于教育行政管理职权。" },
      { id: "issue-02", title: "校规依据与上位法之间是否存在冲突", description: "068 号通知的规范层级、具体内容和司法审查边界。" },
      { id: "issue-03", title: "退学处理程序是否符合法定要求", description: "是否送达、是否听取陈述申辩，以及程序瑕疵的法律后果。" },
      { id: "issue-04", title: "学籍持续存在及后续拒发证书如何影响法律关系", description: "处理决定、学籍状态和证书颁发之间的时间线与关联。" },
    ],
    overallAssessment: {
      summary,
      strength: "moderate",
      uncertaintySummary: "仍有 2 项关键事实会影响结论。",
    },
    supportingEvidence,
    weakeningEvidence,
    alternativeExplanations: [
      { id: "alt-01", issueIds: ["issue-02", "issue-03"], text: "即使退学处理程序存在明显瑕疵，也不能直接推出学生此前违反考试纪律的事实不存在。程序合法性、处分依据以及后续证书处理应分别审查。" },
      { id: "alt-02", issueIds: ["issue-03", "issue-04"], text: "校内信箱通知与直接送达决定在送达程序认定上存在事实表述差异，需结合通知原文、送达记录和学校实际操作核对。" },
      { id: "alt-03", issueIds: ["issue-02"], text: "高校享有一定办学自主权，但纪律惩戒与纯学术评价的审查边界不同，不能仅凭“校内自治”四字排除司法审查。" },
    ],
    unresolvedFacts: [
      { id: "fact-01", fact: "学校 068 号通知全文尚未提供", whyItMatters: "无法完整判断处分依据、规范层级及其与上位规范的关系。", severity: "high" },
      { id: "fact-02", fact: "退学决定形成、审批、送达和学籍状态变化的完整时间线尚未确认", whyItMatters: "可能影响程序合法性评价，以及后续拒发证书与退学处理之间的法律关联。", severity: "high" },
      { id: "fact-03", fact: "学校是否主张通过校内信箱或其他方式完成通知尚待核实", whyItMatters: "不同送达事实可能改变对程序瑕疵性质和后果的判断。", severity: "medium" },
    ],
    retrievalCoverage: {
      sourceCounts: { "法律法规": 8, "司法解释": 4, "指导性案例": 3, "裁判文书": 17, "其他权威资料": 6 },
      candidateCount: 38,
      authorityPassedCount: 29,
      applicabilityPassedCount: 17,
      citedCount: 8,
      timeRange: "2020–2026",
      coveredSources: ["最高人民法院指导性案例", "高校退学处理参考性案例", "教育行政管理相关裁判文书", "校规与上位规范冲突材料"],
      knownGaps: ["部分地方规范性文件", "历史版本校规", "学校 068 号通知及内部送达记录"],
      provenance: simulatedCoverageProvenance,
    },
    followUpSuggestions: ["如果学校当时已经书面通知，会改变结论吗？", "重点核查处分程序", "只查看最高人民法院来源"],
  };
}
