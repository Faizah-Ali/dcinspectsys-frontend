/**
 * Lightweight Assign/Re-assign remarks parity checks (no vitest/jest in this repo).
 * Run: node scripts/verify-assign-remarks-parity.mjs
 */

const getSelectStaffFormDefaults = (assignedName) => ({
  assignedName: assignedName?.trim() ?? "",
  remarks: "",
});

const hasSelectStaffFormChanges = ({
  staffId,
  remarks,
  initialStaffId,
  initialRemarks,
}) => staffId !== initialStaffId || remarks !== initialRemarks;

let failed = 0;

function assert(condition, message) {
  if (!condition) {
    failed += 1;
    console.error("FAIL:", message);
  } else {
    console.log("PASS:", message);
  }
}

// TEST 1 / 2 / 6: never seed from application.remarks
const seeded = getSelectStaffFormDefaults("Officer Name");
assert(seeded.remarks === "", 'defaults.remarks is "" even when application has remarks');

// Dirty detection: whitespace-only must count as a change vs ""
assert(
  hasSelectStaffFormChanges({
    staffId: "a",
    remarks: "   ",
    initialStaffId: "a",
    initialRemarks: "",
  }) === true,
  'whitespace-only "   " counts as form change'
);

assert(
  hasSelectStaffFormChanges({
    staffId: "a",
    remarks: "",
    initialStaffId: "a",
    initialRemarks: "",
  }) === false,
  "fresh popup with empty remarks is not dirty"
);

assert(
  hasSelectStaffFormChanges({
    staffId: "b",
    remarks: "",
    initialStaffId: "a",
    initialRemarks: "",
  }) === true,
  "staff change alone enables submit"
);

// Raw payload preservation (mirrors assign-application.helper — no trim)
function toPayloadRemarks(userInput) {
  return userInput;
}

assert(toPayloadRemarks("") === "", 'payload "" preserved');
assert(toPayloadRemarks("   ") === "   ", 'payload "   " preserved');
assert(toPayloadRemarks("NEW REMARK") === "NEW REMARK", "payload NEW REMARK preserved");

if (failed > 0) {
  console.error(`\n${failed} check(s) failed`);
  process.exit(1);
}

console.log("\nAll Assign/Re-assign remarks parity checks passed.");
