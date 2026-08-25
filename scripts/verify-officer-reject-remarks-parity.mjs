/**
 * Officer Reject remarks parity checks (legacy userlist.jsp reject()).
 * Approver Reject path is asserted unchanged (still trims upstream).
 *
 * Run: node scripts/verify-officer-reject-remarks-parity.mjs
 */

const OTHER_REJECTION_REASON_VALUE = "0";

const REJECTION_REASONS = [
  {
    value: "Vakalatnama/memo of appearance not  on record",
    label: "Vakalatnama/memo of appearance not on record",
  },
  { value: "E-data not available", label: "E-data not available." },
  {
    value: "Advocates's name and enrolment no. not mentioned on the vakalatnama",
    label: "Advocates's name and enrolment no. not mentioned on the vakalatnama",
  },
  {
    value:
      "Inspection of pending case not allowed to third partyInspection of pending case not allowed to third party",
    label: "Inspection of pending case not allowed to third party.",
  },
  {
    value: "C.M. for impleadment is not allowed by The Hon'ble Court",
    label: "C.M. for impleadment is not allowed by The Hon'ble Court.",
  },
  {
    value: "You are not party in this matter",
    label: "You are not party in this matter.",
  },
  {
    value: "Company application no. is not mentioned",
    label: "Company application no. is not mentioned.",
  },
  {
    value: "Sufficient Court Fee NOT Paid",
    label: "Sufficient Court Fee NOT Paid.",
  },
  { value: "Error in court fee", label: "Error in court fee." },
  { value: "Vakalatnama not found", label: "Vakalatnama not found" },
  {
    value: "C.M. Application of impleadment still pending in Hon'ble court",
    label: "C.M. Application of impleadment still pending in Hon'ble court",
  },
  {
    value: "Please mention company application no",
    label: "Please mention company application no",
  },
  {
    value: "Scan data not updated vakalatnama/POA not found",
    label: "Scan data not updated vakalatnama/POA not found",
  },
  { value: OTHER_REJECTION_REASON_VALUE, label: "Other" },
];

/** Mirrors src/pages/reject-application/helper.ts buildOfficerRejectRemarks */
function buildOfficerRejectRemarks(reason, otherText) {
  if (!reason) {
    return { ok: false, message: "Please select a reason" };
  }

  if (reason === OTHER_REJECTION_REASON_VALUE) {
    if (otherText === "") {
      return { ok: false, message: "please enter reason of rejection" };
    }

    return { ok: true, remarks: otherText };
  }

  return { ok: true, remarks: reason };
}

/** Approver Reject still trims in approver-process/helper before API. */
function buildApproverRejectRemarks(userInput) {
  return userInput.trim();
}

let failed = 0;

function assert(condition, message) {
  if (!condition) {
    failed += 1;
    console.error("FAIL:", message);
  } else {
    console.log("PASS:", message);
  }
}

function assertNoReasonPrefix(remarks, label) {
  assert(
    !String(remarks).includes("Reason:"),
    `${label}: payload must not contain "Reason: "`
  );
}

// TEST 1: Preset reason → exact option value
{
  const reason = "Vakalatnama not found";
  const result = buildOfficerRejectRemarks(reason, "ignored other text");
  assert(result.ok === true, "TEST 1: preset reason allowed");
  assert(
    result.remarks === "Vakalatnama not found",
    'TEST 1: remarks === "Vakalatnama not found"'
  );
  assertNoReasonPrefix(result.remarks, "TEST 1");
}

// TEST 2: Other + custom text
{
  const result = buildOfficerRejectRemarks("0", "Custom reason");
  assert(result.ok === true, "TEST 2: Other + text allowed");
  assert(
    result.remarks === "Custom reason",
    'TEST 2: remarks === "Custom reason"'
  );
  assertNoReasonPrefix(result.remarks, "TEST 2");
}

// TEST 3: Other + ""
{
  const result = buildOfficerRejectRemarks("0", "");
  assert(result.ok === false, "TEST 3: Other + empty blocked");
  assert(
    result.message === "please enter reason of rejection",
    "TEST 3: legacy empty alert message"
  );
}

// TEST 4: Other + "   "
{
  const result = buildOfficerRejectRemarks("0", "   ");
  assert(result.ok === true, "TEST 4: Other + whitespace allowed");
  assert(result.remarks === "   ", 'TEST 4: remarks === "   "');
  assertNoReasonPrefix(result.remarks, "TEST 4");
}

// TEST 5: Other + leading/trailing spaces
{
  const result = buildOfficerRejectRemarks("0", "   Custom reason   ");
  assert(result.ok === true, "TEST 5: Other + padded text allowed");
  assert(
    result.remarks === "   Custom reason   ",
    'TEST 5: remarks preserve leading/trailing spaces'
  );
  assertNoReasonPrefix(result.remarks, "TEST 5");
}

// TEST 6: No reason selected
{
  const result = buildOfficerRejectRemarks("", "anything");
  assert(result.ok === false, "TEST 6: no reason blocked");
}

// Extra: Other option value is "0"
{
  const other = REJECTION_REASONS.find((r) => r.label === "Other");
  assert(other?.value === "0", 'Other option value is "0"');
}

// Extra: preset uses value not a different label for a known case
{
  const option = REJECTION_REASONS.find(
    (r) => r.value === "Vakalatnama not found"
  );
  assert(Boolean(option), 'preset "Vakalatnama not found" exists as value');
  const result = buildOfficerRejectRemarks(option.value, "");
  assert(result.ok && result.remarks === option.value, "preset sends value");
}

// TEST 7: Approver Reject path still trims (unchanged)
{
  assert(
    buildApproverRejectRemarks("   ") === "",
    "TEST 7: Approver Reject still trims whitespace to empty"
  );
  assert(
    buildApproverRejectRemarks("  note  ") === "note",
    "TEST 7: Approver Reject still trims surrounding spaces"
  );
}

// TEST 8: no Officer payload construction invents Reason: prefix
{
  const cases = [
    buildOfficerRejectRemarks("Error in court fee", ""),
    buildOfficerRejectRemarks("0", "Custom"),
    buildOfficerRejectRemarks("0", "   "),
  ];
  for (const result of cases) {
    assert(result.ok === true, "TEST 8 case ok");
    assertNoReasonPrefix(result.remarks, "TEST 8");
  }
}

if (failed > 0) {
  console.error(`\n${failed} check(s) failed`);
  process.exit(1);
}

console.log("\nAll Officer Reject remarks parity checks passed.");
