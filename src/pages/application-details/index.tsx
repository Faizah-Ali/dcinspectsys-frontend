import { Box } from "@mui/material";

import ApplicationDetailsTable from "../../components/table/application-details/applicationDetailsTable";
import useAuthGuard from "../../hooks/useAuthGuard";

import { styles } from "./style";

const ApplicationDetails = () => {
  useAuthGuard();

  return (
    <Box sx={styles.mainContainer}>
      <ApplicationDetailsTable />
    </Box>
  );
};

export default ApplicationDetails;
