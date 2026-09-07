import { Box, Dialog, DialogContent, IconButton } from "@mui/material";
import type { SxProps, Theme } from "@mui/material";

import { IMAGES } from "../../common/constants/images";
import { styles } from "./style";
import type { PopupProps } from "./type";

const mergeSx = (
  ...parts: Array<SxProps<Theme> | false | null | undefined>
): SxProps<Theme> =>
  parts.filter(Boolean) as SxProps<Theme>;

const Popup = ({
  open,
  title,
  children,
  onClose,
  onBack,
  maxWidth = "sm",
  hideHeader = false,
  titleAlign = "center",
  paperSx,
  headerSx,
  contentSx,
}: PopupProps) => {
  const handleBack = onBack ?? onClose;
  const isLeftTitle = titleAlign === "left";
  const iconSx = isLeftTitle ? styles.iconButtonOnDark : styles.iconButton;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={maxWidth}
      fullWidth
      PaperProps={{
        sx: mergeSx(styles.dialogPaper, paperSx),
      }}
    >
      {!hideHeader && (
        <Box
          sx={mergeSx(
            styles.header,
            isLeftTitle && styles.headerInline,
            headerSx
          )}
        >
          <IconButton
            aria-label="Go back"
            onClick={handleBack}
            sx={iconSx}
          >
            <IMAGES.ArrowBackIcon />
          </IconButton>

          <Box sx={isLeftTitle ? styles.titleWrapInline : styles.titleWrap}>
            <Box
              component="h2"
              sx={isLeftTitle ? styles.titleInline : styles.title}
            >
              {title}
            </Box>
          </Box>

          <IconButton aria-label="Close popup" onClick={onClose} sx={iconSx}>
            <IMAGES.CloseIcon />
          </IconButton>
        </Box>
      )}

      <DialogContent
        sx={mergeSx(
          hideHeader ? styles.contentNoHeader : styles.content,
          contentSx
        )}
      >
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default Popup;
