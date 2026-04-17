import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";
import { apiRequest } from "../service/apiRequest";

export const useApi = <T>(
  keys: string[],
  url: string,
  options?: Omit<UseQueryOptions<T, Error>, "queryKey" | "queryFn">,
): UseQueryResult<T, Error> => {
  return useQuery<T, Error>({
    queryKey: keys,
    queryFn: () => apiRequest<T>(url),
    ...options,
  });
};
