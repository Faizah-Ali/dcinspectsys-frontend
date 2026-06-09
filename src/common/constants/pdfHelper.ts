import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import type { ApplicationResponse } from "../../pages/inspec-applications/services/applications.type";
import {
  formatDate,
  getApplicationStatus,
  getCaseStatus,
} from "../../components/table/inspec-applications/helper";

const buildCaseNumber = (row: ApplicationResponse) => {

  const caseNo = `${row.casetype}-${row.regNo}/${row.regYr}`;

  return row.caseTitle ? `${caseNo}\n${row.caseTitle}` : caseNo;
};

const buildCourtFeeDetails = (row: ApplicationResponse) => {

  const lines: string[] = [row.ecourtFeeId || "Not Entered"];

  if (row.courtFeeAmount) {
    lines.push(`(Value = ${row.courtFeeAmount})`);
  }

  if (row.ecourtMessage) {
    lines.push(`Status : ${row.ecourtMessage}`);
  }

  if (row.courtFeeReason) {
    lines.push(`Reason: ${row.courtFeeReason}`);
  }

  return lines.join("\n");
};

const buildApplicationPDF = (row: ApplicationResponse) => {

  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("E-Inspection Application Details", 14, 20);

  autoTable(doc, {
    startY: 35,
    head: [["Field", "Value"]],
    body: [
      ["PWD Cat.", "N/A"],
      ["Party-In-Person ID", row.username],
      ["Reference No.", `${row.diaryNo}/${row.diaryYr}`],
      ["Case No.", buildCaseNumber(row)],
      ["Case Status", getCaseStatus(row.caseStatus)],
      ["Remarks", row.remarks || "-"],
      ["Application Date", formatDate(row.appliedDate)],
      ["Application Status", getApplicationStatus(row.status)],
      ["Court Fee ID", buildCourtFeeDetails(row)],
    ],
    styles: {
      fontSize: 11,
      cellPadding: 4,
      valign: "middle",
    },
    headStyles: {
      fillColor: [15, 23, 41],
      textColor: 255,
      fontStyle: "bold",
    },
    columnStyles: {
      0: { fontStyle: "bold", cellWidth: 55 },
      1: { cellWidth: "auto" },
    },
  });

  return doc;
};

export const generateApplicationPDF = (
  row: ApplicationResponse
) => {

  const doc = buildApplicationPDF(row);

  doc.save(`Application_${row.username}.pdf`);
};

export const printApplication = (
  row: ApplicationResponse
) => {

  const doc = buildApplicationPDF(row);

  doc.autoPrint();

  const blobUrl = doc.output("bloburl") as unknown as string;

  const existing = document.getElementById(
    "application-print-frame"
  );

  if (existing) {
    existing.remove();
  }

  const iframe = document.createElement("iframe");

  iframe.id = "application-print-frame";
  iframe.style.position = "fixed";
  iframe.style.right = "0";
  iframe.style.bottom = "0";
  iframe.style.width = "0";
  iframe.style.height = "0";
  iframe.style.border = "0";
  iframe.src = blobUrl;

  document.body.appendChild(iframe);
};
