import {
  Box,
  TablePagination,
  Typography,
  MenuItem,
  Select,
} from "@mui/material";
import type { PaginationProps } from "./type";
import styles from "./style";
import { useState, useEffect } from "react";

const PaginationSection = ({
  listData,
  handleChangePage,
  handleChangeLimit,
  externalStyles = {},
  currentLimit = 10,
}: PaginationProps) => {
  const [limit, setLimit] = useState(currentLimit.toString());
  
  useEffect(() => {
    setLimit(currentLimit.toString());
  }, [currentLimit]);
  
  return Boolean(listData?.totalItems) ? (
    <Box sx={{ ...styles.paginationContainer, ...externalStyles }}>
      <Box sx={styles.countContainer}>
        <Typography sx={styles.count}>Items per page</Typography>
        <Select
            value={limit}
            onChange={(e) => {
              handleChangeLimit(e);
              setLimit(e.target.value);
            }}
            sx={styles.select}
          >
          {[10, 20, 30, 40, 50]?.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </Box>
      <Box sx={styles.pageContainer}>
        <TablePagination
            component="div"
            count={listData?.totalItems}
            page={listData?.currentPage - 1}
            onPageChange={(event, val) => {
                event?.preventDefault();
                handleChangePage(val + 1);
            }}
            rowsPerPage={Number(limit)}
            rowsPerPageOptions={[]}
            />
      </Box>
    </Box>
  ) : (
    <Box />
  );
};

export default PaginationSection;
