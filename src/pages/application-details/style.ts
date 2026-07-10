import { styles as tableStyles } from "../inspec-applications/style";
import { styles as popupStyles } from "../../components/popup/style";

export const styles = {
  ...tableStyles,
  headingRow: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginTop: "50px",
    marginBottom: "25px",
  },
  backButton: popupStyles.iconButton,
  tableHeading: {
    ...tableStyles.tableHeading,
    marginTop: 0,
    marginBottom: 0,
  },
};
