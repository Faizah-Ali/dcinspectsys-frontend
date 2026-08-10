import Popup from "../..";
import UploadHistory from "../../../../pages/upload-history";
import type { ApplicationResponse } from "../../../../pages/inspec-applications/services/applications.type";

interface UploadHistoryPopupProps {
  application: ApplicationResponse | null;
  onClose: () => void;
}

const UploadHistoryPopup = ({
  application,
  onClose,
}: UploadHistoryPopupProps) => {
  return (
    <Popup
      open={Boolean(application)}
      title="Upload History"
      onClose={onClose}
      maxWidth="md"
    >
      {application && (
        <UploadHistory
          diaryNo={application.diaryNo}
          diaryYr={application.diaryYr}
          applicationStatus={application.status}
          onClose={onClose}
        />
      )}
    </Popup>
  );
};

export default UploadHistoryPopup;
