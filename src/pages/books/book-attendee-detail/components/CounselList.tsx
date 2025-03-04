import React from "react";

import {
  counsellingTopicTypeToKor,
  counsellingTypeToKor,
  relationTypeToKor,
} from "../../../../utils/enumMapper";
import { format } from "date-fns";
import { useNavigate, useParams } from "react-router-dom";
import { RelationType } from "@/api/type";
import { CounsellingTopicType, CounsellingType } from "@/api/CounselSchema";

interface IProps {
  counselType: CounsellingType;
  counselSubjects: CounsellingTopicType[];
  counselleeType: RelationType;
  counsellingAt: Date;
}
const CounselList = (args: IProps) => {
  const navigate = useNavigate();

  const { bookId, attendeeId } = useParams();

  const { counselType, counselleeType, counsellingAt, counselSubjects } = args;
  const slicedSubjects = [];
  for (let i = 0; i < counselSubjects.length; i += 2) {
    slicedSubjects.push(counselSubjects.slice(i, i + 2));
  }

  return (
    <div className="w-full rounded-2xl text-left bg-white p-4 flex flex-col gap-5">
      <p className="flex text-s-bold text-[#5d5d5d]">
        상담 내역 <img src="" alt="" />
      </p>
      <p className="text-m-semibold text-text-primary">
        {format(counsellingAt, "yyyy.MM.dd")}
      </p>
      <div className="flex flex-col space-y-1">
        <div className="flex items-center text-sm">
          <p className="text-text-tertiary w-24">유형</p>
          <p className="text-text-primary">
            {counsellingTypeToKor(counselType)}
          </p>
        </div>
        <div className="flex flex-row text-sm">
          <p className="text-text-tertiary w-24 items-baseline">주제</p>
          <div className="flex flex-col">
            {counselSubjects
              .reduce<CounsellingTopicType[][]>((acc, cur) => {
                if (!acc.length || acc[acc.length - 1].join(", ").length >= 17)
                  acc.push([]); // 길이가 17이 넘어가는 경우 줄 띄우기
                acc[acc.length - 1].push(cur);
                return acc;
              }, [])
              .map((subjects) => {
                return (
                  <p className="break-keep text-left">
                    {subjects
                      .map((subject) => counsellingTopicTypeToKor(subject))
                      .join(", ")}
                  </p>
                );
              })}
          </div>
        </div>
        <div className="flex items-center text-sm">
          <p className="text-text-tertiary w-24">상담자</p>
          <p className="text-text-primary">
            {relationTypeToKor(counselleeType)}
          </p>
        </div>
      </div>
      <div className="fixed bottom-11 ml-[250px] max-w-[390px] w-full">
        <button
          onClick={() => {
            navigate(`/book/${bookId}/attendee/${attendeeId}/counselling`);
          }}
          className="w-[90px] h-[46px] rounded-full flex gap-2 justify-center items-center bg-bg-tertiary"
        >
          <img
            src="/images/icons/book/ico-plus.svg"
            alt="플러스 아이콘"
            width={16}
            height={16}
          />
          <p className="text-white font-semibold text-lg">상담</p>
        </button>
      </div>
    </div>
  );
};

export default CounselList;
