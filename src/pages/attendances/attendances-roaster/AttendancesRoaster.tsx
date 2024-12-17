import { useEffect, useState } from "react";

// Next
import { useNavigate, useParams } from "react-router-dom";

// Utils
import _ from "lodash";
import dayjs from "dayjs";

// Calendar
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import "dayjs/locale/ko";

// Api
import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";

// Components

import { dateFormat } from "../../../utils";
import { Colors, Icons } from "../../../styles/globalStyles";
import Icon from "../../../components/Icon";
import InfiniteCheckComp from "../../../components/InfiniteCheckComp";
import AttendanceItem from "../../../components/AttendanceItem";
import {
  createRecords,
  getAttendanceDetail,
  getAttendanceSchedulesByDate,
  getAttendanceSummaryByDate,
} from "../../../api/AttendanceApiClient";
import {
  Attendance,
  AttendanceSchedulesByDateItem,
  AttendanceSchedulesByDateItemObj,
  CreateRecordsRequest,
} from "../../../api/schema";
import Navigation from "../../../components/Navigation";
import PageContainer from "../../../components/PageContainer";

export type HandleListItemType = (
  index: number,
  time: string,
  field: string,
  value: string | boolean
) => void;

export type ParsedAttendeeListType = Record<
  string,
  AttendanceSchedulesByDateItem[]
>;

