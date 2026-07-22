// Application Status (`status`) and Case Status (`caseStatus`) use different
// code spaces and must stay separate.
// Example conflict: application `D` = Delivered, case `D` = Decided.

export type ApplicationStatusCode =
  | "N"
  | "P"
  | "A"
  | "R"
  | "D"
  | "C"
  | "K"
  | "J"
  | "Y"
  | "T";

export type CaseStatusCode = "P" | "D";

export type StatusKind = "application" | "case";

export interface StatusInfo {
  label: string;
  color: string;
}

export const APPLICATION_STATUS_MAP: Record<ApplicationStatusCode, StatusInfo> =
  {
    N: { label: "New Filing", color: "#2196F3" },
    P: { label: "Pending For Approval", color: "#FF9800" },
    A: { label: "Approved By Approver", color: "#4CAF50" },
    R: { label: "Ready", color: "#9C27B0" },
    D: { label: "Delivered", color: "#2E7D32" },
    C: { label: "Reject", color: "#F44336" },
    K: { label: "Reject By Approver", color: "#B71C1C" },
    J: { label: "Rejected", color: "#D32F2F" },
    Y: { label: "Completed", color: "#2E7D32" },
    T: { label: "Pending Approval", color: "#FFC107" },
  };

// Legacy inbox: case_status === "D" → Decided; anything else → Pending.
export const CASE_STATUS_MAP: Record<CaseStatusCode, StatusInfo> = {
  P: { label: "Pending Approval", color: "#FF9800" },
  D: { label: "Decided", color: "#2E7D32" },
};

export const UNKNOWN_STATUS_LABEL = "Unknown";
export const UNKNOWN_STATUS_COLOR = "#9E9E9E";

export const getApplicationStatusLabel = (
  statusCode?: string | null
): string => {
  if (!statusCode?.trim()) return UNKNOWN_STATUS_LABEL;

  const key = statusCode.trim().toUpperCase() as ApplicationStatusCode;

  return APPLICATION_STATUS_MAP[key]?.label ?? UNKNOWN_STATUS_LABEL;
};

export const getCaseStatusLabel = (statusCode?: string | null): string => {
  if (!statusCode?.trim()) {
    return CASE_STATUS_MAP.P.label;
  }

  const key = statusCode.trim().toUpperCase();

  if (key === "D") {
    return CASE_STATUS_MAP.D.label;
  }

  return CASE_STATUS_MAP.P.label;
};

export const getApplicationStatusColor = (
  statusLabel?: string | null
): string => {
  if (!statusLabel) return UNKNOWN_STATUS_COLOR;

  const entry = Object.values(APPLICATION_STATUS_MAP).find(
    (info) => info.label === statusLabel
  );

  return entry?.color ?? UNKNOWN_STATUS_COLOR;
};

export const getCaseStatusColor = (statusLabel?: string | null): string => {
  if (!statusLabel) return UNKNOWN_STATUS_COLOR;

  const entry = Object.values(CASE_STATUS_MAP).find(
    (info) => info.label === statusLabel
  );

  return entry?.color ?? UNKNOWN_STATUS_COLOR;
};

export const getStatusLabel = (
  statusCode?: string | null,
  kind: StatusKind = "application"
): string =>
  kind === "case"
    ? getCaseStatusLabel(statusCode)
    : getApplicationStatusLabel(statusCode);

export const getStatusColor = (
  statusLabel?: string | null,
  kind: StatusKind = "application"
): string =>
  kind === "case"
    ? getCaseStatusColor(statusLabel)
    : getApplicationStatusColor(statusLabel);

export interface StatusFilterOption {
  value: string;
  label: string;
}

const toFilterOptions = (
  map: Record<string, StatusInfo>
): StatusFilterOption[] => [
  { value: "", label: "All" },
  ...Object.entries(map).map(([code, info]) => ({
    value: code,
    label: info.label,
  })),
];

export const APPLICATION_STATUS_FILTER_OPTIONS: StatusFilterOption[] =
  toFilterOptions(APPLICATION_STATUS_MAP);

export const CASE_STATUS_FILTER_OPTIONS: StatusFilterOption[] =
  toFilterOptions(CASE_STATUS_MAP);
