import Popup from "../..";
import UploadFile from "../../../../pages/upload-file";
import { uploadFilePopupStyles } from "../../../../pages/upload-file/style";
import type { ApplicationResponse } from "../../../../pages/inspec-applications/services/applications.type";
import type { UploadFileValues } from "../../../../pages/upload-file/type";

interface UploadFilePopupProps {
  application: ApplicationResponse | null;
  onClose: () => void;
  onSubmit: (values: UploadFileValues) => void | Promise<void>;
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
      paperSx={uploadFilePopupStyles.paper}
      headerSx={uploadFilePopupStyles.header}
      contentSx={uploadFilePopupStyles.content}
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
