import { styles as tableStyles } from "../inspec-applications/style";
import { styles as popupStyles } from "../../components/popup/style";

export const styles = {
  ...tableStyles,
  // This table shows Assigned Staff where the applications table shows Remarks,
  // so it reuses that column's width to keep both grids identical.
  assignedStaffCell: tableStyles.remarksCell,
  headingRow: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    // Match the applications table heading rhythm; the negative left margin
    // cancels the icon button's padding so the row starts at the table's edge.
    marginTop: tableStyles.tableHeading.marginTop,
    marginBottom: tableStyles.tableHeading.marginBottom,
    marginLeft: "-8px",
  },
  backButton: popupStyles.iconButton,
  tableHeading: {
    ...tableStyles.tableHeading,
    marginTop: 0,
    marginBottom: 0,
  },
};
