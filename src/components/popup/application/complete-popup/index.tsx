import Popup from "../..";
import { ConfirmPopUp } from "../../confimation";
import type { ApplicationResponse } from "../../../../pages/inspec-applications/services/applications.type";

interface CompletePopupProps {
  application: ApplicationResponse | null;
  onClose: () => void;
  onConfirm: () => void;
}

const CompletePopup = ({
  application,
  onClose,
  onConfirm,
}: CompletePopupProps) => {
  return (
    <Popup
      open={Boolean(application)}
      onClose={onClose}
      maxWidth="xs"
      hideHeader
    >
      <ConfirmPopUp
        message="Are you sure you want to complete this application?"
        handleNo={onClose}
        handleYes={onConfirm}
      />
    </Popup>
  );
};

export default CompletePopup;
