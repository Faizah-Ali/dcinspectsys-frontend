import { Box, Button, Typography } from "@mui/material";

import { VARIANTS } from "../../../common/constants";
import type { ConfirmProps } from "./type";
import styles from "./styles";

export const ConfirmPopUp = ({
  message,
  logo,
  handleNo,
  handleYes,
}: ConfirmProps) => {
  return (
    <Box sx={styles.popup}>
      {logo && (
        <Box component="img" src={logo} alt="Confirmation" sx={styles.logo} />
      )}
      <Typography sx={styles.message}>{message}</Typography>
      <Box sx={styles.btnContainer}>
        <Button
          variant={VARIANTS.CONTAINED}
          onClick={handleYes}
          sx={styles.themeBtn}
        >
          Confirm
        </Button>
        <Button
          variant={VARIANTS.OUTLINED}
          onClick={handleNo}
          sx={styles.grayBtn}
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
};
