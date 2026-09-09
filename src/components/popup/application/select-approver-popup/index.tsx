import Popup from "../..";
import SelectApprover from "../../../../pages/select-approver";
import { selectApproverPopupStyles } from "../../../../pages/select-approver/style";
import type { ApplicationResponse } from "../../../../pages/inspec-applications/services/applications.type";
import type { SelectApproverValues } from "../../../../pages/select-approver/type";

interface SelectApproverPopupProps {
  application: ApplicationResponse | null;
  onClose: () => void;
  onSubmit: (values: SelectApproverValues) => void | Promise<void>;
}

const SelectApproverPopup = ({
  application,
  onClose,
  onSubmit,
}: SelectApproverPopupProps) => {
  return (
    <Popup
      open={Boolean(application)}
      title="Select Approver"
      onClose={onClose}
      maxWidth="md"
      paperSx={selectApproverPopupStyles.paper}
      headerSx={selectApproverPopupStyles.header}
      contentSx={selectApproverPopupStyles.content}
    >
      {application && (
        <SelectApprover
          diaryNo={application.diaryNo}
          diaryYr={application.diaryYr}
          onSubmit={onSubmit}
          onCancel={onClose}
        />
      )}
    </Popup>
  );
};

export default SelectApproverPopup;
