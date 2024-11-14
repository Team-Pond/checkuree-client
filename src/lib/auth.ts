import Cookies from "js-cookie";

interface Tokens {
  accessToken: string;
  refreshToken?: string;
}

export function setTokens(tokens: Tokens) {
  Cookies.set(
    import.meta.env.VITE_ACCESS_TOKEN_KEY ?? "ACCESS_TOKEN",
    tokens.accessToken
  );
  if (tokens.refreshToken) {
    Cookies.set(
      import.meta.env.VITE_REFRESH_TOKEN_KEY ?? "REFRESH_TOKEN",
      tokens.refreshToken
    );
  }
}
export function clearTokens() {
  Cookies.remove(import.meta.env.VITE_ACCESS_TOKEN_KEY ?? "ACCESS_TOKEN");
  Cookies.remove(import.meta.env.VITE_REFRESH_TOKEN_KEY ?? "REFRESH_TOKEN");
}
