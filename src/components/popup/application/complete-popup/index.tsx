import { useEffect, useState } from "react";

import Popup from "../..";
import { ConfirmPopUp } from "../../confimation";
import type { ApplicationResponse } from "../../../../pages/inspec-applications/services/applications.type";

interface CompletePopupProps {
  application: ApplicationResponse | null;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
}

const CompletePopup = ({
  application,
  onClose,
  onConfirm,
}: CompletePopupProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (application) {
      setIsSubmitting(false);
    }
  }, [application]);

  const handleConfirm = async () => {
    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    try {
      await onConfirm();
    } catch {
      setIsSubmitting(false);
    }
  };

  return (
    <Popup
      open={Boolean(application)}
      onClose={isSubmitting ? () => undefined : onClose}
      maxWidth="xs"
      hideHeader
    >
      <ConfirmPopUp
        message="Are you sure you want to complete this application ?"
        handleNo={onClose}
        handleYes={handleConfirm}
        disabled={isSubmitting}
      />
    </Popup>
  );
};

export default CompletePopup;
