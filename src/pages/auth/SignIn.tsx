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

export default function SignIn() {
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
    <section className="flex flex-col justify-center items-center h-full gap-8">
      <div className="flex flex-col items-center gap-7">
        <img
          src={"/images/logos/checkuree_logo.svg"}
          width={300}
          height={50}
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
                className="flex flex-col gap-8 justify-center w-full"
                onSubmit={handleSubmit}
              >
                <div className="flex flex-col gap-3 w-full">
                  <input
                    {...getFieldProps("username")}
                    placeholder="아이디를 입력해주세요."
                    className="bg-white w-full h-10 rounded-lg pl-3 border"
                  />
                  <input
                    {...getFieldProps("password")}
                    type="password"
                    placeholder="비밀번호를 입력해주세요."
                    className="bg-white  w-full h-10 rounded-lg pl-3 border"
                  />
                </div>

                <div className="flex flex-col gap-[10px]">
                  <button
                    className={twMerge(
                      "max-w-[313px] h-10 rounded-[20px] text-md font-semibold flex items-center justify-center text-white bg-[#59996B] cursor-pointer",
                      !(isValid && dirty) ? "#D9D9D9" : "#59996B"
                    )}
                    disabled={!(isValid && dirty)}
                    type="submit"
                  >
                    체쿠리 로그인
                  </button>
                  <button
                    onClick={() =>
                      navigate("https://checkuree.com/api/v1/auth/kakao")
                    }
                    className="max-w-[313px] h-10 rounded-[20px] text-md font-semibold flex items-center justify-center text-[#3A1D1D] cursor-pointer bg-[#FDDC3F]"
                  >
                    카카오 로그인
                  </button>
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
