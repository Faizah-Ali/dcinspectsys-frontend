export const BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:8080"
    : "http://172.16.114.198:8080/inspection-system";