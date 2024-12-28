import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { CourseData } from "./Step2";
import BottomDrawer from "@/components/BottomDrawer";
import { useQuery } from "@tanstack/react-query";
import { getSubjectItems } from "@/api v2/CourseApiClient";

type IProps = {
  handleCurriculumChange: (newCourseData: CourseData) => void;
  handleCurriculum: (state: boolean) => void;
  subjects: {
    id: number;
    title: string;
  }[];
};
export default function Step2Form(props: IProps) {
  const { handleCurriculumChange, subjects, handleCurriculum } = props;
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
                <li className="h-11 w-[326px] px-1 py-4 text-s-semibold text-text-primary flex items-center gap-1">
                  <img
                    src={"/images/icons/book-create/ico-plus.svg"}
                    alt="이미지 추가 아이콘"
                    width={24}
                    height={24}
                    className=""
                  />
                  <p className="px-[2px]">{subjectItem.title}</p>
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
          handleCurriculum(false);
        }}
        type="button"
      >
        <p className="font-semibold text-lg">확인</p>
      </button>
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
                        src="/images/icons/book-roaster/ico-plus-black.svg"
                        alt="플러스 아이콘"
                        width={24}
                        height={24}
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
    </>
  );
}
