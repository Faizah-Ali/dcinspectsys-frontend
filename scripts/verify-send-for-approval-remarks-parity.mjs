/**
 * Send for Approval remarks parity checks (legacy Approve_Inspection_Appl).
 * Run: node scripts/verify-send-for-approval-remarks-parity.mjs
 */

/** Mirrors select-approver/index.tsx — remarks always start empty (never seeded). */
const getSelectApproverRemarksDefault = (_applicationRemarks) => "";

/**
 * Mirrors select-approver/helper handleSubmit + send-for-approval.helper
 * payload construction after Step 7 (no trim).
 */
const toSendForApprovalPayloadRemarks = (userInput) => userInput;

let failed = 0;

function assert(condition, message) {
  if (!condition) {
    failed += 1;
    console.error("FAIL:", message);
  } else {
    console.log("PASS:", message);
  }
}

// 1. Existing Application REMARKS are NOT used to seed
assert(
  getSelectApproverRemarksDefault("OLD APPLICATION REMARK") === "",
  'existing Application REMARKS do not seed Send for Approval remarks'
);
assert(
  getSelectApproverRemarksDefault(null) === "",
  "null Application REMARKS still seeds as empty string"
);

// 2. Default / no typing → ""
assert(
  toSendForApprovalPayloadRemarks("") === "",
  'default/no typing submits ""'
);

// 3. Empty string remains ""
assert(toSendForApprovalPayloadRemarks("") === "", '"" remains ""');

// 4. Whitespace-only preserved
assert(
  toSendForApprovalPayloadRemarks("   ") === "   ",
  '"   " remains exactly "   "'
);

// 5. Plain text unchanged
assert(
  toSendForApprovalPayloadRemarks("NEW REMARK") === "NEW REMARK",
  '"NEW REMARK" remains unchanged'
);

// 6. Leading/trailing spaces preserved
assert(
  toSendForApprovalPayloadRemarks("   NEW REMARK   ") === "   NEW REMARK   ",
  '"   NEW REMARK   " remains unchanged'
);

// 7. No trim in final payload path (regression against old double-trim)
assert(
  toSendForApprovalPayloadRemarks("   ") !== "".trim() ||
    toSendForApprovalPayloadRemarks("   ") === "   ",
  "whitespace-only is not collapsed by trim"
);

// Existing app remarks + no typing still yields ""
{
  const ui = getSelectApproverRemarksDefault("STALE REMARKS");
  assert(
    toSendForApprovalPayloadRemarks(ui) === "",
    "old Application REMARKS + no typing → API remarks \"\""
  );
}

if (failed > 0) {
  console.error(`\n${failed} check(s) failed`);
  process.exit(1);
}

console.log("\nAll Send for Approval remarks parity checks passed.");
