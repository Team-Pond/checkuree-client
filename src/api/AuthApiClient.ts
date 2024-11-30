import ApiClient from "./ApiClient";
import { LoginDataRequest, UseApiProps } from "./schema";

// Singleton BaseApi
export const useFetch = async ({ url, method, data }: UseApiProps) => {
  const response = await ApiClient.request({
    url,
    method,
    data,
    baseURL: import.meta.env.VITE_VITE_API_ROOT,
  });

  return response.data;
};

export const userLogin = async (request: LoginDataRequest) => {
  const response = await ApiClient.request({
    method: "POST",
    url: "/auth/signin",
    data: request,
  });
  return response.data;
};

export const userInfo = async () => {
  const response = await ApiClient.request({
    method: "GET",
    url: `/users`,
  });

  return response.data;
};
