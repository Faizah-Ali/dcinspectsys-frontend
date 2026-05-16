import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import type { ApplicationResponse } from "../../../pages/inspec-applications/services/applications.type";

export const generateApplicationPDF = (
  row: ApplicationResponse
) => {

  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("E-Inspection Application Details", 14, 20);

  autoTable(doc, {
    startY: 35,
    body: [
      ["Party-In-Person ID", row.username],
      ["Case Type", row.casetype],
      ["Case Number", `${row.regNo}/${row.regYr}`],
      ["Diary Number", `${row.diaryNo}/${row.diaryYr}`],
      ["Court Fee ID", row.ecourtFeeId],
      ["Application Date", row.appliedDate],
      ["Status", row.status],
      ["Remarks", row.remarks || "-"],
      ["Case Title", row.caseTitle],
    ],
  });

  doc.save(`Application_${row.username}.pdf`);
};