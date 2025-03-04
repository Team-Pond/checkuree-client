import { RelationType } from "./type";
import CounsellingCreate from "../pages/books/book-attendee-detail/components/counsel/CounsellingCreate";

export type CounsellingTopicType =
  | "FUTURE_PATH"
  | "STUDY_PROGRESS"
  | "PEER_RELATIONS"
  | "ETC";

export type CounsellingType = "PHONE" | "VISIT";

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

export type CounsellingCreateRequest = {
  attendanceBookId: number;
  counsellingId: number;
  counseleeId: number;
  tpye: CounsellingType;
  topics: CounsellingTopicType[];
  counsellingAt: Date;
  description: string;
};

export type CounsellingCreateResponse =
  | {
      status: 200;
      data: {
        id: number;
      };
    }
  | ErrorResponse;
