import { Box } from "@mui/material";
import { styles } from "./style";

const Header = () => {
  return (
    <Box sx={styles.header}>
      <Box component="h1" sx={styles.title}>
        DELHI HIGH COURT
      </Box>
      <Box component="p" sx={styles.subtitle}>
        ONLINE E-INSPECTION SYSTEM
      </Box>
    </Box>
  );
};

export default Header;
