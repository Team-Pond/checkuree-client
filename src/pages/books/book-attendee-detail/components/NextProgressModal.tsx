import React from "react";
import { useBookCourses } from "../queries";
import useProgressFormStore from "@/store/progressStore";

interface Props {
  bookId: number;
}

const NextProgressModal: React.FC<Props> = ({ bookId }) => {
  const { formData, updateFormData } = useProgressFormStore();
  const { data: bookCourses } = useBookCourses({
    bookId: String(bookId),
    openDrawer: true, // 모달이 열렸으니 true 처리
  });

  // 각 과정의 등급 리스트 합치기
  const totalBookGrades: any[] = [];
  bookCourses?.courses.forEach((course) => {
    totalBookGrades.push(...course.grades);
  });

  const handleDateChange = (
    key: "completeAt" | "startAt",
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    let input = e.target.value.replace(/\D/g, "");

    if (input.length > 8) {
      input = input.slice(0, 8);
    }

    if (input.length >= 5) {
      input = input.slice(0, 4) + "." + input.slice(4);
    }

    if (input.length >= 8) {
      input = input.slice(0, 7) + "." + input.slice(7);
    }
    updateFormData(key, input);
  };

  return (
    <div className="flex flex-col gap-6 justify-center items-center w-full">
      <div className="flex flex-col gap-2 w-full">
        <div className="flex gap-1 items-center">
          <p className="font-bold text-m-medium">과정 종료일</p>
          <p className="text-text-danger">*</p>
        </div>
        <input
          type="text"
          placeholder="YYYY.MM.DD"
          className="outline-none bg-white border border-[#E7E7E7] rounded-xl w-full h-12 flex items-center pl-4"
          value={formData.completeAt}
          onChange={(e) => handleDateChange("completeAt", e)}
        />
      </div>
      <div className="flex flex-col gap-2 w-full">
        <div className="flex gap-1 items-center">
          <p className="font-bold text-m-medium">다음 과정 선택</p>
          <p className="text-text-danger">*</p>
        </div>
        <select
          value={formData.nextGradeId}
          onChange={(e) => updateFormData("nextGradeId", e.target.value)}
          className="outline-none bg-white border border-[#E7E7E7] rounded-xl w-full h-12 pl-4 text-m-medium"
        >
          <option value="">과정을 선택하세요</option>
          {(bookCourses?.courses.flatMap((course) => course.grades) || []).map(
            (grade) => (
              <option key={grade.id} value={grade.id}>
                {grade.title}
              </option>
            )
          )}
        </select>
      </div>
      <div className="flex flex-col gap-2 w-full">
        <div className="flex gap-1 items-center">
          <p className="font-bold text-m-medium">다음 과정 시작일</p>
          <p className="text-text-danger">*</p>
        </div>
        <input
          type="text"
          placeholder="YYYY.MM.DD"
          className="outline-none bg-white border border-[#E7E7E7] rounded-xl w-full h-12 flex items-center pl-4"
          value={formData.startAt}
          onChange={(e) => handleDateChange("startAt", e)}
        />
      </div>
    </div>
  );
};

export default NextProgressModal;
