import ApiClient from "./ApiClient";
import { LoginDataRequest } from "./schema";

export const userLogin = async (request: LoginDataRequest) => {
  console.log(request);
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
