type ResponseBase = {
  message: string;
};

type ErrorResponse = ResponseBase & {
  status: 400 | 500 | 403;
  data: {};
  timeStamp: string;
};

export type UploadImageResponse = ({
  status: 200;
  data: UploadImageDataType;
} & ResponseBase)
  | ErrorResponse;


export type UploadImageRequest = {
  file: File;
  bookId?: number;
};

export type UploadImageDataType = {
  url: string;
};
