import { useState } from "react";

import type { ApplicationResponse } from "../pages/inspec-applications/services/applications.type";
import {
  approveApplication,
  forwardApplication,
  rejectApplication,
} from "../pages/inspec-applications/services/approver.action";
import type { ApproverProcessValues } from "../pages/approver-process/type";
import {
  resolveCompleteRemarks,
  toRejectIdKey,
} from "../pages/complete-application/helper";
import { completeApplication } from "../pages/complete-application/services/complete-application.action";
import type { RejectApplicationValues } from "../pages/reject-application/type";
import { handleSendForApprovalSubmit } from "../pages/select-approver/services/send-for-approval.helper";
import type { SelectApproverValues } from "../pages/select-approver/type";
import { handleAssignApplicationSubmit } from "../pages/select-staff/services/assign-application.helper";
import type { SelectStaffValues } from "../pages/select-staff/type";
import { handleUploadInspectionFileSubmit } from "../pages/upload-file/services/upload-inspection-file.action";
import type { UploadFileValues } from "../pages/upload-file/type";
import { showErrorToast, showSuccessToast } from "../components/toast/helper";

interface UseApplicationPopupsOptions {
  setRefreshKey: React.Dispatch<React.SetStateAction<number>>;
}

export const useApplicationPopups = ({
  setRefreshKey,
}: UseApplicationPopupsOptions) => {
  const [selectedApplication, setSelectedApplication] =
    useState<ApplicationResponse | null>(null);
  const [selectedApproverApplication, setSelectedApproverApplication] =
    useState<ApplicationResponse | null>(null);
  const [selectedUploadApplication, setSelectedUploadApplication] =
    useState<ApplicationResponse | null>(null);
  const [selectedHistoryApplication, setSelectedHistoryApplication] =
    useState<ApplicationResponse | null>(null);
  const [completeAction, setCompleteAction] =
    useState<ApplicationResponse | null>(null);
  const [selectedRejectApplication, setSelectedRejectApplication] =
    useState<ApplicationResponse | null>(null);
  const [selectedApproverProcessApplication, setSelectedApproverProcessApplication] =
    useState<ApplicationResponse | null>(null);
  const [selectedRemarksApplication, setSelectedRemarksApplication] =
    useState<ApplicationResponse | null>(null);
  /**
   * Per-application legacy REJECTID mirror (keyed by diaryNo/diaryYr).
   * Present only after reject-reason UI interaction (takeaction equivalent).
   * Complete reads this when set; otherwise uses Application REMARKS initial value.
   */
  const [rejectIdOverrides, setRejectIdOverrides] = useState<
    Record<string, string>
  >({});

  const clearRejectIdOverride = (diaryNo: number, diaryYr: number) => {
    const key = toRejectIdKey(diaryNo, diaryYr);

    setRejectIdOverrides((prev) => {
      if (!(key in prev)) {
        return prev;
      }

      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const handleRejectIdChange = (value: string) => {
    if (!selectedRejectApplication) {
      return;
    }

    const { diaryNo, diaryYr } = selectedRejectApplication;

    if (!diaryNo || !diaryYr) {
      return;
    }

    const key = toRejectIdKey(diaryNo, diaryYr);

    setRejectIdOverrides((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleOpenAssignPopup = (application: ApplicationResponse) => {
    setSelectedApplication(application);
  };

  const handleCloseAssignPopup = () => {
    setSelectedApplication(null);
  };

  const handleAssignSubmit = async (values: SelectStaffValues) => {
    try {
      await handleAssignApplicationSubmit({
        application: selectedApplication,
        values,
        onClose: handleCloseAssignPopup,
        onSuccess: () => {
          setRefreshKey((prev) => prev + 1);
        },
      });
    } catch (error) {
      showErrorToast(
        error instanceof Error
          ? error.message
          : "Failed to assign application"
      );
      throw error;
    }
  };

  const handleOpenSelectApprover = (application: ApplicationResponse) => {
    setSelectedApproverApplication(application);
  };

  const handleCloseSelectApprover = () => {
    setSelectedApproverApplication(null);
  };

  const handleSendToApprover = async (values: SelectApproverValues) => {
    try {
      await handleSendForApprovalSubmit({
        application: selectedApproverApplication,
        values,
        onClose: handleCloseSelectApprover,
        onSuccess: () => {
          setRefreshKey((prev) => prev + 1);
        },
      });
    } catch (error) {
      showErrorToast(
        error instanceof Error
          ? error.message
          : "Failed to send application for approval"
      );
      throw error;
    }
  };

  const handleOpenUploadPopup = (application: ApplicationResponse) => {
    setSelectedUploadApplication(application);
  };

  const handleCloseUploadPopup = () => {
    setSelectedUploadApplication(null);
  };

  const handleUploadSubmit = async (values: UploadFileValues) => {
    try {
      await handleUploadInspectionFileSubmit({
        application: selectedUploadApplication,
        values,
        onClose: handleCloseUploadPopup,
        onSuccess: () => {
          setRefreshKey((prev) => prev + 1);
        },
      });
    } catch (error) {
      showErrorToast(
        error instanceof Error
          ? error.message
          : "Failed to upload inspection file"
      );
      throw error;
    }
  };

  const handleOpenHistoryPopup = (application: ApplicationResponse) => {
    setSelectedHistoryApplication(application);
  };

  const handleCloseHistoryPopup = () => {
    setSelectedHistoryApplication(null);
  };

  const handleComplete = (application: ApplicationResponse) => {
    setCompleteAction(application);
  };

  const handleCloseComplete = () => {
    setCompleteAction(null);
  };

  const handleConfirmComplete = async () => {
    if (!completeAction) {
      return;
    }

    try {
      const { diaryNo, diaryYr, remarks: applicationRemarks } = completeAction;

      if (!diaryNo || !diaryYr) {
        throw new Error("Application diary details are missing");
      }

      // Legacy accept(): copy current REJECTID value (override if reject UI
      // interacted; otherwise initial Application REMARKS via MyUtil.getString).
      const key = toRejectIdKey(diaryNo, diaryYr);
      const remarks = resolveCompleteRemarks(
        applicationRemarks,
        rejectIdOverrides[key]
      );

      const message = await completeApplication(diaryNo, diaryYr, remarks);

      showSuccessToast(message);
      clearRejectIdOverride(diaryNo, diaryYr);
      handleCloseComplete();
      setRefreshKey((prev) => prev + 1);
    } catch (error) {
      showErrorToast(
        error instanceof Error
          ? error.message
          : "Failed to complete application"
      );
      handleCloseComplete();
    }
  };

  const handleOpenRejectPopup = (application: ApplicationResponse) => {
    setSelectedRejectApplication(application);
  };

  const handleCloseRejectPopup = () => {
    setSelectedRejectApplication(null);
  };

  const handleRejectSubmit = async (values: RejectApplicationValues) => {
    if (!selectedRejectApplication) {
      return;
    }

    try {
      const { diaryNo, diaryYr } = selectedRejectApplication;

      if (!diaryNo || !diaryYr) {
        throw new Error("Application diary details are missing");
      }

      // Officer Reject: form already resolved legacy payload remarks
      // (preset option value OR raw Other text — no "Reason:" prefix, no trim).
      const message = await rejectApplication(
        diaryNo,
        diaryYr,
        values.remarks
      );

      showSuccessToast(message);
      clearRejectIdOverride(diaryNo, diaryYr);
      handleCloseRejectPopup();
      setRefreshKey((prev) => prev + 1);
    } catch (error) {
      showErrorToast(
        error instanceof Error
          ? error.message
          : "Failed to reject application"
      );
      handleCloseRejectPopup();
    }
  };

  const handleOpenApproverProcess = (application: ApplicationResponse) => {
    setSelectedApproverProcessApplication(application);
  };

  const handleCloseApproverProcess = () => {
    setSelectedApproverProcessApplication(null);
  };

  const handleOpenRemarksPopup = (application: ApplicationResponse) => {
    setSelectedRemarksApplication(application);
  };

  const handleCloseRemarksPopup = () => {
    setSelectedRemarksApplication(null);
  };

  const handleApproverProcessSubmit = async (values: ApproverProcessValues) => {
    if (values.action === "APPROVE" || values.action === "REJECT") {
      try {
        if (!selectedApproverProcessApplication) {
          throw new Error("Please select an application");
        }

        const { diaryNo, diaryYr } = selectedApproverProcessApplication;

        if (!diaryNo || !diaryYr) {
          throw new Error("Application diary details are missing");
        }

        const message =
          values.action === "APPROVE"
            ? await approveApplication(diaryNo, diaryYr, values.remarks)
            : await rejectApplication(diaryNo, diaryYr, values.remarks);

        showSuccessToast(message);
        handleCloseApproverProcess();
        setRefreshKey((prev) => prev + 1);
      } catch (error) {
        showErrorToast(
          error instanceof Error
            ? error.message
            : values.action === "APPROVE"
              ? "Failed to approve application"
              : "Failed to reject application"
        );
        throw error;
      }

      return;
    }

    try {
      if (!selectedApproverProcessApplication) {
        throw new Error("Please select an application");
      }

      const { diaryNo, diaryYr } = selectedApproverProcessApplication;

      if (!diaryNo || !diaryYr) {
        throw new Error("Application diary details are missing");
      }

      if (!values.forwardTo || !values.forwardToName) {
        throw new Error("Please select an approver");
      }

      const message = await forwardApplication(
        diaryNo,
        diaryYr,
        values.forwardTo,
        values.forwardToName,
        values.remarks
      );

      showSuccessToast(message);
      handleCloseApproverProcess();
      setRefreshKey((prev) => prev + 1);
    } catch (error) {
      showErrorToast(
        error instanceof Error
          ? error.message
          : "Failed to forward application"
      );
      throw error;
    }
  };

  return {
    selectedApplication,
    selectedApproverApplication,
    selectedUploadApplication,
    selectedHistoryApplication,
    completeAction,
    selectedRejectApplication,
    selectedApproverProcessApplication,
    selectedRemarksApplication,
    handleOpenAssignPopup,
    handleCloseAssignPopup,
    handleAssignSubmit,
    handleOpenSelectApprover,
    handleCloseSelectApprover,
    handleSendToApprover,
    handleOpenUploadPopup,
    handleCloseUploadPopup,
    handleUploadSubmit,
    handleOpenHistoryPopup,
    handleCloseHistoryPopup,
    handleComplete,
    handleCloseComplete,
    handleConfirmComplete,
    handleOpenRejectPopup,
    handleCloseRejectPopup,
    handleRejectSubmit,
    handleRejectIdChange,
    handleOpenApproverProcess,
    handleCloseApproverProcess,
    handleApproverProcessSubmit,
    handleOpenRemarksPopup,
    handleCloseRemarksPopup,
  };
};
