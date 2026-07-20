import { ENDPOINTS } from "../../../common/constants/endpoint";
import { showSuccessToast } from "../../../components/toast/helper";
import { authFetch } from "../../../utils/api";

import type { ApplicationResponse } from "../../inspec-applications/services/applications.type";
import type { UploadFileValues } from "../type";

import type {
  UploadInspectionFileParams,
  UploadInspectionFileResponse,
} from "./upload-inspection-file.type";

export const uploadInspectionFile = async ({
  files,
  diaryNo,
  diaryYr,
}: UploadInspectionFileParams): Promise<string> => {
  const formData = new FormData();

  files.forEach((file) => {
    formData.append("files", file);
  });

  formData.append("diaryNo", String(diaryNo));
  formData.append("diaryYr", String(diaryYr));

  const response = await authFetch(ENDPOINTS.UPLOAD_INSPECTION_FILE, {
    method: "POST",
    body: formData,
  });

  const data: UploadInspectionFileResponse = await response
    .json()
    .catch(() => ({ message: "" }));

  const message = data.message?.trim();

  if (!response.ok) {
    throw new Error(message || "Failed to upload inspection file");
  }

  if (!message) {
    throw new Error("Failed to upload inspection file");
  }

  return message;
};

export const handleUploadInspectionFileSubmit = async ({
  application,
  values,
  onSuccess,
  onClose,
}: {
  application: ApplicationResponse | null;
  values: UploadFileValues;
  onSuccess: () => void;
  onClose: () => void;
}) => {
  if (!application) {
    throw new Error("Please select an application");
  }

  if (!application.diaryNo || !application.diaryYr) {
    throw new Error("Application diary details are missing");
  }

  if (!values.files.length) {
    throw new Error("Please select a PDF file");
  }

  const message = await uploadInspectionFile({
    files: values.files,
    diaryNo: application.diaryNo,
    diaryYr: application.diaryYr,
  });

  showSuccessToast(message);
  onClose();
  onSuccess();
};
