import { Box, IconButton, useMediaQuery } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { styles } from "./style";
import { IMAGES } from "../../common/constants/images";
import { DESKTOP_MIN } from "../../common/constants/breakpoints";

interface HeaderProps {
  onMenuClick?: () => void;
}

const Header = ({ onMenuClick }: HeaderProps) => {
  const isDesktop = useMediaQuery(`(min-width:${DESKTOP_MIN}px)`);

  return (
    <Box sx={styles.header}>
      <Box sx={styles.leftSection}>
        {!isDesktop && onMenuClick && (
          <IconButton
            aria-label="Open navigation menu"
            title="Open navigation menu"
            onClick={onMenuClick}
            sx={styles.menuButton}
          >
            <MenuIcon />
          </IconButton>
        )}

        <Box sx={styles.leftEmblem}>
          <Box
            component="img"
            src={IMAGES.DhcLogo}
            alt="Delhi High Court Logo"
            sx={styles.leftEmblemImage}
          />
        </Box>
      </Box>

      <Box sx={styles.centerContent}>
        <Box component="h1" sx={styles.title}>
          DELHI HIGH COURT
        </Box>
        <Box component="p" sx={styles.subtitle}>
          ONLINE INSPECTION SYSTEM
        </Box>
      </Box>

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
