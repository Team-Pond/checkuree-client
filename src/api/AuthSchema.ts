type ResponseBase = {
  status: number;
  message: string;
};

type SuccessResponse = ResponseBase & {
  data: Record<string, unknown>;
};

type ErrorResponse = ResponseBase & {
  data: Record<string, unknown>;
  timeStamp: string;
};

export type SignUpRequest = {
  username: string;
  password: string;
  email: string;
  name: string;
};

export type SignUpResponse = SuccessResponse | ErrorResponse;

export type SignInRequest = {
  username: string;
  password: string;
  isAutoLogin: boolean;
};
export type SignInResponse =
  | (SuccessResponse & {
      data: {
        accessToken: string;
        refreshToken: string;
      };
    })
  | ErrorResponse;

export type RefreshRequest = {
  refreshToken: string;
};

export type RefreshResponse = SuccessResponse | ErrorResponse;
