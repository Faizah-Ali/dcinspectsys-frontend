import { Chip } from "@mui/material";

import { VARIANTS } from "../../common/constants";
import {
  getStatusColor,
  getStatusLabel,
} from "../../common/constants/status";

import { filledChipSx, outlinedChipSx } from "./style";

interface StatusChipProps {
  statusCode?: string | null;
  variant?: typeof VARIANTS.OUTLINED | typeof VARIANTS.FILLED;
  size?: "small" | "medium";
}

const StatusChip = ({
  statusCode,
  variant = VARIANTS.OUTLINED,
  size = "small",
}: StatusChipProps) => {
  const label = getStatusLabel(statusCode);
  const color = getStatusColor(label);

  // MUI's `color` prop only accepts theme palette keys, so we drive the
  // brand hex through `sx` and let `variant` control fill vs. outline.
  const chipSx =
    variant === VARIANTS.FILLED ? filledChipSx(color) : outlinedChipSx(color);

  return (
    <Chip
      label={label}
      variant={variant}
      size={size}
      sx={chipSx}
    />
  );
};

export default StatusChip;
