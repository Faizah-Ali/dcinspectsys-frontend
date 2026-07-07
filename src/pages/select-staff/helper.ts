import { selectStaffSchema } from "../../common/constants";
import { showErrorToast } from "../../components/toast/helper";

import type { SelectStaffValues } from "./type";

export const handleStaffIdChange =
  (setStaffId: React.Dispatch<React.SetStateAction<string>>) =>
  (event: React.ChangeEvent<HTMLInputElement>) => {
    setStaffId(event.target.value);
  };

export const handleRemarksChange =
  (setRemarks: React.Dispatch<React.SetStateAction<string>>) =>
  (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRemarks(event.target.value);
  };

export const handleSubmit =
  (
    staffId: string,
    remarks: string,
    setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>,
    onSubmit: (values: SelectStaffValues) => void
  ) =>
  async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      await selectStaffSchema.validate({ staffId }, { abortEarly: false });

      onSubmit({
        staffId,
        remarks: remarks.trim(),
      });
    } catch (error: any) {
      showErrorToast(error?.message || "Please select a staff member");
      setIsSubmitting(false);
    }
  };
