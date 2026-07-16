import Popup from "../..";
import RejectApplication from "../../../../pages/reject-application";
import type { ApplicationResponse } from "../../../../pages/inspec-applications/services/applications.type";
import type { RejectApplicationValues } from "../../../../pages/reject-application/type";

interface RejectApplicationPopupProps {
  application: ApplicationResponse | null;
  onClose: () => void;
  onSubmit: (values: RejectApplicationValues) => void;
}

const RejectApplicationPopup = ({
  application,
  onClose,
  onSubmit,
}: RejectApplicationPopupProps) => {
  return (
    <Popup
      open={Boolean(application)}
      title="Reject Application"
      onClose={onClose}
      maxWidth="md"
    >
      {application && (
        <RejectApplication
          diaryNo={application.diaryNo}
          diaryYr={application.diaryYr}
          onSubmit={onSubmit}
          onCancel={onClose}
        />
      )}
    </Popup>
  );
};

export default RejectApplicationPopup;
