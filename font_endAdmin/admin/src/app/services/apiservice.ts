import { convertLegacyProps } from "antd/es/button";
import { colgroup } from "framer-motion/client";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:7890/api";

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

class ApiService {
  private baseURL: string;
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // generic request

  async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;

    // console.log("=== API REQUEST ===");
    const defaultOptions: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, {
        ...defaultOptions,
        ...options,
      });

      const text = await response.text();

      if (!response.ok) {
        console.error("Response not OK:", response.status);
        // try parse error payload if json
        try {
          const errJson = JSON.parse(text);
          console.error("Error JSON:", errJson);
          return {
            success: false,
            error: errJson?.error || `HTTP ${response.status}`,
          };
        } catch {
          return { success: false, error: `HTTP ${response.status}` };
        }
      }

      try {
        const data = text ? JSON.parse(text) : undefined;
        return { success: true, data } as ApiResponse<T>;
      } catch {
        console.error("Failed to parse JSON response");
        return { success: false, error: "Invalid JSON response" };
      }
    } catch (error) {
      console.error("API Request Error:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }
}

const apiService = new ApiService();
export default apiService;
export type { ApiResponse };
