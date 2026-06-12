// Single source of truth for status codes used in both
// `status` (Application Status) and `caseStatus` (Case Status).
//
// API returns one-letter codes (e.g. "N", "P", "A", ...). We map every code to
// a human-friendly label and a brand color. The same map is used to derive the
// color from a label so callers can reuse `getStatusLabel` and `getStatusColor`
// without having to know the underlying mapping.

export type StatusCode =
  | "N"
  | "P"
  | "A"
  | "R"
  | "D"
  | "C"
  | "K"
  | "J"
  | "Y";

export interface StatusInfo {
  label: string;
  color: string;
}

export const STATUS_MAP: Record<StatusCode, StatusInfo> = {
  N: { label: "New Filing",           color: "#2196F3" },
  P: { label: "Pending For Approval", color: "#FF9800" },
  A: { label: "Approved By Approver", color: "#4CAF50" },
  R: { label: "Ready",                color: "#9C27B0" },
  D: { label: "Delivered",            color: "#009688" },
  C: { label: "Reject",               color: "#F44336" },
  K: { label: "Reject By Approver",   color: "#B71C1C" },
  J: { label: "Rejected",             color: "#D32F2F" },
  Y: { label: "Completed",            color: "#2E7D32" },
};

export const UNKNOWN_STATUS_LABEL = "Unknown";
export const UNKNOWN_STATUS_COLOR = "#9E9E9E";

// Resolve a raw status code (e.g. "N") to its display label.
// Falls back to "Unknown" for null / undefined / unmapped codes so the UI
// never crashes on unexpected values.
export const getStatusLabel = (statusCode?: string | null): string => {
  if (!statusCode) return UNKNOWN_STATUS_LABEL;

  const key = statusCode.trim().toUpperCase() as StatusCode;

  return STATUS_MAP[key]?.label ?? UNKNOWN_STATUS_LABEL;
};

// Resolve a display label (e.g. "New Filing") back to its brand color.
// Reused by chips so they can derive color from label without re-mapping codes.
export const getStatusColor = (statusLabel?: string | null): string => {
  if (!statusLabel) return UNKNOWN_STATUS_COLOR;

  const entry = Object.values(STATUS_MAP).find(
    (info) => info.label === statusLabel
  );

  return entry?.color ?? UNKNOWN_STATUS_COLOR;
};
