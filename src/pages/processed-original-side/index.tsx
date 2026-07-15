import { Box } from "@mui/material";

import ApplicationsTable from "../../components/table/inspec-applications/applicationsTable";
import useAuthGuard from "../../hooks/useAuthGuard";
import { styles } from "../inspec-applications/style";

const ProcessedOriginalSide = () => {
  useAuthGuard();

  return (
    <Box sx={styles.mainContainer}>
      <ApplicationsTable
        title="Processed (Original Side)"
        owner="O"
        fixedApplicationStatus="Y"
        showAssignAction={false}
        showApproverActions={false}
      />
    </Box>
  );
};

export default ProcessedOriginalSide;
