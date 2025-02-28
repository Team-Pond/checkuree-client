import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { GenderType } from "@/api/type";
import { searchAttendee } from "@/api/AttendeeApiClient";

interface Props {
  attendanceBookId: number;
  onSelectStudent: (student: { id: number; name: string }) => void;
  search: string;
  setSearch: (search: string) => void;
}

export const StudentSearchView = ({
  attendanceBookId,
  onSelectStudent,
  search,
  setSearch,
}: Props) => {
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // 디바운싱 적용
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(handler);
  }, [search]);

  // 학생 검색 API 호출
  const { data: searchResults } = useQuery({
    queryKey: ["searchAttendee", debouncedSearch],
    queryFn: async () => {
      if (debouncedSearch.length > 0) {
        return await searchAttendee({
          attendanceBookId,
          name: debouncedSearch,
        }).then((res) => res.data);
      }
    },
    enabled: debouncedSearch.length > 0,
  });

  return (
    <div className="flex flex-col gap-2 max-h-[300px] overflow-y-auto pt-0 h-full">
      {/* 검색 입력창 */}
      <p className="text-m-bold text-left">인원 추가</p>
      <div className="relative">
        <input
          type="text"
          placeholder="학생 검색"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-bg-secondary rounded-lg w-full h-11 outline-none pl-11 text-m-bold"
        />
        <img
          width={40}
          height={40}
          src={"/images/icons/book-roaster/ico-glasses.svg"}
          alt="input placeholder 아이콘"
          className="absolute top-[2px] left-1"
        />
      </div>

      {/* 검색 결과 리스트 */}
      {searchResults?.content?.length
        ? searchResults.content.map(
            (student: {
              id: number;
              name: string;
              age: number;
              gender: GenderType;
            }) => (
              <div
                key={student.id}
                className="py-1 px-2 flex gap-4 cursor-pointer"
                onClick={() => onSelectStudent(student)}
              >
                <img
                  src="/images/icons/book-roaster/ico-student.svg"
                  alt="학생 아이콘"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div className="flex items-center gap-2 text-left">
                  <p className="text-m-bold text-text-primary">
                    {student.name}
                  </p>
                  <p className="text-m-semibold text-text-secondary">
                    {student.age}세
                  </p>
                </div>
              </div>
            )
          )
        : debouncedSearch.length > 0 && (
            <p className="text-gray-500 text-center">검색 결과가 없습니다.</p>
          )}
    </div>
  );
};
