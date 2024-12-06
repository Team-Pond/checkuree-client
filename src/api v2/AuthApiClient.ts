// 인증 관련 API

import ApiClient from "./ApiClient";
import {
  SignInRequest,
  SignUpRequest,
  SignUpResponse,
  SignInResponse,
  RefreshRequest,
  RefreshResponse,
} from "./AuthSchema";

// 회원가입
export const SignUp = async (
  params: SignUpRequest
): Promise<SignUpResponse> => {
  const response = await ApiClient.request({
    method: "POST",
    url: "/auth/signup",
    params,
  });
  return response.data;
};

// 로그인
export const SignIn = async (
  params: SignInRequest
): Promise<SignInResponse> => {
  const response = await ApiClient.request({
    method: "POST",
    url: "/auth/signin",
    params,
  });
  return response.data;
};

// 리프레시
export const Refresh = async (
  params: RefreshRequest
): Promise<RefreshResponse> => {
  const response = await ApiClient.request({
    method: "POST",
    url: "/auth/refresh",
    params,
  });
  return response.data;
};
