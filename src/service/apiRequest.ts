import { apiClient } from "./apiClient";

export const apiRequest = async <T = any>(
  url: string,
  config?: any,
): Promise<T> => {
  try {
    const response = await apiClient({
      method: "get",
      url,
      ...config,
    });
    return response.data;
  } catch (error) {
    console.error("API Request Error:", error);
    throw error;
  }
};
