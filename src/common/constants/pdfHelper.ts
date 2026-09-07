import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import type { ApplicationResponse } from "../../pages/inspec-applications/services/applications.type";
import { formatDate } from "../../components/table/inspec-applications/helper";
import { IMAGES } from "./images";
import { getStatusLabel } from "./status";

/** Institutional navy — headings and structure. */
const NAVY: [number, number, number] = [15, 23, 41];
/** Subtle institutional accent (existing primary, used sparingly). */
const ACCENT: [number, number, number] = [209, 91, 6];
/** Light grey table header. */
const HEADER_BG: [number, number, number] = [242, 244, 247];
/** Thin neutral borders. */
const BORDER: [number, number, number] = [200, 205, 214];
/** Muted labels / footer. */
const TEXT_MUTED: [number, number, number] = [90, 98, 112];
/** Body text. */
const TEXT: [number, number, number] = [33, 40, 52];

const PAGE_MARGIN_X = 18;
const CONTENT_WIDTH = 174;

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

/**
 * Unified institutional masthead + title + reference metadata.
 * Returns Y position where the particulars table should begin.
 */
const drawDocumentHeader = (
  doc: jsPDF,
  logoDataUrl: string | null,
  emblemDataUrl: string | null,
  row: ApplicationResponse,
  generatedAt: string
): number => {
  const contentLeft = PAGE_MARGIN_X;
  const contentRight = 210 - PAGE_MARGIN_X;
  const pageCenter = 105;

  // --- Masthead band ---
  const mastheadTop = 12;
  const leftLogoW = 17;
  const leftLogoH = 17;
  const rightLogoW = 15;
  const rightLogoH = 17;
  const mastheadHeight = 18;
  const mastheadMidY = mastheadTop + mastheadHeight / 2;

  if (logoDataUrl) {
    try {
      doc.addImage(
        logoDataUrl,
        "PNG",
        contentLeft,
        mastheadTop + (mastheadHeight - leftLogoH) / 2,
        leftLogoW,
        leftLogoH
      );
    } catch {
      // Continue without logo if image format is unsupported.
    }
  }

  if (emblemDataUrl) {
    try {
      doc.addImage(
        emblemDataUrl,
        "PNG",
        contentRight - rightLogoW,
        mastheadTop + (mastheadHeight - rightLogoH) / 2,
        rightLogoW,
        rightLogoH
      );
    } catch {
      // Continue without emblem if image format is unsupported.
    }
  }

  doc.setTextColor(...NAVY);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(17);
  doc.text("DELHI HIGH COURT", pageCenter, mastheadMidY - 1.8, {
    align: "center",
  });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(...TEXT_MUTED);
  doc.text("Online Inspection System", pageCenter, mastheadMidY + 4.8, {
    align: "center",
  });

  // --- Single institutional accent rule under masthead ---
  let y = mastheadTop + mastheadHeight + 3.5;

  doc.setDrawColor(...ACCENT);
  doc.setLineWidth(0.4);
  doc.line(contentLeft, y, contentRight, y);

  // --- Document title ---
  y += 7;

  doc.setTextColor(...NAVY);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text("E-INSPECTION APPLICATION DETAILS", pageCenter, y, {
    align: "center",
  });

  y += 3.5;

  doc.setDrawColor(...BORDER);
  doc.setLineWidth(0.25);
  doc.line(contentLeft, y, contentRight, y);

  // --- Formal reference metadata ---
  y += 6.5;

  const labelX = contentLeft + 1;
  const valueX = contentLeft + 46;
  const rowGap = 5.6;
  const partyId = displayValue(row.username);

  const metaRows: Array<[string, string]> = [
    ["Reference No.", `${row.diaryNo}/${row.diaryYr}`],
    ["Party-In-Person ID", partyId],
    ["Generated On", generatedAt],
  ];

  metaRows.forEach(([label, value], index) => {
    const rowY = y + index * rowGap;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(...TEXT_MUTED);
    doc.text(label, labelX, rowY);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.setTextColor(...NAVY);
    doc.text(value, valueX, rowY);
  });

  y += metaRows.length * rowGap + 1.5;

  doc.setDrawColor(...BORDER);
  doc.setLineWidth(0.25);
  doc.line(contentLeft, y, contentRight, y);

  return y + 4;
};

const drawFooter = (doc: jsPDF) => {
  const pageCount = doc.getNumberOfPages();

  for (let page = 1; page <= pageCount; page += 1) {
    doc.setPage(page);

    doc.setDrawColor(...BORDER);
    doc.setLineWidth(0.25);
    doc.line(PAGE_MARGIN_X, 282, 210 - PAGE_MARGIN_X, 282);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(...TEXT_MUTED);
    doc.text(
      "Delhi High Court | Online Inspection System | For Official Use Only",
      105,
      287,
      { align: "center" }
    );
    doc.text(`Page ${page} of ${pageCount}`, 105, 291.5, {
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

  const tableStartY = drawDocumentHeader(
    doc,
    logoDataUrl,
    emblemDataUrl,
    row,
    generatedAt
  );

  autoTable(doc, {
    startY: tableStartY,
    margin: { left: PAGE_MARGIN_X, right: PAGE_MARGIN_X, bottom: 24 },
    head: [["Particulars", "Details"]],
    body: [
      ["PWD Category", "N/A"],
      ["Party-In-Person ID", displayValue(row.username)],
      ["Case Type", displayValue(row.casetype)],
      ["Registration No.", displayValue(row.regNo)],
      ["Registration Year", displayValue(row.regYr)],
      ["Diary Number", displayValue(row.diaryNo)],
      ["Diary Year", displayValue(row.diaryYr)],
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
      fontSize: 9.5,
      cellPadding: { top: 3.2, right: 3.5, bottom: 3.2, left: 3.5 },
      valign: "middle",
      halign: "left",
      textColor: TEXT,
      lineColor: BORDER,
      lineWidth: 0.2,
      overflow: "linebreak",
      fillColor: [255, 255, 255],
    },
    headStyles: {
      fillColor: HEADER_BG,
      textColor: NAVY,
      fontStyle: "bold",
      fontSize: 9.5,
      halign: "left",
      cellPadding: { top: 3.5, right: 3.5, bottom: 3.5, left: 3.5 },
    },
    bodyStyles: {
      fillColor: [255, 255, 255],
    },
    alternateRowStyles: {
      fillColor: [255, 255, 255],
    },
    columnStyles: {
      0: {
        fontStyle: "bold",
        cellWidth: 58,
        textColor: NAVY,
        fillColor: [255, 255, 255],
      },
      1: {
        cellWidth: "auto",
        textColor: TEXT,
      },
    },
    tableWidth: CONTENT_WIDTH,
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
