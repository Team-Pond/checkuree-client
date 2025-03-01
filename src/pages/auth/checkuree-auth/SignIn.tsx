import { twMerge } from "tailwind-merge";
import axios from "axios";

import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { z } from "zod";

import { useAuthLogin } from "./queries";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import SEO from "@/components/SEO";

export interface LoginDataType {
  username: string;
  password: string;
  isAutoLogin: boolean;
}

const LoginSchema = z.object({
  username: z.string().min(1, "이메일을 입력하세요."),
  password: z.string().min(1, "비밀번호를 입력하세요."),
  isAutoLogin: z.boolean(),
});

const initailValues = {
  username: "dkandkdlel",
  // TODO: 테스트를 위한 임시 계정
  password: "test123123!!",
  isAutoLogin: false,
};

export default function CheckureeSignIn() {
  const accessToken = Cookies.get("accessToken");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const { mutate: loginMutation } = useAuthLogin();

  useEffect(() => {
    if (accessToken) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    }
  }, []);

  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(LoginSchema),
    mode: "onSubmit",
    defaultValues: initailValues,
  });
  return (
    <section className="flex flex-col justify-center items-center gap-8 px-6 h-full">
      <SEO
        title="체쿠리 | 출석부 로그인"
        content="체쿠리 음악학원 출석부 서비스의 사내 로그인 페이지입니다."
      />
      <div className="flex flex-col items-center gap-12">
        <img
          src={"/images/logos/checkuree_logo.svg"}
          width={284}
          height={48}
          alt="로고 이미지"
        />
        <div className="flex flex-col gap-8 justify-center w-full">
          <form
            className="flex flex-col gap-6 justify-center w-full"
            onSubmit={handleSubmit(() => {
              loginMutation({
                username: getValues("username"),
                password: getValues("password"),
                isAutoLogin: getValues("isAutoLogin"),
              });
            })}
          >
            <div className="flex flex-col gap-4 w-full items-start">
              <div className="flex flex-col gap-[1px] w-full text-left">
                <input
                  {...register("username")}
                  value={getValues("username")}
                  placeholder="example@email.com"
                  className="bg-white w-full h-12 rounded-2xl p-4 border-[2px] focus:outline-none"
                />
                {errors.username && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.username.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-[1px] w-full text-left">
                <div className="relative flex items-center w-full">
                  <input
                    {...register("password")}
                    value={getValues("password")}
                    type={showPassword ? "text" : "password"}
                    placeholder="비밀번호"
                    className="bg-white w-full h-12 rounded-2xl p-4 border-[2px] focus:outline-none"
                  />
                  <img
                    className="absolute right-4"
                    src={`/images/icons/ico-${
                      showPassword ? "visible" : "invisible"
                    }-eye.svg`}
                    width={24}
                    height={24}
                    alt="로그인 유지 체크"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                </div>

                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div className="flex gap-1 items-center">
                <img
                  src="/images/icons/ico-check-active.svg"
                  width={20}
                  height={20}
                  alt="로그인 유지 체크"
                />

                <p className="font-medium text-[#5D5D5D]">로그인 유지</p>
              </div>
            </div>

            <button
              className={twMerge(
                "w-full h-[54px] rounded-xl text-lg leading-[22px] font-semibold flex items-center justify-center text-[#FFFFFF] bg-[#59996B] cursor-pointer"
              )}
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
              <p className="text-xs leading-[15px] text-[#5D5D5D] font-semibold w-[114px]">
                비밀번호 찾기
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
