import Popup from "../..";
import ApproverProcess from "../../../../pages/approver-process";
import type { ApplicationResponse } from "../../../../pages/inspec-applications/services/applications.type";
import type { ApproverProcessValues } from "../../../../pages/approver-process/type";

interface ApproverProcessPopupProps {
  application: ApplicationResponse | null;
  onClose: () => void;
  onSubmit: (values: ApproverProcessValues) => void;
}

const ApproverProcessPopup = ({
  application,
  onClose,
  onSubmit,
}: ApproverProcessPopupProps) => {
  return (
    <Popup
      open={Boolean(application)}
      title="Approver Process"
      onClose={onClose}
      maxWidth="md"
    >
      {application && (
        <ApproverProcess
          diaryNo={application.diaryNo}
          diaryYr={application.diaryYr}
          onSubmit={onSubmit}
          onCancel={onClose}
        />
      )}
    </Popup>
  );
};

export default ApproverProcessPopup;
