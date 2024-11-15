import {
  Box,
  Button,
  Container,
  styled,
  TextField,
  Typography,
} from "@mui/material";
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
import { userLogin } from "../../api/AttendanceApiClient";

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
    <ContainerST>
      <StyledBoxST>
        <LoginTypographyST>
          <img
            src={"/images/logos/checkuree_logo.svg"}
            width={300}
            height={50}
            alt="로고 이미지"
          />
        </LoginTypographyST>

        <LoginFormBox>
          <Formik
            onSubmit={(values: LoginDataType) => {
              loginMutation(values);
            }}
            validationSchema={toFormikValidationSchema(LoginSchema)}
            initialValues={initailValues}
          >
            {({ getFieldProps, isValid, dirty, handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <LoginFormTextBox>
                  <TextField
                    {...getFieldProps("username")}
                    placeholder="아이디를 입력해주세요."
                    inputProps={TextFiledInputProps}
                  />
                  <TextField
                    {...getFieldProps("password")}
                    type="password"
                    placeholder="비밀번호를 입력해주세요."
                    inputProps={TextFiledInputProps}
                  />
                </LoginFormTextBox>

                <BoxSTLoginCommon>
                  <StyledCheckureeLoginButton
                    disabled={!(isValid && dirty)}
                    backgroundColor={
                      !(isValid && dirty) ? "#D9D9D9" : "#59996B"
                    }
                    type="submit"
                  >
                    체쿠리 로그인
                  </StyledCheckureeLoginButton>
                  <StyledKakaoLoginButton
                    onClick={() =>
                      navigate("https://checkuree.com/api/v1/auth/kakao")
                    }
                    backgroundColor=""
                  >
                    카카오 로그인
                  </StyledKakaoLoginButton>
                </BoxSTLoginCommon>
              </form>
            )}
          </Formik>
        </LoginFormBox>
      </StyledBoxST>

      <img
        src={"/images/logos/checkuree_logo.svg"}
        alt=""
        style={{
          position: "absolute",
          bottom: 0,
        }}
      />
    </ContainerST>
  );
}

const TextFiledInputProps = {
  style: {
    backgroundColor: "white",
    padding: "0px",
    width: "306px",
    height: "40px",
    borderRadius: "8px",
    border: "0px",
    paddingLeft: "12px",
  },
};

// Container에 대한 스타일
const ContainerST = styled(Container)(() => {
  return {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    gap: "32px",
  };
});

// Box에 대한 스타일
const StyledBoxST = styled(Box)(() => {
  return {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "28px",
  };
});

// Typography에 대한 스타일
const LoginTypographyST = styled(Typography)(() => {
  return {
    fontWeight: 600,
    fontSize: "32px",
    lineHeight: "43.58px",
  };
});

const LoginFormBox = styled(Box)(() => {
  return {
    display: "flex",
    flexDirection: "column",
    gap: "32px",
    justifyContent: "center",
  };
});
const LoginFormTextBox = styled(Box)(() => {
  return {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  };
});

const BoxSTLoginCommon = styled(Box)(() => {
  return {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  };
});

// 카카오 및 네이버 로그인 버튼 스타일
const StyledLoginButton = styled(Box)(
  ({ backgroundColor }: { backgroundColor: string | undefined }) => {
    return {
      width: "313px",
      height: "39px",
      borderRadius: "20px",
      fontSize: "14px",
      lineHeight: "19.07px",
      fontWeight: 600,
      textTransform: "none",
      display: "flex",
      color: "white",
      alignItems: "center",
      cursor: "pointer",
      justifyContent: "center",
      background: backgroundColor,
    };
  }
);

// 체쿠리 로그인 버튼의 색상
const StyledCheckureeLoginButton = styled(Button)(
  ({ backgroundColor }: { backgroundColor: string }) => {
    return {
      width: "313px",
      height: "39px",
      borderRadius: "20px",
      fontSize: "14px",
      lineHeight: "19.07px",
      fontWeight: 600,
      textTransform: "none",
      display: "flex",
      alignItems: "center",
      cursor: "pointer",
      justifyContent: "center",
      color: "white",
      backgroundColor,
      ":hover": {
        backgroundColor,
      },
    };
  }
);

// 카카오 로그인 버튼의 색상
const StyledKakaoLoginButton = styled(StyledLoginButton)(() => {
  return {
    color: "black",
    backgroundColor: "#fddc3f",
  };
});
