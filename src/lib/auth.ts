import Cookies from "js-cookie";

interface Tokens {
  accessToken: string;
  refreshToken?: string;
}

export function setTokens(tokens: Tokens) {
  Cookies.set(
    import.meta.env.VITE_ACCESS_TOKEN_KEY ?? "accessToken",
    tokens.accessToken
  );
  if (tokens.refreshToken) {
    Cookies.set(
      import.meta.env.VITE_REFRESH_TOKEN_KEY ?? "refreshToken",
      tokens.refreshToken
    );
  }
}
export function clearTokens() {
  Cookies.remove(import.meta.env.VITE_ACCESS_TOKEN_KEY ?? "accessToken");
  Cookies.remove(import.meta.env.VITE_REFRESH_TOKEN_KEY ?? "refreshToken");
}
