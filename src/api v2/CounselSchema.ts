import { RelationType } from "./AttendeeSchema";

export enum CounsellingTopicType {
  FUTURE_PATH = "진로 상담",
  STUDY_PROGRESS = "진도 상담",
  PEER_RELATIONS = "교우관계 상담",
  ETC = "기타",
}

export enum CounsellingType {
  PHONE = "전화 상담",
  VISIT = "방문 상담",
}

export const counsellingTypeMapper = (type: CounsellingTopicType) => {};

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
  counsellingType: CounsellingType;
  counsellingTopicTypes: CounsellingTopicType[];
  counsellingAt: Date;
  description: string;
  counselee: {
    counseleeId: number;
    relationType: RelationType;
  };
  counsellor: {
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
  data: CounsellingListType[];
};
