import { Box } from "@mui/material";
import { styles } from "./style";
import ApplicationsTable from "../../components/table/inspec-applications/applicationsTable";
import useAuthGuard from "../../hooks/useAuthGuard";

const InspectApplications = () => {
  useAuthGuard();
  return (
    <Box sx={styles.mainContainer}>
      <ApplicationsTable />
    </Box>
  );
};

export default InspectApplications;
