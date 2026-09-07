import Popup from "../..";
import UploadHistory from "../../../../pages/upload-history";
import { uploadHistoryPopupStyles } from "../../../../pages/upload-history/style";
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
      paperSx={uploadHistoryPopupStyles.paper}
      headerSx={uploadHistoryPopupStyles.header}
      contentSx={uploadHistoryPopupStyles.content}
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
