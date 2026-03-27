import { Box } from "@mui/material";
import { styles } from "./style";
import { IMAGES } from "../../common/constants/images";

const Header = () => {
  return (
    <Box sx={styles.header}>
      {/* Left Emblem - Delhi High Court Logo */}
      <Box sx={styles.leftEmblem}>
        <Box
          component="img"
          src={IMAGES.DhcLogo}
          alt="Delhi High Court Logo"
          sx={styles.leftEmblemImage}
        />
      </Box>

      {/* Center Content - Text */}
      <Box sx={styles.centerContent}>
        <Box component="h1" sx={styles.title}>
          DELHI HIGH COURT
        </Box>
        <Box component="p" sx={styles.subtitle}>
          ONLINE INSPECTION SYSTEM
        </Box>
      </Box>

      {/* Right Emblem - State Emblem of India */}
      <Box sx={styles.rightEmblem}>
        <Box
          component="img"
          src={IMAGES.Emblem}
          alt="State Emblem of India"
          sx={styles.rightEmblemImage}
        />
      </Box>
    </Box>
  );
};

export default Header;
