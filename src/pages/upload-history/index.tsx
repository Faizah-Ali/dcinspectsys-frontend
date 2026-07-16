import {
  Box,
  Button,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import { VARIANTS } from "../../common/constants";

import { handleView, MOCK_UPLOAD_HISTORY } from "./helper";
import { styles } from "./style";
import type { UploadHistoryProps } from "./type";

const UploadHistory = ({ diaryNo, diaryYr, onClose }: UploadHistoryProps) => {
  return (
    <Box sx={styles.container}>
      <Box component="p" sx={styles.referenceText}>
        Reference No.-  {diaryNo}/{diaryYr}
      </Box>

      <TableContainer component={Paper} sx={styles.tableWrapper}>
        <Table sx={styles.table}>
          <TableHead>
            <TableRow sx={styles.headerRow}>
              <TableCell sx={styles.headerCell}>Version</TableCell>
              <TableCell sx={styles.headerCell}>Document Type</TableCell>
              <TableCell sx={styles.headerCell}>File Name</TableCell>
              <TableCell sx={styles.headerCell}>Uploaded By</TableCell>
              <TableCell sx={styles.headerCell}>Uploaded On</TableCell>
              <TableCell sx={styles.headerCell}>Status</TableCell>
              <TableCell sx={styles.headerCell}>Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {MOCK_UPLOAD_HISTORY.map((item) => (
              <TableRow key={item.id} sx={styles.dataRow}>
                <TableCell sx={styles.dataCell}>{item.version}</TableCell>
                <TableCell sx={styles.dataCell}>{item.documentType}</TableCell>
                <TableCell sx={styles.dataCell}>{item.fileName}</TableCell>
                <TableCell sx={styles.dataCell}>{item.uploadedBy}</TableCell>
                <TableCell sx={styles.dataCell}>{item.uploadedOn}</TableCell>
                <TableCell sx={styles.dataCell}>
                  <Chip
                    label={item.status}
                    size="small"
                    sx={styles.statusChip}
                  />
                </TableCell>
                <TableCell sx={styles.dataCell}>
                  <Button
                    type="button"
                    variant={VARIANTS.OUTLINED}
                    onClick={() => handleView(item.fileName)}
                    sx={styles.viewButton}
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={styles.actionsWrap}>
        <Button
          type="button"
          variant={VARIANTS.OUTLINED}
          onClick={onClose}
          sx={styles.closeButton}
        >
          Close
        </Button>
      </Box>
    </Box>
  );
};

export default UploadHistory;
