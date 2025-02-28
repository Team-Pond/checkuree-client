import { useEffect, useState } from "react";

import { twMerge } from "tailwind-merge";
import BottomDrawer from "@/components/BottomDrawer";
import { useSubjectItems, useSubjects } from "../queries";
import { CourseData } from "@/api/type";

export type IProps = {
  handleCourseChange: (params: CourseData) => void;
  courseCreateParam: CourseData[];
  handleCurriculum: (state: boolean) => void;
  isCurriculum: boolean;
};

export type GradeItem = { level: number; subjectItemId: number; title: string };

export default function Step2(props: IProps) {
  const {
    handleCourseChange,
    courseCreateParam,
    handleCurriculum,
    isCurriculum,
  } = props;
  const { data: subjects } = useSubjects();
  const [courseTitle, setCourseTitle] = useState<string>("");

  const [selectedSubject, setSelectedSubject] = useState<{
    id: number;
    title: string;
  }>();

  const [selectedSubjectItems, setSelectedSubjectItems] = useState<GradeItem[]>(
    []
  );

  const { data: subjectItems } = useSubjectItems({
    subjectId: selectedSubject?.id!,
  });

  const [openDrawer, setOpenDrawer] = useState<boolean>(false);

  const onDrawerChange = () => {
    setOpenDrawer(!openDrawer);
  };
  const handleBottomDrawer = (open: boolean) => {
    setOpenDrawer(open);
  };

  useEffect(() => {
    if (subjects)
      setSelectedSubject({
        id: subjects[0].id,
        title: subjects[0].title,
      });
  }, [subjects]);

  const isCourseNameVaild =
    courseTitle.length > 0 && selectedSubjectItems.length > 0;

  const removeItemsAndAdjustLevels = (
    selectedSubjectItems: GradeItem[],
    targetIndex: number
  ): GradeItem[] =>
    selectedSubjectItems
      .filter((_, index) => index !== targetIndex) // targetIndex를 제외한 나머지 아이템 필터링
      .map((item, index) => ({
        ...item,
        level: index + 1,
      }));

  return (
    <>
      <div className="flex flex-col justify-center gap-6 max-w-[342px] w-full">
        {/* 커리큘럼 추가된 것 */}
        {courseCreateParam.map((course) => {
          return (
            <div className="border-t border-b border-[#f6f6f6] w-full h-16 flex justify-between items-center">
              <p className="text-m-bold text-text-primary pl-2">
                {course.title} <span className="text-text-danger">*</span>
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
                      <li
                        key={subjectItem.subjectItemId}
                        className="h-11 w-[326px] px-1 py-1 text-s-semibold text-text-primary flex justify-between"
                      >
                        <div className="flex items-center gap-1 justify-center">
                          <img
                            src={"/images/icons/book-create/ico-equal.svg"}
                            alt="이미지 추가 아이콘"
                            width={24}
                            height={24}
                            className=""
                          />
                          <p className="px-[2px] mt-[1px]">
                            {subjectItem.title}
                          </p>
                        </div>
                        <img
                          src="/images/icons/book-create/ico-close-gray.svg"
                          alt="닫기 아이콘"
                          width={32}
                          height={32}
                          onClick={() => {
                            const targetIndex = selectedSubjectItems.findIndex(
                              (item) =>
                                item.subjectItemId === subjectItem.subjectItemId
                            );
                            // 변경이 없는 경우
                            if (targetIndex === -1) return;
                            // 변경 사항이 있는 경우
                            const convertedItems = removeItemsAndAdjustLevels(
                              selectedSubjectItems,
                              targetIndex
                            );
                            setSelectedSubjectItems(convertedItems);
                          }}
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
                "max-w-[341px] w-full h-[54px] flex justify-center items-center rounded-xl bg-bg-tertiary text-[#f1f8f3]",
                isCourseNameVaild
                  ? "bg-bg-tertiary text-[#f1f8f3]"
                  : "bg-bg-disabled text-text-disabled"
              )}
              disabled={!isCourseNameVaild}
              onClick={() => {
                setSelectedSubjectItems([]);
                setCourseTitle("");
                handleCourseChange({
                  title: courseTitle,
                  isPrimary: true,
                  grades: selectedSubjectItems,
                });
                handleCurriculum(false);
              }}
              type="button"
            >
              <p className="font-semibold text-lg">확인</p>
            </button>
          </>
        ) : (
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
        )}
      </div>
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
                alt="검색 아이콘"
                className="absolute top-[2px] left-1"
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
                              subjectItemId: subjectItem.id,
                              level: selectedSubjectItems.length + 1,
                              title: subjectItem.title,
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
