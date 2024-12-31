import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getSubjectItems, getSubjects } from "@/api v2/CourseApiClient";
import { CourseData } from "@/api v2/AttendanceBookSchema";
import { twMerge } from "tailwind-merge";
import BottomDrawer from "@/components/BottomDrawer";

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

  const [courseTitle, setCourseTitle] = useState<string>("");

  const [selectedSubject, setSelectedSubject] = useState<{
    id: number;
    title: string;
  }>();

  const [selectedSubjectItems, setSelectedSubjectItems] = useState<
    { title: string; level: number }[]
  >([]);

  const { data: subjectItems } = useQuery({
    enabled: !!selectedSubject?.id,
    queryKey: ["subject-items", selectedSubject?.title],
    queryFn: async () =>
      await getSubjectItems({ subjectId: String(selectedSubject?.id) }).then(
        (res) => {
          if (res.status === 200) {
            return res.data;
          }
        }
      ),
  });

  const [openDrawer, setOpenDrawer] = useState<boolean>(false);

  const onDrawerChange = () => {
    setOpenDrawer(!openDrawer);
  };
  const handleBottomDrawer = (open: boolean) => {
    setOpenDrawer(open);
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

      {isCurriculum ? (
        <>
          {/* 커리큘럼 이름 */}
          <div className="flex flex-col gap-2">
            <div className="flex gap-1 items-center">
              <p className="font-bold text-m-medium">커리큘럼 이름</p>
              <p className="text-text-danger">*</p>
            </div>

            <input
              type="text"
              onChange={(e) => setCourseTitle(e.target.value)}
              placeholder="커리큘럼 이름"
              className="max-w-[342px] bg-white w-full h-12 border border-[#E7E7E7] rounded-xl p-4 outline-none text-m-medium text-text-secondary"
            />
          </div>
          {/* 커리큘럼 내용 */}
          <div className="flex flex-col gap-2">
            <div className="flex gap-1 items-center">
              <p className="font-bold text-m-medium">커리큘럼 내용</p>
              <p className="text-text-danger">*</p>
            </div>

            <div className="max-w-[343px] rounded-2xl py-1 px-2 text-left bg-bg-base">
              <ul>
                <li className="h-11 w-[326px] py-4 text-s-semibold text-text-primary">
                  <p className="ml-8 px-[2px]">올챙이(기본)</p>
                </li>
                {selectedSubjectItems.map((subjectItem) => {
                  return (
                    <li className="h-11 w-[326px] px-1 py-1 text-s-semibold text-text-primary flex justify-between">
                      <div className="flex items-center gap-1 justify-center">
                        <img
                          src={"/images/icons/book-create/ico-equal.svg"}
                          alt="이미지 추가 아이콘"
                          width={24}
                          height={24}
                          className=""
                        />
                        <p className="px-[2px] mt-[1px]">{subjectItem.title}</p>
                      </div>
                      <img
                        src="/images/icons/book-create/ico-close-gray.svg"
                        alt="닫기 아이콘"
                        width={32}
                        height={32}
                        onClick={() =>
                          setSelectedSubjectItems(
                            selectedSubjectItems.filter(
                              (item) => item.title !== subjectItem.title
                            )
                          )
                        }
                      />
                    </li>
                  );
                })}

                <div
                  onClick={() => handleBottomDrawer(true)}
                  className="h-11 w-[326px] text-s-semibold text-text-primary flex gap-[1px] justify-center items-center"
                >
                  <img
                    src={"/images/icons/book-create/ico-plus.svg"}
                    alt="이미지 추가 아이콘"
                    width={15}
                    height={15}
                    className=""
                  />
                  <p className="text-s-medium text-border-secondary-hover">
                    과목 추가하기
                  </p>
                </div>
              </ul>
            </div>
          </div>

          <button
            className={twMerge(
              "max-w-[341px] w-full h-[54px] flex justify-center items-center rounded-xl bg-bg-tertiary text-[#f1f8f3]"
            )}
            onClick={() => {
              handleCurriculumChange({
                courseTitle: courseTitle,
                courseContent: selectedSubjectItems,
              });
              setSelectedSubjectItems([]);
              handleCourseChange(courseData);
              handleCurriculum(false);
            }}
            type="button"
          >
            <p className="font-semibold text-lg">확인</p>
          </button>
        </>
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
      <BottomDrawer
        isOpen={openDrawer}
        onClose={onDrawerChange}
        children={
          <div className="flex flex-col gap-4 items-center">
            <div className="relative w-full">
              <input
                type="text"
                className="bg-bg-secondary rounded-lg w-full h-11 outline-none pl-11 text-m-bold text-border-secondary-hover"
                placeholder="과목 검색"
              />
              <img
                width={40}
                height={40}
                src={"/images/icons/book-roaster/ico-glasses.svg"}
                alt="이미지 추가 아이콘"
                className="absolute top-[2px] left-1"
                onClick={onDrawerChange}
              />
            </div>

            <div className="w-full max-w-[345px] h-[234px] flex bg-white ">
              <ul className="w-full max-w-[107px] overflow-y-scroll scrollbar-hide rounded-tl-lg">
                {subjects?.map((subject) => {
                  return (
                    <li
                      key={subject.id}
                      className={twMerge(
                        "bg-white h-[52px] flex items-center justify-center",
                        selectedSubject?.title === subject.title
                          ? "text-text-brand font-bold bg-bg-base"
                          : "text-text-primary text-m-medium"
                      )}
                      onClick={() => setSelectedSubject(subject)}
                    >
                      {subject.title}
                    </li>
                  );
                })}
              </ul>
              <ul className="w-full overflow-y-scroll bg-[#f6f6f6] px-[14px] rounded-tr-lg">
                {subjectItems?.map((subjectItem) => {
                  return (
                    <li
                      key={subjectItem.level}
                      className="h-[52px] flex items-center justify-between"
                    >
                      <p className="text-text-primary text-s-semibold">
                        {subjectItem.title}
                      </p>
                      <img
                        src="/images/icons/book-create/ico-plus.svg"
                        alt="플러스 아이콘"
                        width={19}
                        height={19}
                        onClick={() =>
                          setSelectedSubjectItems([
                            ...selectedSubjectItems,
                            {
                              title: subjectItem.title,
                              level: subjectItem.level,
                            },
                          ])
                        }
                      />
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        }
      />
    </form>
  );
}
