import React from 'react';

interface IProps {
  counselType:string;
  counselSubjects:string[];
  counsellee:string;
}
const CounselList = (args:IProps) => {
  return (
    <div className="w-full rounded-2xl text-left bg-white p-4 flex flex-col gap-5">
      <p className="flex text-s-bold text-[#5d5d5d]">
        상담 내역 <img src="" alt="" />
      </p>
      <p className="text-m-semibold text-text-primary">2024.12.31</p>

      <div className="flex flex-col space-y-1">
        <div className="flex items-center text-sm">
          <p className="text-text-tertiary w-24">유형</p>
          <p className="text-text-primary">{args.counselType}</p>
        </div>
        <div className="flex items-center text-sm">
          <p className="text-text-tertiary w-24">주제</p>
          <p className="text-text-primary">{args.counselSubjects.join(', ')}</p>
        </div>
        <div className="flex items-center text-sm">
          <p className="text-text-tertiary w-24">상담자</p>
          <p className="text-text-primary">{args.counsellee}</p>
        </div>
      </div>
    </div>
  );
};

export default CounselList;