import type { SxProps, Theme } from "@mui/material";

// Shared visual rules so every chip — filled or outlined — has the same
// height, radius, typography and centered label, regardless of label length.
const baseChipSx: SxProps<Theme> = {
  height: 36,
  borderRadius: "20px",
  fontSize: "13px",
  fontWeight: 500,
  "& .MuiChip-label": {
    width: "100%",
    textAlign: "center",
    paddingLeft: "12px",
    paddingRight: "12px",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
};

// Filled (Case Status): solid fill + white text, wider so the longer
// case-status labels (e.g. "Pending For Approval") fit on one line.
export const filledChipSx = (color: string): SxProps<Theme> => ({
  ...baseChipSx,
  minWidth: 150,
  backgroundColor: color,
  color: "#FFFFFF",
  borderColor: color,
});

// Outlined (Application Status): transparent fill, colored text + border.
export const outlinedChipSx = (color: string): SxProps<Theme> => ({
  ...baseChipSx,
  minWidth: 150,
  backgroundColor: "transparent",
  color,
  borderColor: color,
});
