import { sendMailSchema } from "../../common/constants/schema";

export interface SendMailFormData {
  toEmail: string;
  subject: string;
  message: string;
}

export interface SendMailFormErrors {
  toEmail?: string;
  subject?: string;
  message?: string;
}

export const initialSendMailForm: SendMailFormData = {
  toEmail: "",
  subject: "",
  message: "",
};

export const validateSendMailForm = async (
  formData: SendMailFormData
): Promise<SendMailFormErrors> => {
  try {
    await sendMailSchema.validate(formData, { abortEarly: false });
    return {};
  } catch (error: any) {
    const errors: SendMailFormErrors = {};

    if (error.inner) {
      error.inner.forEach((item: any) => {
        if (item.path) {
          errors[item.path as keyof SendMailFormErrors] = item.message;
        }
      });
    }

    return errors;
  }
};

export const handleFieldChange =
  (
    field: keyof SendMailFormData,
    setFormData: React.Dispatch<React.SetStateAction<SendMailFormData>>,
    errors: SendMailFormErrors,
    setErrors: React.Dispatch<React.SetStateAction<SendMailFormErrors>>
  ) =>
  (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));

    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

export const handleSendMail = (formData: SendMailFormData) => {
  // Placeholder until API integration is added.
  console.log("Send Mail:", formData);
};

export const handleResetForm = (
  setFormData: React.Dispatch<React.SetStateAction<SendMailFormData>>,
  setErrors: React.Dispatch<React.SetStateAction<SendMailFormErrors>>
) => {
  setFormData(initialSendMailForm);
  setErrors({});
};
