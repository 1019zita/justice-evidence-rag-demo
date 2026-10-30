export type EvidenceDirection =
  | "supporting"
  | "weakening"
  | "alternative"
  | "neutral";

export type ApplicabilityLevel = "high" | "medium" | "low";
export type ProvenanceStatus = "verified" | "simulated" | "unavailable";

export type EvidenceItem = {
  id: string;
  issueIds: string[];
  direction: EvidenceDirection;
  title: string;
  sourceType: string;
  authorityLevel: string;
  authorityReason?: string;
  sourceEvidenceStatus: ProvenanceStatus;
  sourceEvidenceSource?: string;
  keySentence: string;
  relevanceReason: string;
  applicability: {
    level: ApplicabilityLevel;
    reason: string;
    status: ProvenanceStatus;
  };
  fullText?: string;
  source: {
    origin?: string;
    url?: string;
    documentId?: string;
    publicationDate?: string;
  };
  retrievalProvenance?: {
    status: ProvenanceStatus;
    query?: string;
    rank?: number;
    score?: number;
    chunkId?: string;
    retrievalChannel?: string;
    authorityAudit?: string;
    authorityAuditStatus?: ProvenanceStatus;
    applicabilityAudit?: string;
    applicabilityAuditStatus?: ProvenanceStatus;
  };
};
