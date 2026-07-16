import Popup from "../..";
import UploadFile from "../../../../pages/upload-file";
import type { ApplicationResponse } from "../../../../pages/inspec-applications/services/applications.type";
import type { UploadFileValues } from "../../../../pages/upload-file/type";

interface UploadFilePopupProps {
  application: ApplicationResponse | null;
  onClose: () => void;
  onSubmit: (values: UploadFileValues) => void;
}

const UploadFilePopup = ({
  application,
  onClose,
  onSubmit,
}: UploadFilePopupProps) => {
  return (
    <Popup
      open={Boolean(application)}
      title="Upload File"
      onClose={onClose}
      maxWidth="md"
    >
      {application && (
        <UploadFile
          diaryNo={application.diaryNo}
          diaryYr={application.diaryYr}
          onSubmit={onSubmit}
          onCancel={onClose}
        />
      )}
    </Popup>
  );
};

export default UploadFilePopup;
