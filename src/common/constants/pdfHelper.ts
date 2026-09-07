import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import type { ApplicationResponse } from "../../pages/inspec-applications/services/applications.type";
import { formatDate } from "../../components/table/inspec-applications/helper";
import { IMAGES } from "./images";
import { getStatusLabel } from "./status";

const NAVY: [number, number, number] = [15, 23, 41];
const ACCENT: [number, number, number] = [209, 91, 6];
/** Soft orange tint — info band + alternate Details rows (matches primary). */
const ORANGE_SOFT: [number, number, number] = [253, 242, 232];
/** Soft navy tint — Particulars column base rows. */
const LABEL_BG: [number, number, number] = [232, 238, 248];
/** Deeper navy tint — Particulars column alternate rows. */
const LABEL_BG_ALT: [number, number, number] = [200, 212, 232];
const ROW_ALT: [number, number, number] = ORANGE_SOFT;
const BORDER: [number, number, number] = [210, 175, 145];
const TEXT_MUTED: [number, number, number] = [75, 85, 110];

const PAGE_MARGIN_X = 16;
const CONTENT_WIDTH = 178;

const displayValue = (value: string | number | null | undefined): string => {
  if (value === null || value === undefined) {
    return "—";
  }

  const text = String(value).trim();

  return text || "—";
};

const formatGeneratedAt = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  const displayHours = hours % 12 || 12;

  return `${day}/${month}/${year} ${displayHours}:${minutes} ${ampm}`;
};

const loadImageAsDataUrl = async (url: string): Promise<string | null> => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      return null;
    }

    const blob = await response.blob();

    return await new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(typeof reader.result === "string" ? reader.result : null);
      };
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(blob);
    });
  } catch {
    return null;
  }
};

const drawHeaderBand = (doc: jsPDF) => {
  doc.setFillColor(...NAVY);
  doc.rect(0, 0, 210, 8, "F");

  doc.setFillColor(...ACCENT);
  doc.rect(0, 8, 210, 1.2, "F");
};

