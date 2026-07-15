import { Box } from "@mui/material";
import { Navigate } from "react-router-dom";

import ApplicationsTable from "../../components/table/inspec-applications/applicationsTable";
import { Paths } from "../../common/constants";
import useAuthGuard from "../../hooks/useAuthGuard";
import { useAppSelector } from "../../hooks/useAppSelector";
import { getGroup, getRole } from "../../utils/authSession.utils";
import { styles } from "../inspec-applications/style";

const RejectedApplication = () => {
  useAuthGuard();

  const { role: reduxRole, group: reduxGroup } = useAppSelector(
    (state) => state.auth
  );
  const role = reduxRole || getRole();
  // Session utility is the source of truth for branch/group (Redux is hydrated from it).
  const loggedInGroup = getGroup() || reduxGroup || "";

  if (role === "INSPECTIONAPPROVER") {
    return <Navigate to={Paths.INSPECT_APPLICATIONS} replace />;
  }

  if (role !== "ONLINEINSPECTION" && role !== "INSPECTIONADMIN") {
    return <Navigate to={Paths.INSPECT_APPLICATIONS} replace />;
  }

  return (
    <Box sx={styles.mainContainer}>
      <ApplicationsTable
        title="Rejected Application"
        owner={loggedInGroup}
        fixedApplicationStatus="C"
        showAssignAction={false}
        showApproverActions={false}
      />
    </Box>
  );
};

export default RejectedApplication;
