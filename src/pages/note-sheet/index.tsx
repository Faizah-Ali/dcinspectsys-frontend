import { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import { VARIANTS } from "../../common/constants";
import { showErrorToast } from "../../components/toast/helper";

import { formatCommentDateTime } from "./helper";
import { getInspectionComments } from "./services/inspection-comments.action";
import type { InspectionCommentItem } from "./services/inspection-comments.type";
import { styles } from "./style";
import type { NoteSheetProps } from "./type";

const NoteSheet = ({ diaryNo, diaryYr, onClose }: NoteSheetProps) => {
  const [comments, setComments] = useState<InspectionCommentItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    setIsLoading(true);
    setComments([]);

    getInspectionComments(diaryNo, diaryYr, controller.signal)
      .then((data) => {
        setComments(data);
      })
      .catch((error) => {
        if (controller.signal.aborted || error?.name === "AbortError") {
          return;
        }

        setComments([]);
        showErrorToast(
          error instanceof Error
            ? error.message
            : "Failed to fetch dealing remarks"
        );
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      });

    return () => {
      controller.abort();
    };
  }, [diaryNo, diaryYr]);

  return (
    <Box sx={styles.container}>
      <Box component="p" sx={styles.referenceText}>
        Reference No.-  {diaryNo}/{diaryYr}
      </Box>

      {isLoading ? (
        <Box sx={styles.loadingWrap}>
          <CircularProgress size={28} />
        </Box>
      ) : comments.length === 0 ? (
        <Box component="p" sx={styles.emptyText}>
          No dealing remarks found.
        </Box>
      ) : (
        <TableContainer component={Paper} sx={styles.tableWrapper}>
          <Table sx={styles.table}>
            <colgroup>
              {styles.columnWidths.map((width, colIndex) => (
                <col key={colIndex} style={{ width }} />
              ))}
            </colgroup>
            <TableHead>
              <TableRow sx={styles.headerRow}>
                <TableCell
                  align="center"
                  sx={{ ...styles.headerCell, ...styles.dateCell }}
                >
                  Date / Time
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ ...styles.headerCell, ...styles.authorCell }}
                >
                  Author
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ ...styles.headerCell, ...styles.commentCell }}
                >
                  Comment
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {comments.map((comment, index) => (
                <TableRow
                  key={`${comment.author}-${comment.commentDate}-${index}`}
                  sx={styles.dataRow}
                >
                  <TableCell
                    align="center"
                    sx={{ ...styles.dataCell, ...styles.dateCell }}
                  >
                    {formatCommentDateTime(comment.commentDate)}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ ...styles.dataCell, ...styles.authorCell }}
                  >
                    {comment.author}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ ...styles.contentCell, ...styles.commentCell }}
                  >
                    {comment.content}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

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

export default NoteSheet;
