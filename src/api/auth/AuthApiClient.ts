import BaseApiClient, { Tokens } from "../BaseApiClient";

export interface LoginData {
  username: string;
  password: string;
  isAutoLogin: boolean;
}
export interface RegisterData {
  username: string;
  password: string;
  name: string;
  mobileNumber: string;
  birthday: string;
  email: string;
}

export interface userUser {
  birthYear: string;
  birthday: string;
  createdAt: string;
  email: string;
  id: string;
  mobileNumber: string;
  name: string;
  type: string;
  username: string;
}

class AuthApiClient extends BaseApiClient {
  private static instance: AuthApiClient;

  public constructor(tokens?: Tokens) {
    super(import.meta.env.VITE_API_ROOT!, tokens);
  }

  public static getInstance() {
    if (this.instance == null) {
      this.instance = new AuthApiClient();
    }
    return this.instance;
  }

  public userLogin = (request: LoginData) =>
    this.axios.request({
      method: "POST",
      url: "/auth/signin",
      data: request,
    });

  public userRegister = (request: RegisterData) =>
    this.axios.request({
      method: "POST",
      url: `/auth/signup`,
      data: request,
    });

  public userCheckEmail = (request: string) =>
    this.axios.request({
      method: "GET",
      url: `/auth/check-email?email=${request}`,
      data: request,
    });

  public userCheckPhoneNumber = (request: string) =>
    this.axios.request({
      method: "GET",
      url: `/auth/check-mobile-number?mobileNumber=${request}`,
      data: request,
    });

  public userCheckUsername = (request: string) =>
    this.axios.request({
      method: "GET",
      url: `/auth/check-username?username=${request}`,
      data: request,
    });

  public userInfo = () =>
    this.axios.request<userUser>({
      method: "GET",
      url: `/users`,
    });
}

export default AuthApiClient;