const AttendancesRoaster = () => {
  const { id: attendanceId } = useParams();
  const navigate = useNavigate();

  const today = dateFormat(new Date(), "dash");

  const [totalCount, setTotalCount] = useState(0);
  const [selectedDate, setSelectedDate] = useState<string>(today);
  const [attendeeList, setAttendeeList] = useState<ParsedAttendeeListType>({});

  const handlePrevDay = () => {
    setSelectedDate(() =>
      dateFormat(
        new Date(
          new Date(selectedDate).setDate(new Date(selectedDate).getDate() - 1)
        ),
        "dash"
      )
    );
  };
  const handleNextDay = () => {
    setSelectedDate(() =>
      dateFormat(
        new Date(
          new Date(selectedDate).setDate(new Date(selectedDate).getDate() + 1)
        ),
        "dash"
      )
    );
  };

  const queryClient = useQueryClient();

  // 출석대상 명단 조회
  const {
    data: attendance,
    isLoading,
    isSuccess,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["attendanceToday", attendanceId, selectedDate],
    queryFn: async ({
      pageParam,
    }): Promise<AttendanceSchedulesByDateItemObj> => {
      const response = await getAttendanceSchedulesByDate({
        attendanceId,
        date: selectedDate,
        pageNo: pageParam.pageNo,
      });
      if (_.has(response, "items")) {
        const result: AttendanceSchedulesByDateItemObj = response.items[0];

        setTotalCount(response.count);

        for (const key in result) {
          if (result.hasOwnProperty(key)) {
            result[key].forEach((item) => {
              const records = item.attendee.records[0];
              item.status = records?.status ?? "";
              item.newStatus = "";
              item.lateTime = records?.lateTime ?? "";
              item.absenceType = records?.absenceType ?? "";
              item.etc = records?.etc ?? "";
              item.isDetailOpen = false;
            });
          }
        }
        return result;
      }
      return {} as AttendanceSchedulesByDateItemObj;
    },
    initialPageParam: { pageNo: 1 },
    getNextPageParam: (attendeeList, _allPages, lastPageParam) => {
      if (!attendeeList || _.isEmpty(attendeeList)) {
        return undefined;
      }

      return { pageNo: lastPageParam.pageNo + 1 };
    },
  });

  // 출석, 지각, 결석 수 조회
  const { data: summaryData } = useQuery({
    queryKey: ["attendanceSummary", attendanceId, selectedDate],
    queryFn: async () => {
      const response = await getAttendanceSummaryByDate(
        attendanceId!,
        selectedDate
      );
      return response;
    },
  });

  // 출석부 이름 조회용
  const { data: detailData } = useQuery({
    queryKey: ["attendanceDetail", attendanceId],
    queryFn: async (): Promise<Attendance> => {
      const response = await getAttendanceDetail(attendanceId!);
      if (response.success) {
        return response.data;
      }

      return {} as Attendance;
    },
  });

  // 출석기록 생성 및 수정
  const { mutate: createRecordsMutation } = useMutation({
    mutationKey: ["records"],
    mutationFn: async (parameters: CreateRecordsRequest) =>
      await createRecords(parameters),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["attendanceToday"],
      });
    },
  });

  const shouldShowNavigation = Object.keys(attendeeList).some((key) => {
    return attendeeList[key].some((item) => item.newStatus !== "");
  });

  const statusIcons: { icon: string; count: number }[] = [
    {
      icon: "groups",
      count: totalCount,
    },
    {
      icon: "sentiment_satisfied_alt",
      count: summaryData?.presentCount || 0,
    },
    { icon: "watch_later", count: summaryData?.lateCount || 0 },
    { icon: "highlight_off", count: summaryData?.absenceCount || 0 },
  ];

  /**
   * @description 출석/지각/결석 선택 및 상세사유 입력 등 출석대상 목록의 값을 변경하는 함수
   */
  const handleListItem: HandleListItemType = (index, time, field, value) => {
    setAttendeeList((prevState) => {
      const updatedState = { ...prevState }; // 이전 상태를 복사하여 새로운 상태를 만듭니다.

      if (updatedState[time]) {
        updatedState[time] = updatedState[time].map((item, idx) => {
          if (index === idx) {
            return { ...item, [field]: value };
          }
          return item;
        });
      }

      return updatedState;
    });
  };

  const onSaveAction = () => {
    const day = dayjs(selectedDate).locale("en").format("dddd").toUpperCase();

    const parameters: CreateRecordsRequest = {
      attendanceId: !_.isEmpty(detailData) ? detailData.id : "",
      singleRecords: [],
    };

    Object.values(attendeeList).forEach((value) =>
      value.forEach((item) => {
        if (item.newStatus === "Present") {
          parameters.singleRecords.push({
            status: item.newStatus,
            attendeeId: item.attendeeId,
            date: selectedDate,
            time: item.time,
            day: day.toUpperCase(),
            etc: item.etc || "",
          });
        }
        if (item.newStatus === "Late") {
          parameters.singleRecords.push({
            status: item.newStatus,
            attendeeId: item.attendeeId,
            date: selectedDate,
            time: item.time,
            day: day.toUpperCase(),
            etc: item.etc || "",
          });

          if (item.lateTime) {
            const index = parameters.singleRecords.findIndex(
              (el: any) => el.attendeeId === item.attendeeId
            );

            Object.assign(parameters.singleRecords[index], {
              lateTime: item.lateTime,
            });
          }
        }
        if (item.newStatus === "Absent") {
          parameters.singleRecords.push({
            status: item.newStatus,
            attendeeId: item.attendeeId,
            date: selectedDate,
            time: item.time,
            day: day.toUpperCase(),
            etc: item.etc || "",
          });

          if (item.absenceType) {
            const index = parameters.singleRecords.findIndex(
              (el) => el.attendeeId === item.attendeeId
            );

            Object.assign(parameters.singleRecords[index], {
              absenceType: item.absenceType,
            });
          }
        }
      })
    );

    createRecordsMutation(parameters);
  };

  useEffect(() => {
    if (isSuccess && attendance && attendance.pages) {
      const attendeeLists = attendance.pages.reduce((acc, obj) => {
        return { ...acc, ...obj };
      }, {});
      setAttendeeList(attendeeLists);
    }
  }, [attendance]);

  return (
    <PageContainer>
      <header className="sticky top-0 left-0 right-0 bg-white pt-[42px] pb-[12px] px-0">
        <div className="min-w-[339px] w-full box-border">
          <div className="h-8 mb-3 flex items-center">
            {detailData?.imageUrl && (
              <img
                src={detailData.imageUrl}
                alt="attendance-img"
                className=""
                width={32}
                height={32}
                onClick={() => navigate("/attendances")}
              />
            )}
            <div className="name">
              {/* @ts-ignore */}
              {detailData?.title || "출석부 이름"}
            </div>
          </div>

          <section className="pl-[5px] pr-[5px] flex justify-between">
            <section className="flex gap-1">
              {statusIcons.map((item) => {
                return (
                  <div
                    className="flex gap-[2px] items-center"
                    key={`attendance-status__${item.icon}`}
                  >
                    <Icon
                      icon={Icons[item.icon]}
                      color={Colors.Gray80}
                      size={16}
                    />
                    <div className="text-xs font-medium text-[#8E8E8E]">
                      {item.count || 0}
                    </div>
                  </div>
                );
              })}
            </section>
            <div className="flex items-center">
              <img
                src={"/images/icons/arrow-left-icon.svg"}
                alt=""
                width={24}
                height={24}
                style={{
                  cursor: "pointer",
                }}
                onClick={() => handlePrevDay()}
              />
              <DatePicker
                selected={new Date(selectedDate)}
                onChange={(date) => {
                  if (date) {
                    const formattedDate = dateFormat(date, "dash");
                    setSelectedDate(formattedDate);
                    window.scrollTo(0, 0);
                  }
                }}
                customInput={
                  <div className="w-[71px] h-[23px] flex items-center justify-evenly rounded box-border bg-[D9D9D9] z-[1000]">
                    <div className="w-[21px] h-[19px] rounded-sm box-border text-sm text-center bg-white">
                      {selectedDate.split("-")[1]}
                    </div>
                    <div className="w-[21px] h-[19px] rounded-sm box-border text-sm text-center bg-white">
                      {selectedDate.split("-")[2]}
                    </div>
                    <div className="w-[21px] h-[19px] rounded-sm box-border text-sm text-center bg-white">
                      {dayjs(selectedDate).locale("ko").format("ddd")}
                    </div>
                  </div>
                }
              />
              <img
                src={"/images/icons/arrow-right-icon.svg"}
                alt=""
                width={24}
                height={24}
                className="cursor-pointer"
                onClick={() => handleNextDay()}
              />
            </div>
          </section>
        </div>
      </header>

      {/* 출석부 명단 */}
      <section className="max-w-[375px] flex gap-6 flex-col pt-[12px] pb-[120px] px-0">
        {Object.keys(attendeeList).map((time) => {
          return (
            <div className="attendance-list-by-time" key={`time__${time}`}>
              <div className="text-left text-[15px] font-semibold mb-1">{`${time.slice(
                0,
                2
              )}:${time.slice(2, 4)}`}</div>
              <div className="flex flex-col gap-3">
                {attendeeList[time].map((item, index) => (
                  <AttendanceItem
                    item={item}
                    time={time}
                    index={index}
                    handleListItem={handleListItem}
                    key={`attendee__${item.id}`}
                  />
                ))}
              </div>
            </div>
          );
        })}

        <InfiniteCheckComp
          initialDataLoading={!isLoading && !_.isEmpty(attendeeList)}
          isFetchingNextPage={isFetchingNextPage}
          hasNextPage={hasNextPage}
          callNextPage={async () => {
            if (isFetchingNextPage) {
              return;
            }
            await fetchNextPage();
          }}
        />
      </section>

      <Navigation
        status={shouldShowNavigation}
        setAttendeeList={setAttendeeList}
        onSaveAction={onSaveAction}
      />
    </PageContainer>
  );
};

export default AttendancesRoaster;
