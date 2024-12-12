import { twMerge } from "tailwind-merge";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Formik } from "formik";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { setTokens } from "../../lib/auth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { userLogin } from "../../api/AuthApiClient";

export interface LoginDataType {
  username: string;
  password: string;
  isAutoLogin: boolean;
}

const LoginSchema = z.object({
  username: z.string(),
  password: z.string(),
  isAutoLogin: z.boolean(),
});

const initailValues = {
  username: "",
  password: "",
  isAutoLogin: false,
};

export default function KakaoSignIn() {
  const accessToken = Cookies.get("ACCESS_TOKEN");

  const navigate = useNavigate();

  const { mutate: loginMutation } = useMutation({
    mutationKey: ["user"],
    mutationFn: async (params: LoginDataType) => await userLogin(params),
    onSuccess: (response) => {
      const token = response.data.accessToken;
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setTokens({
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
      });
      toast("로그인 되었습니다.");
      navigate("/attendances");
    },
    onError: () => {
      toast.error("아이디 및 비밀번호가 일치하지 않습니다.");
    },
  });

  useEffect(() => {
    if (accessToken) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    }
  }, []);

  return (
    <section className="flex flex-col justify-center items-center h-full gap-8 px-6">
      <div className="flex flex-col items-center gap-12">
        <img
          src={"/images/logos/checkuree_logo.svg"}
          width={284}
          height={48}
          alt="로고 이미지"
        />
        <div className="flex flex-col gap-8 justify-center w-full">
          <Formik
            onSubmit={(values: LoginDataType) => {
              loginMutation(values);
            }}
            validationSchema={toFormikValidationSchema(LoginSchema)}
            initialValues={initailValues}
          >
            {({ getFieldProps, isValid, dirty, handleSubmit }) => (
              <form
                className="flex flex-col gap-6 justify-center w-full"
                onSubmit={handleSubmit}
              >
                <div className="flex flex-col gap-4 w-full items-start">
                  <input
                    {...getFieldProps("username")}
                    placeholder="example@email.com"
                    className="bg-white w-full h-12 rounded-2xl p-4 border-[2px] focus:outline-none"
                  />
                  <input
                    {...getFieldProps("password")}
                    type="password"
                    placeholder="비밀번호"
                    className="bg-white w-full h-12 rounded-2xl p-4 border-[2px] focus:outline-none"
                  />
                  <div>
                    <p className="font-medium text-[#5D5D5D]">로그인 유지</p>
                  </div>
                </div>

                <button
                  className={twMerge(
                    "w-full h-[54px] rounded-xl text-lg leading-[22px] font-semibold flex items-center justify-center text-[#FFFFFF] bg-[#59996B] cursor-pointer",
                    !(isValid && dirty) ? "#D9D9D9" : "#59996B"
                  )}
                  disabled={!(isValid && dirty)}
                  type="submit"
                >
                  체쿠리 ID로 계속하기
                </button>

                <div className="flex justify-between">
                  <p className="text-xs leading-[15px] text-[#5D5D5D] font-semibold w-[114px]">
                    아이디 찾기
                  </p>
                  <p className="text-xs leading-[15px] text-[#5D5D5D] font-semibold border-x border-[#E7E7E7] w-[114px]">
                    회원 가입
                  </p>
                  <p className="text-xs leading-[15px]  text-[#5D5D5D]font-semibold w-[114px]">
                    비밀번호 찾기
                  </p>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>

      <img
        src={"/images/logos/checkuree_logo.svg"}
        alt=""
        style={{
          position: "absolute",
          bottom: 0,
        }}
      />
    </section>
  );
}
