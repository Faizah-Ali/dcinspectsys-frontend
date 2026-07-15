import { Box } from "@mui/material";

import ApplicationsTable from "../../components/table/inspec-applications/applicationsTable";
import useAuthGuard from "../../hooks/useAuthGuard";
import { styles } from "../inspec-applications/style";

const ProcessedCopySide = () => {
  useAuthGuard();

  return (
    <Box sx={styles.mainContainer}>
      <ApplicationsTable
        title="Processed (Copy Side)"
        owner="C"
        fixedApplicationStatus="Y"
        showAssignAction={false}
        showApproverActions={false}
      />
    </Box>
  );
};

export default ProcessedCopySide;
