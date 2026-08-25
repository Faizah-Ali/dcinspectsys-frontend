/**
 * Legacy Complete remarks helpers (userlist.jsp REJECTID + accept()).
 *
 * Old REJECTID:
 * - Initial value: MyUtil.getString(obj.getRemarks()) — null → "", else trim once at render
 * - takeaction() on any reason change: REJECTID.value = ""
 * - accept()/Complete: hidden remarks = REJECTID.value (no trim)
 */

export const toRejectIdKey = (diaryNo: number, diaryYr: number): string =>
  `${diaryNo}/${diaryYr}`;

/** Mirrors MyUtil.getString used when rendering REJECTID initial value. */
export const getInitialRejectIdValue = (
  applicationRemarks: string | null | undefined
): string => {
  if (applicationRemarks == null) {
    return "";
  }

  return String(applicationRemarks).trim();
};

/**
 * Resolve Complete API remarks.
 * - If this diary has a REJECTID override (user interacted with reject reason UI),
 *   use that raw value (may be "" or whitespace).
 * - Otherwise use the initial REJECTID equivalent from Application REMARKS.
 */
export const resolveCompleteRemarks = (
  applicationRemarks: string | null | undefined,
  rejectIdOverride: string | undefined
): string => {
  if (rejectIdOverride !== undefined) {
    return rejectIdOverride;
  }

  return getInitialRejectIdValue(applicationRemarks);
};
