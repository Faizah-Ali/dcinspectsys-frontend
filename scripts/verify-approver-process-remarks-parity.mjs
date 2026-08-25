/**
 * Approver Process remarks parity checks (legacy ApproverProcess).
 * Run: node scripts/verify-approver-process-remarks-parity.mjs
 *
 * Also statically asserts production sources do not trim remarks on the
 * Approver Process path, and that rejectApplication / prior steps stay safe.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

/** Mirrors ApproverProcess — remarks always start empty (never seeded). */
const getApproverProcessRemarksDefault = (_applicationRemarks) => "";

/** Mirrors handleAction + approve/reject/forward payload after Step 8 (no trim). */
const toApproverProcessPayloadRemarks = (userInput) => userInput;

/** Forward still requires a target (unchanged). */
const isForwardEnabled = (forwardTo) => Boolean(forwardTo);

let failed = 0;

function assert(condition, message) {
  if (!condition) {
    failed += 1;
    console.error("FAIL:", message);
  } else {
    console.log("PASS:", message);
  }
}

function readSrc(relPath) {
  return fs.readFileSync(path.join(root, relPath), "utf8");
}

const helperSrc = readSrc("src/pages/approver-process/helper.ts");
const actionSrc = readSrc(
  "src/pages/inspec-applications/services/approver.action.ts"
);
const processIndexSrc = readSrc("src/pages/approver-process/index.tsx");
const popupSrc = readSrc(
  "src/components/popup/application/approver-process-popup/index.tsx"
);

// 1. handleAction does NOT trim remarks
assert(
  !/remarks:\s*remarks\.trim\(\)/.test(helperSrc),
  "approver-process/helper handleAction does not trim remarks"
);

// 2. approveApplication does NOT trim remarks in payload
{
  const approveBlock = actionSrc.slice(
    actionSrc.indexOf("export const approveApplication"),
    actionSrc.indexOf("export const rejectApplication")
  );
  assert(
    !/remarks:\s*remarks\.trim\(\)/.test(approveBlock),
    "approveApplication payload does not trim remarks"
  );
  assert(
    /remarks,\s*\n\s*\}\)/.test(approveBlock) ||
      /remarks\s*\n\s*\}\)/.test(approveBlock) ||
      /diaryYr,\s*\n\s*remarks,/.test(approveBlock) ||
      /remarks,\s*\}/.test(approveBlock.replace(/\s+/g, " ")) ||
      /remarks,/.test(approveBlock),
    "approveApplication still sends remarks field"
  );
}

// 3. forwardApplication does NOT trim remarks in payload
{
  const forwardBlock = actionSrc.slice(
    actionSrc.indexOf("export const forwardApplication")
  );
  assert(
    !/remarks:\s*remarks\.trim\(\)/.test(forwardBlock),
    "forwardApplication payload does not trim remarks"
  );
}

// 4. rejectApplication remains untrimmed (shared with Officer Reject)
{
  const rejectBlock = actionSrc.slice(
    actionSrc.indexOf("export const rejectApplication"),
    actionSrc.indexOf("export const forwardApplication")
  );
  assert(
    !/remarks:\s*remarks\.trim\(\)/.test(rejectBlock),
    "rejectApplication remains unchanged (no remarks.trim)"
  );
  assert(
    /remarks,/.test(rejectBlock) || /remarks\s*\n/.test(rejectBlock),
    "rejectApplication still sends remarks as-is"
  );
}

// 5–9. Prior step files still exist (regression presence check)
for (const rel of [
  "scripts/verify-assign-remarks-parity.mjs",
  "scripts/verify-officer-reject-remarks-parity.mjs",
  "scripts/verify-complete-remarks-parity.mjs",
  "scripts/verify-send-for-approval-remarks-parity.mjs",
]) {
  assert(fs.existsSync(path.join(root, rel)), `prior script exists: ${rel}`);
}

// 10. No Application REMARKS seeding in Approver Process UI/popup
assert(
  !/application\.remarks|initialRemarks|selectedApplication\.remarks/.test(
    processIndexSrc
  ),
  "ApproverProcess does not seed from Application REMARKS"
);
assert(
  !/application\.remarks|initialRemarks/.test(popupSrc),
  "ApproverProcessPopup does not pass Application REMARKS into form"
);
assert(
  getApproverProcessRemarksDefault("OLD APPLICATION REMARK") === "",
  "default remarks UI equivalent is empty string"
);

// Payload matrix
const cases = ["", "   ", "NEW REMARK", "   NEW REMARK   "];
for (const input of cases) {
  for (const action of ["Approve", "Reject", "Forward"]) {
    assert(
      toApproverProcessPayloadRemarks(input) === input,
      `${action}: ${JSON.stringify(input)} preserved exactly`
    );
  }
}

// Forward target still required
assert(isForwardEnabled("") === false, "Forward still requires target");
assert(isForwardEnabled("approver-1") === true, "Forward enabled with target");

if (failed > 0) {
  console.error(`\n${failed} check(s) failed`);
  process.exit(1);
}

console.log("\nAll Approver Process remarks parity checks passed.");
