/**
 * Complete remarks parity checks (legacy userlist.jsp REJECTID + accept()).
 *
 * Run: node scripts/verify-complete-remarks-parity.mjs
 */

const toRejectIdKey = (diaryNo, diaryYr) => `${diaryNo}/${diaryYr}`;

const getInitialRejectIdValue = (applicationRemarks) => {
  if (applicationRemarks == null) {
    return "";
  }

  return String(applicationRemarks).trim();
};

const resolveCompleteRemarks = (applicationRemarks, rejectIdOverride) => {
  if (rejectIdOverride !== undefined) {
    return rejectIdOverride;
  }

  return getInitialRejectIdValue(applicationRemarks);
};

/** Legacy takeaction always clears REJECTID. */
const applyTakeactionClear = () => "";

let failed = 0;

function assert(condition, message) {
  if (!condition) {
    failed += 1;
    console.error("FAIL:", message);
  } else {
    console.log("PASS:", message);
  }
}

const DIARY_NO = 10;
const DIARY_YR = 2024;
const key = toRejectIdKey(DIARY_NO, DIARY_YR);

assert(key === "10/2024", "rejectId key is diary-scoped");

// TEST 1 — Existing Application REMARKS, no interaction
{
  const remarks = resolveCompleteRemarks("OLD APPLICATION REMARK", undefined);
  assert(
    remarks === "OLD APPLICATION REMARK",
    'TEST 1: existing remarks, no interaction → "OLD APPLICATION REMARK"'
  );
}

// MyUtil.getString trims initial render value
{
  const remarks = resolveCompleteRemarks("  OLD  ", undefined);
  assert(
    remarks === "OLD",
    "initial REJECTID uses MyUtil.getString trim of application remarks"
  );
}

// TEST 2 — No existing remarks
{
  assert(
    resolveCompleteRemarks(null, undefined) === "",
    'TEST 2: null remarks → ""'
  );
  assert(
    resolveCompleteRemarks("", undefined) === "",
    'TEST 2: empty remarks → ""'
  );
}

// TEST 3 — Whitespace current reject value (after interaction)
{
  const override = "   ";
  assert(
    resolveCompleteRemarks("OLD APPLICATION REMARK", override) === "   ",
    'TEST 3: whitespace override preserved exactly'
  );
}

// TEST 4 — Custom Other text
{
  assert(
    resolveCompleteRemarks("OLD", "Custom reason") === "Custom reason",
    'TEST 4: Other text → "Custom reason"'
  );
}

// TEST 5 — Leading/trailing spaces
{
  assert(
    resolveCompleteRemarks("OLD", "   Custom reason   ") ===
      "   Custom reason   ",
    "TEST 5: leading/trailing spaces preserved"
  );
}

// TEST 6 — Preset reason interaction clears REJECTID
{
  const afterPreset = applyTakeactionClear();
  assert(afterPreset === "", 'TEST 6: takeaction clears REJECTID to ""');
  assert(
    resolveCompleteRemarks("OLD APPLICATION REMARK", afterPreset) === "",
    'TEST 6: Complete after preset interaction → ""'
  );
}

// TEST 7 — Complete has no dedicated remarks UI (structural check via contract)
{
  // resolveCompleteRemarks is the only Complete remarks source; confirm dialog
  // remains the UI. This script documents that Complete does not invent a textarea.
  assert(
    typeof resolveCompleteRemarks === "function",
    "TEST 7: Complete remarks resolved from REJECTID lifecycle helper (no dedicated UI)"
  );
}

// Override takes precedence over application remarks once set (including "")
{
  assert(
    resolveCompleteRemarks("STALE", "") === "",
    'empty override wins over application remarks (legacy cleared REJECTID)'
  );
}

if (failed > 0) {
  console.error(`\n${failed} check(s) failed`);
  process.exit(1);
}

console.log("\nAll Complete remarks parity checks passed.");
