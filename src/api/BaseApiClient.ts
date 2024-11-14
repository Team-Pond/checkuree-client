import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import Cookies from "js-cookie";
import { clearTokens, setTokens } from "../lib/auth";

export type Tokens = {
  accessToken: string;
  refreshToken: string;
};

class BaseApiClient {
  protected axios: AxiosInstance;

  private tokens?: Tokens;

  public constructor(baseURL: string, tokens?: Tokens) {
    this.tokens = tokens;
    this.axios = axios.create({
      baseURL,
      headers: {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
        Authorization: `Bearer ${this.tokens?.accessToken}`,
      },
    });

    this.axios.interceptors.request.use(async (config) => {
      const accessToken = this.getAccessToken();
      config.headers.Authorization = `Bearer ${accessToken}`;

      return config;
    });

    this.axios.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        const {
          status,
          statusText,
          data,
          request: { responseURL },
        } = error.response;
        console.error(
          `API Error => responseURL : ${responseURL} status:${status} statusText:${statusText} data:${JSON.stringify(
            data
          )}`
        );

        const accessToken = Cookies.get("ACCESS_TOKEN");

        if (accessToken != null && status === 401) {
          // 토큰 만료 혹은 인증 실패 시
          return this.refresh(error.config);
        }

        if (status === 401) {
          error.config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return Promise.reject(error);
      }
    );
  }

  // 기본 access 토큰이 설정되어 있지 않다면 브라우저 쿠키에서 가져온다.
  public getAccessToken(): string | undefined {
    if (this.tokens?.accessToken) {
      return this.tokens.accessToken;
    }
    if (typeof window !== "undefined") {
      return Cookies.get(
        import.meta.env.VITE_ACCESS_TOKEN_KEY ?? "ACCESS_TOKEN"
      );
    }
  }

  // 기본 refresh 토큰이 설정되어 있지 않다면 브라우저 쿠키에서 가져온다.
  public getRefreshToken(): string | undefined {
    if (this.tokens?.refreshToken) {
      return this.tokens.refreshToken;
    }
    if (typeof window !== "undefined") {
      return Cookies.get(
        import.meta.env.VITE_REFRESH_TOKEN_KEY ?? "REFRESH_TOKEN"
      );
    }
  }

  /**
   * 리프레시 및 요청을 다시 시도한다.
   */
  private async refresh(config: AxiosRequestConfig) {
    const refreshToken = this.getRefreshToken();

    if (refreshToken != null) {
      try {
        const refreshResult = await axios.request({
          baseURL: import.meta.env.VITE_API_ROOT,
          url: "/auth/refresh-token",
          method: "POST",
          data: {
            refreshToken,
          },
        });

        // 토큰 재발급 성공시
        setTokens({
          accessToken: refreshResult.data.data!.accessToken,
          refreshToken: refreshResult.data.data!.refreshToken,
        });

        // 무한 오류에 빠질 수 있음으로 순수한 axios 기본 인스턴스로 재시도한다.
        return axios.request({
          ...config,
          headers: {
            ...config.headers,
            Authorization: `Bearer ${refreshResult.data.data!.accessToken}`,
          },
        });
      } catch (error) {
        console.error("[Refresh error]", error);
      }
    }

    // refresh 토큰 없을 시 / 토큰 갱신 실패 시 로그아웃한다.
    if (typeof window !== "undefined") {
      clearTokens();
      if (window.location.pathname !== "/auth/signin") {
        window.location.replace("/auth/signin");
      }
    }

    return Promise.reject(new Error("로그인을 연장할 수 없습니다."));
  }
}

export default BaseApiClient;
