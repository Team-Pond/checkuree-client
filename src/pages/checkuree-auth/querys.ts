import { useMutation } from "@tanstack/react-query";
import { LoginDataType } from "./SignIn";
import axios from "axios";
import { setTokens } from "@/lib/auth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { SignIn } from "@/api v2/AuthApiClient";

export const useAuthLogin = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["user"],
    mutationFn: async (params: LoginDataType) => await SignIn(params),
    onSuccess: (response) => {
      const accessToken = response.data.accessToken;
      const refreshToken = response.data.refreshToken;
      const token = response.data.accessToken;
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setTokens({
        accessToken: accessToken as string,
        refreshToken: refreshToken as string,
      });
      toast.success("로그인 되었습니다.");
      navigate("/");
    },
    onError: () => {
      toast.error("아이디 및 비밀번호가 일치하지 않습니다.");
    },
  });
};
