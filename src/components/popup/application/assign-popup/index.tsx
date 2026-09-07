import Popup from "../..";
import SelectStaff from "../../../../pages/select-staff";
import { selectStaffPopupStyles } from "../../../../pages/select-staff/style";
import type { ApplicationResponse } from "../../../../pages/inspec-applications/services/applications.type";
import type { SelectStaffValues } from "../../../../pages/select-staff/type";

interface AssignPopupProps {
  application: ApplicationResponse | null;
  onClose: () => void;
  onSubmit: (values: SelectStaffValues) => void | Promise<void>;
}

const AssignPopup = ({ application, onClose, onSubmit }: AssignPopupProps) => {
  return (
    <Popup
      open={Boolean(application)}
      title="Select Staff"
      onClose={onClose}
      maxWidth="md"
      paperSx={selectStaffPopupStyles.paper}
      headerSx={selectStaffPopupStyles.header}
      contentSx={selectStaffPopupStyles.content}
    >
      {application && (
        <SelectStaff
          key={`${application.diaryNo}-${application.diaryYr}-${application.assigned ?? ""}-${application.assignedname ?? ""}`}
          diaryNo={application.diaryNo}
          diaryYr={application.diaryYr}
          initialAssignedName={application.assignedname}
          initialAssignedId={application.assigned}
          onSubmit={onSubmit}
        />
      )}
    </Popup>
  );
};

export default AssignPopup;
