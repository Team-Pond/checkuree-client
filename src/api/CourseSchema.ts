type ResponseBase = {
  message: string;
};

type ErrorResponse = ResponseBase & {
  status: 400 | 500 | 403;
  data: {};
  timeStamp: string;
};

export type GetSubjectResponse =
  | ({
      status: 200;
      data: {
        id: number;
        title: string;
      }[];
    } & ResponseBase)
  | ErrorResponse;

export type GetSubjectItemsRequest = {
  subjectId: string;
};

export type GetSubjectItemsResponse =
  | ({
      status: 200;
      data: {
        id: number;
        title: string;
        level: number;
      }[];
    } & ResponseBase)
  | ErrorResponse;

export type CreateCourseRequest = {
  attendanceBookId: string;
  courseParam: {
    title: string;
    isPrimary: boolean;
    gradeRequests: {
      subjectItemId: number;
      level: number;
    }[];
  }[];
};

export type CreateCourseResponse =
  | ({
      status: 200;
      data: {
        id: number;
      }[];
    } & ResponseBase)
  | ErrorResponse;
