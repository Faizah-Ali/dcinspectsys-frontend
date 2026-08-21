import { ENDPOINTS } from "../../../common/constants/endpoint";
import { authFetch } from "../../../utils/api";

import type { InspectionCommentItem } from "./inspection-comments.type";

const isInspectionCommentItem = (
  item: unknown
): item is InspectionCommentItem => {
  if (!item || typeof item !== "object") {
    return false;
  }

  const raw = item as Record<string, unknown>;

  return (
    typeof raw.content === "string" &&
    typeof raw.author === "string" &&
    typeof raw.commentDate === "string"
  );
};

export const getInspectionComments = async (
  diaryNo: number,
  diaryYr: number,
  signal?: AbortSignal
): Promise<InspectionCommentItem[]> => {
  const query = new URLSearchParams({
    diaryNo: String(diaryNo),
    diaryYr: String(diaryYr),
  });

  const response = await authFetch(
    `${ENDPOINTS.INSPECTION_COMMENTS}?${query.toString()}`,
    { signal }
  );

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const message =
      data && typeof data === "object" && "message" in data
        ? String((data as { message: unknown }).message ?? "").trim()
        : "";

    throw new Error(message || "Failed to fetch dealing remarks");
  }

  if (!Array.isArray(data)) {
    return [];
  }

  return data.filter(isInspectionCommentItem);
};
