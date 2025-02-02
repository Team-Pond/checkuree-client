import BottomDrawer from '../../../../components/BottomDrawer';
import { useContext, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { searchAttendee } from '../../../../api v2/AttendeeApiClient';
import { GenderType } from '../../../../api v2/AttendeeSchema';
import { BookContext } from '@/context/BookContext';
import dayjs from 'dayjs';
import { twMerge } from 'tailwind-merge';
import { useRecordCreate } from '../querys';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

type IProps = {
  openFilter: boolean;
  onDrawerChange: () => void;
  attendanceBookId: number;
  currentDate: string;
}

export const BottomAddRecord = (props:IProps) => {
  const context = useContext(BookContext);

  const { bookId } = useParams();
  const { selectedBook } = context!;

  const {openFilter, onDrawerChange, attendanceBookId} = props;

  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<{
    id: number;
    name: string;
  } | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>("");

  const unsetSelectedStudent = () => {
    setSelectedStudent(null);
    setSelectedTime('');
  }

  const { mutate: recordMutation } = useRecordCreate({
    bookId: Number(bookId!),
    currentDate: props.currentDate,
  });

  // 수업 시간 슬롯 생성
  const slots = [];
  if (selectedBook?.availableFrom && selectedBook?.availableTo) {
    // availableFrom: 30분 단위로 내림 (floor)
    const availableFromTime = dayjs('2024-01-01 ' + selectedBook.availableFrom, 'HH:mm');
    const floor30From = availableFromTime.subtract(availableFromTime.minute() % 30);

    // availableTo: 30분 단위로 올림 (ceil)
    const availableToTime = dayjs('2024-01-01 ' + selectedBook.availableTo, 'HH:mm');
    const ceil30To = availableToTime.add(30 - (availableToTime.minute() % 30)).subtract(1, 'hour');

    for (let time = floor30From; !time.isAfter(ceil30To); time = time.add(30, 'minute')) {
      slots.push(time.format('HH:mm'));
    }
  }


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
        setSearch('')
        unsetSelectedStudent();
        onDrawerChange();
      }}
      children={
        <>
          <div className="flex flex-col gap-4 p-1 min-h-[300px] max-h-[80vh] overflow-y-auto">
            {/* 검색 입력창 */}
            {!selectedStudent &&(
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
              </div>)}

            {/* 검색 결과 리스트 */}
            {!selectedStudent ?
              (<div className="flex flex-col gap-2 max-h-[300px] overflow-y-auto"
                    onClick={() => {
                      // TODO : 화면을 변경해야함
                    }}>
                {
                  searchResults?.content?.length! > 0 ? (
                    searchResults!.content.map((student: {
                      id: number;
                      name: string,
                      age: number,
                      gender: GenderType
                    }) => (
                      <div
                        key={student.id}
                        className="py-1 px-2 flex gap-4"
                        onClick={() => {
                          setSelectedStudent({ id: student.id, name: student.name });
                        }}
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
                  )
                }
              </div>)
              : (
                // ⏳ 시간 선택 화면
                <div className="flex flex-col gap-4 max-h-[300px] overflow-y-auto pt-0">
                  <p className="text-m-bold text-text-primary text-left mt-0">수업 시간 선택 - {selectedStudent.name}</p>
                  <div className="grid grid-cols-4 gap-2">
                    {slots.map((time) => (
                      <button
                        key={time}
                        // twMerge : tailwindcss의 클래스를 합치는 함수
                        // 겹치는 건 삭제해줌, 겹치지 않는 건 중복 적용
                        className={twMerge(
                          "rounded-lg border border-[#d1d1d1] w-[61px] h-[33px] text-s-medium text-border-secondary-hover",
                          selectedTime === time
                            ? "border-border-brand text-text-brand"
                            : "text-border-secondary-hover"
                        )}
                        onClick={() => {
                          setSelectedTime(time);
                        }}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              )
            }
          </div>

          {/* 학생 선택 버튼 */}
          {selectedStudent && (
            <div className={`flex flex-row gap-2 p-4`}>
              <button
                className="w-full h-[54px] bg-gray-300 rounded-2xl text-l-semibold"
                onClick={() => {
                  unsetSelectedStudent()
                }}
              >
                이전으로
              </button>
              <button
                className="w-full h-[54px] bg-bg-tertiary text-[#f1f8f3] rounded-2xl text-l-semibold"
                onClick={async () => {
                  try {
                    recordMutation({
                      attendeeId: selectedStudent.id,
                      status: 'PENDING',
                      attendTime: selectedTime,
                    })
                    toast.success(`${selectedStudent.name} 학생의 스케쥴이 \n${selectedTime}에 추가되었습니다.`);
                    setSearch('')
                    unsetSelectedStudent();
                    onDrawerChange();
                  } catch (e) {
                    toast.error('출석 추가에 실패했습니다.');
                    console.error(e);
                  }
                }
                }
              >
                추가하기
              </button>
            </div>
          )}
        </>
      }
    />
  )
}