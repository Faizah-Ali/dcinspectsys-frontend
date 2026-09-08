import type { SxProps, Theme } from "@mui/material/styles";

export type SearchableSelectOption = {
  value: string;
  label: string;
};

export type SearchableSelectProps = {
  id?: string;
  value: string;
  options: SearchableSelectOption[];
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  loading?: boolean;
  clearable?: boolean;
  fullWidth?: boolean;
  size?: "small" | "medium";
  noOptionsText?: string;
  label?: string;
  sx?: SxProps<Theme>;
  /** Called after the popup closes (e.g. blur focus outline). */
  onClose?: () => void;
};
