import { useState } from "react";
import { useForm } from "react-hook-form";

import { useMutation, useQuery } from "@tanstack/react-query";
import { getSubjects } from "@/api v2/CourseApiClient";
import CurriculumForm from "./Step2Form";
import { CourseData } from "@/api v2/AttendanceBookSchema";
import { twMerge } from "tailwind-merge";

export type IProps = {
  handleCourseChange: (params: CourseData[]) => void;
  handleStep2Change: (state: boolean) => void;
};
export default function Step2(props: IProps) {
  const { handleStep2Change, handleCourseChange } = props;

  const { handleSubmit } = useForm<CourseData[]>({
    mode: "onBlur", // 폼이벤트 유효성 검사 트리거
  });
  const [isCurriculum, setIsCurriculum] = useState<boolean>(true);
  const [courseData, setCourseData] = useState<CourseData[]>([]);
  const handleCurriculumChange = (newCourseData: CourseData) => {
    setCourseData([...courseData, newCourseData]);
  };
  const { data: subjects } = useQuery({
    queryKey: ["subjects"],
    queryFn: async () =>
      await getSubjects().then((res) => {
        if (res.status === 200) return res.data;
      }),
  });
  const { mutate: courseMutation } = useMutation({
    mutationKey: [""],
    mutationFn: async () => {},
    onSuccess: () => {},
  });

  const handleCurriculum = (state: boolean) => {
    setIsCurriculum(state);
  };

  return (
    <form
      onSubmit={handleSubmit(() => {
        courseMutation();
      })}
      className="flex flex-col justify-center gap-6 max-w-[342px] w-full"
    >
      {/* 커리큘럼 추가된 것 */}
      {courseData.map((course) => {
        return (
          <div className="border-t border-b border-[#f6f6f6] w-full h-16 flex justify-between items-center">
            <p className="text-m-bold text-text-primary pl-2">
              {course.courseTitle} <span className="text-text-danger">*</span>
            </p>
            <img
              src={"/images/icons/book-create/ico-right-arrow.svg"}
              alt="이미지 추가 아이콘"
              width={32}
              height={32}
              className=""
            />
          </div>
        );
      })}

      {isCurriculum && (
        <CurriculumForm
          handleCurriculumChange={handleCurriculumChange}
          handleCurriculum={handleCurriculum}
          subjects={subjects!}
        />
      )}

      {isCurriculum ? (
        <button
          className={twMerge(
            "max-w-[341px] w-full h-[54px] flex justify-center items-center rounded-xl bg-bg-tertiary text-[#f1f8f3]"
          )}
          onClick={() => {
            // handleCurriculumChange({
            //   courseTitle: courseTitle,
            //   courseContent: selectedSubjectItems,
            // });
            // setSelectedSubjectItems([]);
            handleCurriculum(false);
          }}
          type="button"
        >
          <p className="font-semibold text-lg">확인</p>
        </button>
      ) : (
        <>
          <button
            className="w-full h-10 flex justify-center items-center bg-bg-secondary"
            onClick={() => handleCurriculum(true)}
          >
            <img
              src={"/images/icons/book-create/ico-plus.svg"}
              alt="이미지 추가 아이콘"
              width={24}
              height={24}
            />
            <p className="text-m-medium text-[#B0B0B0]">커리큘럼 추가하기 </p>
          </button>
          <div className="flex gap-4">
            <button
              onClick={() => handleStep2Change(false)}
              className="w-full h-[54px] flex justify-center items-center rounded-2xl bg-bg-secondary text-text-secondary text-l-semibold"
            >
              이전으로
            </button>
            <button className="w-full h-[54px] flex justify-center items-center rounded-2xl bg-bg-tertiary text-[#F1F8F3] text-l-semibold">
              생성하기
            </button>
          </div>
        </>
      )}
    </form>
  );
}
