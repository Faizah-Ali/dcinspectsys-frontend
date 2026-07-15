import { Box } from "@mui/material";
import { Navigate } from "react-router-dom";

import ApplicationsTable from "../../components/table/inspec-applications/applicationsTable";
import { Paths } from "../../common/constants";
import useAuthGuard from "../../hooks/useAuthGuard";
import { useAppSelector } from "../../hooks/useAppSelector";
import { getRole } from "../../utils/authSession.utils";
import { styles } from "../inspec-applications/style";

const ProcessedApplicationSide = () => {
  useAuthGuard();

  const reduxRole = useAppSelector((state) => state.auth.role);
  const role = reduxRole || getRole();

  if (role === "INSPECTIONAPPROVER") {
    return <Navigate to={Paths.INSPECT_APPLICATIONS} replace />;
  }

  if (role !== "ONLINEINSPECTION" && role !== "INSPECTIONADMIN") {
    return <Navigate to={Paths.INSPECT_APPLICATIONS} replace />;
  }

  return (
    <Box sx={styles.mainContainer}>
      <ApplicationsTable
        title="Processed (Application Side)"
        owner="A"
        fixedApplicationStatus="Y"
        showAssignAction={false}
        showApproverActions={false}
      />
    </Box>
  );
};

export default ProcessedApplicationSide;
