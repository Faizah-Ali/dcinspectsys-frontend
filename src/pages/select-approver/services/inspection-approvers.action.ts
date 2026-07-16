import { ENDPOINTS } from "../../../common/constants/endpoint";
import { authFetch } from "../../../utils/api";

import { normalizeInspectionApprovers } from "./inspection-approvers.helper";
import type { InspectionApprover } from "./inspection-approvers.type";

export const getInspectionApprovers = async (
  signal?: AbortSignal
): Promise<InspectionApprover[]> => {
  const response = await authFetch(ENDPOINTS.INSPECTION_APPROVERS, { signal });

  if (!response.ok) {
    throw new Error("Failed to fetch inspection approvers");
  }

  const data = await response.json().catch(() => []);

  return normalizeInspectionApprovers(data);
};
