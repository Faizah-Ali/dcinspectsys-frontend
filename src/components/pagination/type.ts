import type { CSSProperties } from "react";
import type { SelectChangeEvent } from "@mui/material";

export type PaginationProps = {
 listData: {
  totalItems: number;
  currentPage: number;
};
  handleChangePage: (page: number) => void;
  handleChangeLimit: (e: React.ChangeEvent<HTMLInputElement> | SelectChangeEvent<string>) => void;
  externalStyles?: CSSProperties;
  currentLimit?: number;
};
