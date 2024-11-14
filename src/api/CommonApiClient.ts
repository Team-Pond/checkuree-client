import BaseApiClient, { Tokens } from "./BaseApiClient";

export interface ICommonResponse<T> {
  code: number;
  message: string;
  result?: T;
}

class CommonApiClient extends BaseApiClient {
  private static instance: CommonApiClient;

  public constructor(tokens?: Tokens) {
    super(import.meta.env.NEXT_PUBLIC_API_ROOT!, tokens);
  }

  public static getInstance() {
    if (this.instance == null) {
      this.instance = new CommonApiClient();
    }
    return this.instance;
  }

  public uploadImage = (request: FormData) =>
    this.axios.request({
      method: "GET",
      url: "/file/upload",
      data: request,
      headers: {
        "Content-Type": "multipart/fom-data",
      },
    });
}

export default CommonApiClient;
