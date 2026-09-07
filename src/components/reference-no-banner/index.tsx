import { Box } from "@mui/material";
import type { SxProps, Theme } from "@mui/material";

import { styles } from "./styles";
import type { ReferenceNoBannerProps } from "./types";

const ReferenceNoBanner = ({ diaryNo, diaryYr, sx }: ReferenceNoBannerProps) => {
  return (
    <Box sx={[styles.banner, sx].filter(Boolean) as SxProps<Theme>}>
      <Box component="p" sx={styles.text}>
        Reference No.- {diaryNo}/{diaryYr}
      </Box>
    </Box>
  );
};

export default ReferenceNoBanner;