const drawLetterhead = (
  doc: jsPDF,
  logoDataUrl: string | null,
  emblemDataUrl: string | null
) => {
  const logoY = 12;
  const logoSize = 18;
  const logoCenterY = logoY + logoSize / 2;

  if (logoDataUrl) {
    try {
      doc.addImage(logoDataUrl, "PNG", PAGE_MARGIN_X, logoY, logoSize, logoSize);
    } catch {
      // Continue without logo if image format is unsupported.
    }
  }

  if (emblemDataUrl) {
    try {
      doc.addImage(
        emblemDataUrl,
        "PNG",
        210 - PAGE_MARGIN_X - logoSize,
        logoY,
        logoSize,
        logoSize
      );
    } catch {
      // Continue without emblem if image format is unsupported.
    }
  }

  // Keep title block vertically centered with the logos.
  doc.setTextColor(...NAVY);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(17);
  doc.text("DELHI HIGH COURT", 105, logoCenterY - 2, { align: "center" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(...NAVY);
  doc.text("Online Inspection System", 105, logoCenterY + 5.5, {
    align: "center",
  });

  const dividerY = logoY + logoSize + 4;

  doc.setDrawColor(...ACCENT);
  doc.setLineWidth(0.6);
  doc.line(PAGE_MARGIN_X, dividerY, 210 - PAGE_MARGIN_X, dividerY);

  doc.setDrawColor(...BORDER);
  doc.setLineWidth(0.2);
  doc.line(PAGE_MARGIN_X, dividerY + 1.2, 210 - PAGE_MARGIN_X, dividerY + 1.2);
};

const drawDocumentTitle = (
  doc: jsPDF,
  row: ApplicationResponse,
  generatedAt: string
) => {
  doc.setTextColor(...NAVY);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text("E-INSPECTION APPLICATION DETAILS", 105, 46, { align: "center" });

  doc.setFillColor(...ORANGE_SOFT);
  doc.roundedRect(PAGE_MARGIN_X, 51, CONTENT_WIDTH, 16, 1.5, 1.5, "F");

  doc.setDrawColor(...ACCENT);
  doc.setLineWidth(0.15);
  doc.roundedRect(PAGE_MARGIN_X, 51, CONTENT_WIDTH, 16, 1.5, 1.5, "S");

  const partyId = displayValue(row.username);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(...NAVY);
  doc.text(
    `Reference No.: ${row.diaryNo}/${row.diaryYr}`,
    PAGE_MARGIN_X + 4,
    58
  );
  doc.text(`Party-In-Person ID: ${partyId}`, 210 - PAGE_MARGIN_X - 4, 58, {
    align: "right",
  });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(...TEXT_MUTED);
  doc.text(`Generated on: ${generatedAt}`, 105, 64, { align: "center" });
};

const drawFooter = (doc: jsPDF) => {
  const pageCount = doc.getNumberOfPages();

  for (let page = 1; page <= pageCount; page += 1) {
    doc.setPage(page);

    doc.setDrawColor(...BORDER);
    doc.setLineWidth(0.3);
    doc.line(PAGE_MARGIN_X, 282, 210 - PAGE_MARGIN_X, 282);

    doc.setFillColor(...ACCENT);
    doc.rect(0, 294, 210, 3, "F");

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(...NAVY);
    doc.text(
      "Delhi High Court — Online Inspection System — For Official Use Only",
      105,
      287,
      { align: "center" }
    );
    doc.text(`Page ${page} of ${pageCount}`, 105, 291, {
      align: "center",
    });
  }
};

const buildApplicationPDF = async (row: ApplicationResponse) => {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const generatedAt = formatGeneratedAt(new Date());
  const [logoDataUrl, emblemDataUrl] = await Promise.all([
    loadImageAsDataUrl(IMAGES.DhcLogo),
    loadImageAsDataUrl(IMAGES.Emblem),
  ]);

  drawHeaderBand(doc);
  drawLetterhead(doc, logoDataUrl, emblemDataUrl);
  drawDocumentTitle(doc, row, generatedAt);

  autoTable(doc, {
    startY: 70,
    margin: { left: PAGE_MARGIN_X, right: PAGE_MARGIN_X },
    head: [["Particulars", "Details"]],
    body: [
      ["PWD Category", "N/A"],
      ["Party-In-Person ID", displayValue(row.username)],
      ["Case Type", displayValue(row.casetype)],
      ["Registration No.", displayValue(row.regNo)],
      ["Registration Year", displayValue(row.regYr)],
      ["Reference No.", `${row.diaryNo}/${row.diaryYr}`],
      ["Case No.", `${row.casetype}-${row.regNo}/${row.regYr}`],
      ["Case Title", displayValue(row.caseTitle)],
      ["Case Status", getStatusLabel(row.caseStatus, "case")],
      ["Remarks", displayValue(row.remarks)],
      ["Application Date", formatDate(row.appliedDate)],
      ["Application Status", getStatusLabel(row.status, "application")],
      [
        "Court Fee ID",
        displayValue(row.ecourtFeeId) === "—"
          ? "Not Entered"
          : displayValue(row.ecourtFeeId),
      ],
    ],
    styles: {
      font: "helvetica",
      fontSize: 10,
      cellPadding: { top: 3.5, right: 4, bottom: 3.5, left: 4 },
      valign: "middle",
      halign: "center",
      textColor: NAVY,
      lineColor: BORDER,
      lineWidth: 0.2,
      overflow: "linebreak",
    },
    headStyles: {
      fillColor: NAVY,
      textColor: 255,
      fontStyle: "bold",
      fontSize: 10,
      halign: "center",
      cellPadding: { top: 4, right: 4, bottom: 4, left: 4 },
    },
    alternateRowStyles: {
      fillColor: ROW_ALT,
    },
    columnStyles: {
      0: {
        fontStyle: "bold",
        cellWidth: 58,
        fillColor: LABEL_BG,
        textColor: NAVY,
      },
      1: {
        cellWidth: "auto",
      },
    },
    didParseCell: (data) => {
      if (data.section === "body" && data.column.index === 0) {
        data.cell.styles.fillColor =
          data.row.index % 2 === 0 ? LABEL_BG : LABEL_BG_ALT;
      }
    },
  });

  drawFooter(doc);

  return doc;
};

export const generateApplicationPDF = async (row: ApplicationResponse) => {
  const doc = await buildApplicationPDF(row);

  doc.save(`E-Inspection-Application-${row.username}.pdf`);
};

export const printApplication = async (row: ApplicationResponse) => {
  const doc = await buildApplicationPDF(row);

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
