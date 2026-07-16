import type { InspectionApprover } from "./inspection-approvers.type";

export const normalizeInspectionApprovers = (
  data: unknown
): InspectionApprover[] => {
  if (!Array.isArray(data)) {
    return [];
  }

  return data
    .map((item) => {
      if (!item || typeof item !== "object") {
        return null;
      }

      const record = item as Record<string, unknown>;
      const id = record.id;
      const fullname = record.fullname;

      if (
        (typeof id !== "string" && typeof id !== "number") ||
        typeof fullname !== "string" ||
        !fullname.trim()
      ) {
        return null;
      }

      return {
        id: String(id),
        fullname: fullname.trim(),
        role: typeof record.role === "string" ? record.role : "",
      } satisfies InspectionApprover;
    })
    .filter((item): item is InspectionApprover => item !== null);
};
