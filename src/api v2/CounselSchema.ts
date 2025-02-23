import { RelationType } from "./AttendeeSchema";

export enum CounsellingType {
  FUTURE_PATH = "진로 상담",
  STUDY_PROGRESS = "진도 상담",
  PEER_RELATIONS = "교우관계 상담",
  ETC = "기타",
}

type ResponseBase = {
  status: number;
  message: string;
};

// type SuccessResponse = ResponseBase & {
//   data: Record<string, unknown>;
// };

type ErrorResponse = ResponseBase & {
  data: Record<string, unknown>;
  timeStamp: string;
};

export type CounsellingListType = {
  counsellingId: number;
  counsellingType: string;
  counsellingTopicTypes: CounsellingType[];
  counsellingAt: Date;
  description: string;
  Counselee: {
    counseleeId: number;
    relationType: RelationType;
  };
  Counsellor: {
    counsellorId: number;
    name: string;
  };
};

export type CounsellingListRequest = {
  bookId: number;
  attendeeId: number;
};

export type CounsellingListResponse = {
  status: 200;
  data: CounsellingListType;
} & ErrorResponse;
