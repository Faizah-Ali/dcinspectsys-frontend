import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { styles } from "../../../pages/inspec-applications/style";
import { formatDate } from "./helper";
import { IMAGES } from "../../../common/constants/images";

// Sample data for the table (you can replace this with actual data)
const sampleData = [
  {
    srlNo: 1,
    pwdCat: "Yes",
    partyInPersonId: "PIP001",
    referenceNo: "REF2024001",
    caseNo: "CASE2024001",
    remarks: "Pending review",
    applicationDate: "2024-01-15",
    status: "Pending",
    courtFeeId: "CF001",
  },
  {
    srlNo: 2,
    pwdCat: "No",
    partyInPersonId: "PIP002",
    referenceNo: "REF2024002",
    caseNo: "CASE2024002",
    remarks: "Under inspection",
    applicationDate: "2024-01-16",
    status: "In Progress",
    courtFeeId: "CF002",
  },
  {
    srlNo: 3,
    pwdCat: "Yes",
    partyInPersonId: "PIP003",
    referenceNo: "REF2024003",
    caseNo: "CASE2024003",
    remarks: "Completed",
    applicationDate: "2024-01-17",
    status: "Approved",
    courtFeeId: "CF003",
  },
];

const ApplicationsTable = () => {
  return (
    <Box sx={styles.tableContainer}>
      <Box component="h2" sx={styles.tableHeading}>
        E-Inspection Applications
      </Box>
      <TableContainer component={Paper} sx={styles.tableWrapper}>
        <Table sx={styles.table}>
          <TableHead>
            <TableRow sx={styles.headerRow}>
              <TableCell sx={styles.headerCell} align="left">SRL No.</TableCell>
              <TableCell sx={styles.headerCell} align="left">PWD Cat.</TableCell>
              <TableCell sx={styles.headerCell} align="left">Party-In-Person ID</TableCell>
              <TableCell sx={styles.headerCell} align="left">Reference No.</TableCell>
              <TableCell sx={styles.headerCell} align="left">Case No.</TableCell>
              <TableCell sx={styles.headerCell} align="left">Remarks</TableCell>
              <TableCell sx={styles.headerCell} align="left">Application Date & Status</TableCell>
              <TableCell sx={styles.headerCell} align="left">Court Fee ID</TableCell>
              <TableCell sx={styles.headerCell} align="left">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sampleData.map((row) => (
              <TableRow key={row.srlNo} sx={styles.dataRow}>
                <TableCell sx={styles.dataCell}>{row.srlNo}</TableCell>
                <TableCell sx={styles.dataCell}>{row.pwdCat}</TableCell>
                <TableCell sx={styles.dataCell}>{row.partyInPersonId}</TableCell>
                <TableCell sx={styles.dataCell}>{row.referenceNo}</TableCell>
                <TableCell sx={styles.dataCell}>{row.caseNo}</TableCell>
                <TableCell sx={styles.dataCell}>{row.remarks}</TableCell>
                <TableCell sx={styles.dataCell}>
                  {formatDate(row.applicationDate)} - {row.status}
                </TableCell>
                <TableCell sx={styles.dataCell}>{row.courtFeeId}</TableCell>
                <TableCell sx={styles.dataCell}>
                  <Box sx={styles.actionButtons}>
                    <Box component="button" sx={styles.printButton} title="Print">
                      <IMAGES.PrintIcon sx={{ fontSize: "18px" }} />
                    </Box>
                    <Box component="button" sx={styles.assignButton} title="Assign">
                      <IMAGES.AssignmentIcon sx={{ fontSize: "18px" }} />
                    </Box>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ApplicationsTable;
