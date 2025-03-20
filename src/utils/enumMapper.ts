import { CounsellingTopicType, CounsellingType } from "@/api/CounselSchema";
import { RelationType } from "@/api/type";

export const relationTypeToKor = (relationType: RelationType) => {
  switch (relationType) {
    case "FATHER":
      return "부";
    case "MOTHER":
      return "모";
    case "SIBLING":
      return "형제";
    case "NONE":
      return "관계";
    default:
      return "기타";
  }
};

export const counsellingTypeToKor = (counsellingType: CounsellingType) => {
  switch (counsellingType) {
    case "PHONE":
      return "전화 상담";
    case "VISIT":
      return "방문 상담";
    default:
      return "기타";
  }
};

export const counsellingTopicTypeToKor = (
  counsellingTopicType: CounsellingTopicType
) => {
  switch (counsellingTopicType) {
    case "FUTURE_PATH":
      return "진로 상담";
    case "STUDY_PROGRESS":
      return "진도 상담";
    case "PEER_RELATIONS":
      return "교우관계 상담";
    case "ETC":
      return "기타";
    default:
      return "기타";
  }
};
