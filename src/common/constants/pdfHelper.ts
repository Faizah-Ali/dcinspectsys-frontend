import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import type { ApplicationResponse } from "../../pages/inspec-applications/services/applications.type";
import { formatDate } from "../../components/table/inspec-applications/helper";
import { getStatusLabel } from "./status";

const displayValue = (value: string | number | null | undefined): string => {
  if (value === null || value === undefined) {
    return "-";
  }

  const text = String(value).trim();

  return text || "-";
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
      ["Party-In-Person ID", displayValue(row.username)],
      ["Case Type", displayValue(row.casetype)],
      ["Registration No.", displayValue(row.regNo)],
      ["Registration Year", displayValue(row.regYr)],
      ["Reference No.", `${row.diaryNo}/${row.diaryYr}`],
      ["Case No.", `${row.casetype}-${row.regNo}/${row.regYr}`],
      ["Case Title", displayValue(row.caseTitle)],
      ["Case Status", getStatusLabel(row.caseStatus)],
      ["Remarks", displayValue(row.remarks)],
      ["Application Date", formatDate(row.appliedDate)],
      ["Application Status", getStatusLabel(row.status)],
      ["Court Fee ID", displayValue(row.ecourtFeeId) === "-" ? "Not Entered" : displayValue(row.ecourtFeeId)],
      // ["Court Fee Amount", displayValue(row.courtFeeAmount)],
      // ["eCourt Message", displayValue(row.ecourtMessage)],
      // ["Court Fee Reason", displayValue(row.courtFeeReason)],
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

export const generateApplicationPDF = (row: ApplicationResponse) => {
  const doc = buildApplicationPDF(row);

  doc.save(`Application_${row.username}.pdf`);
};

export const printApplication = (row: ApplicationResponse) => {
  const doc = buildApplicationPDF(row);

  doc.autoPrint();

  const blobUrl = doc.output("bloburl") as unknown as string;

  const existing = document.getElementById("application-print-frame");

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
