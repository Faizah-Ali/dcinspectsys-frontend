// src/config.ts
export const BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:8080"
    : "/inspection-system-0.0.1-SNAPSHOT";