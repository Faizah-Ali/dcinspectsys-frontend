// Helper functions for the applications table

import type { ApplicationResponse } from "../../../pages/inspec-applications/services/applications.type";

// Format date for display
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

export const isApplicationAssigned = (row: ApplicationResponse) =>
  Boolean(row.assigned?.trim() && row.assignedname?.trim());