import BottomDrawer from '../../../../components/BottomDrawer';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { searchAttendee } from '../../../../api v2/AttendeeApiClient';
import { GenderType } from '../../../../api v2/AttendeeSchema';

type IProps = {
  openFilter: boolean;
  onDrawerChange: () => void;
  attendanceBookId: number;
}

export const BottomAddRecord = (props:IProps) => {
  const {openFilter, onDrawerChange, attendanceBookId} = props;

  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  // 디바운싱 적용
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300); // 300ms 디바운싱 적용

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

// 검색 API 호출
  const { data: searchResults } = useQuery({
    queryKey: ['searchAttendee', debouncedSearch],
    queryFn: async () => {
      if (debouncedSearch.length > 0) {
        return await searchAttendee({
          attendanceBookId, // 실제 bookId를 넘겨야 함
          name: debouncedSearch,
        }).then((res) => res.data);
      }
    },
    enabled: debouncedSearch.length > 0, // 1글자 이상 입력되었을 때만 실행
  });

  return (
    <BottomDrawer
      isOpen={openFilter}
      onClose={() => {
        setSearch('');
        onDrawerChange();
      }}
      children={
        <>
          <div className="flex flex-col gap-4 p-4 min-h-[350px] max-h-[80vh] overflow-y-auto">
            {/* 검색 입력창 */}
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
                src={'/images/icons/book-roaster/ico-glasses.svg'}
                alt="input placeholder 아이콘"
                className="absolute top-[2px] left-1"
              />
            </div>

            {/* 검색 결과 리스트 */}
            <div className="flex flex-col gap-2 max-h-[300px] overflow-y-auto">
              {searchResults?.content?.length! > 0 ? (
                searchResults!.content.map((student: { id: number; name: string,age:number,gender:GenderType }) => (
                  <div
                    key={student.id}
                    className="py-1 px-2 flex gap-4"
                    onClick={() =>{}}
                  >
                    <img
                      src="/images/icons/book-roaster/ico-student.svg"
                      alt="학생 아이콘"
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div className="flex items-center gap-2 text-left">
                      <div className="flex gap-2">
                        <p className="text-m-bold text-text-primary">
                          {student.name}
                        </p>
                        <p className="text-m-semibold text-text-secondary">
                          {student.age + '세'}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                debouncedSearch.length > 0 && (
                  <p className="text-gray-500 text-center">검색 결과가 없습니다.</p>
                )
              )}
            </div>


          </div>
          {/* 학생 선택 버튼 */}
          <button
            className="w-full h-[54px] bg-bg-tertiary text-[#f1f8f3] rounded-2xl text-l-semibold"
            onClick={onDrawerChange}
          >
            학생 선택
          </button>
        </>
      }
    />
  )
}