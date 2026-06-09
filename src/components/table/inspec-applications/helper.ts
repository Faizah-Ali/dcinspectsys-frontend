// Helper functions for the applications table

// Format date for display
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

// Get status color based on status value
export const getStatusColor = (status: string): string => {
  switch (status.toLowerCase()) {
    case "pending":
      return "#ff9800"; // Orange
    case "in progress":
      return "#2196f3"; // Blue
    case "approved":
      return "#4caf50"; // Green
    case "rejected":
      return "#f44336"; // Red
    default:
      return "#757575"; // Grey
  }
};

export const getApplicationStatus = (status: string): string => {

  switch (status) {
    case "Y":
      return "New Filing";

    case "C":
      return "Completed";

    case "R":
      return "Rejected";

    default:
      return status;
  }
};

export const getCaseStatus = (status: string | null | undefined): string => {

  if (!status) {
    return "-";
  }

  switch (status) {
    case "P":
      return "Pending";

    case "D":
      return "Dispose";

    case "R":
      return "Reject";

    default:
      return status;
  }
};