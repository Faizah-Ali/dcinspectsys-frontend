import { Box, Dialog, DialogContent, IconButton } from "@mui/material";

import { IMAGES } from "../../common/constants/images";
import { styles } from "./style";
import type { PopupProps } from "./type";

const Popup = ({
  open,
  title,
  children,
  onClose,
  onBack,
  maxWidth = "sm",
  hideHeader = false,
}: PopupProps) => {
  const handleBack = onBack ?? onClose;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={maxWidth}
      fullWidth
      PaperProps={{
        sx: styles.dialogPaper,
      }}
    >
      {!hideHeader && (
        <Box sx={styles.header}>
          <IconButton
            aria-label="Go back"
            onClick={handleBack}
            sx={styles.iconButton}
          >
            <IMAGES.ArrowBackIcon />
          </IconButton>

          <Box sx={styles.titleWrap}>
            <Box component="h2" sx={styles.title}>
              {title}
            </Box>
          </Box>

          <IconButton
            aria-label="Close popup"
            onClick={onClose}
            sx={styles.iconButton}
          >
            <IMAGES.CloseIcon />
          </IconButton>
        </Box>
      )}

      <DialogContent sx={hideHeader ? styles.contentNoHeader : styles.content}>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default Popup;
