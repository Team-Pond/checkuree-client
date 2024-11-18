"use client";

import { useEffect, useState } from "react";

import _ from "lodash";

// Styles

// Api
import { useQuery } from "@tanstack/react-query";

// Components
import { Fab } from "@mui/material";

// Types
import { useParams } from "react-router-dom";
import { Colors, Icons } from "../../styles/globalStyles";
import { Attendance, AttendeeData } from "../../api/schema";
import {
  getAttendanceDetail,
  getAttendanceSummary,
  getAttendeeList,
} from "../../api/AttendanceApiClient";

import Icon from "../../components/Icon";
import BottomDrawer from "../../components/BottomDrawer";
import FormContents from "../../components/FormContents";
import ListManagementAttendanceItem from "../../components/listManagementAcctendanceItem";
import { ListManagementContainer } from "../../components/listManagement.styles";

const ListManagement = () => {
  const { id: attendanceId } = useParams();

  const [attendeeList, setAttendeeList] = useState<AttendeeData[]>([]);
  const [isAddOpen, setIsAddOpen] = useState<boolean>(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState<string>("");

  // 출석대상 명단 조회
  const { data = [], isSuccess } = useQuery({
    queryKey: ["attendee-list", attendanceId],
    queryFn: async (): Promise<AttendeeData[]> => {
      const response = await getAttendeeList(attendanceId!);
      if (response.success) {
        return (response.items || []).map((item: any) => ({
          ...item,
          status: "",
          isDetailOpen: false,
        }));
      }

      return [] as AttendeeData[];
    },
  });

  // 출석부 상세 조회
  const { data: attendanceDetail = {} as Attendance } = useQuery({
    queryKey: ["attendance-detail", attendanceId],
    queryFn: async (): Promise<Attendance> => {
      const response = await getAttendanceDetail(attendanceId!);

      if (response.success) {
        return response.data;
      }

      return {} as Attendance;
    },
  });

  // 출석 기록 summary 조회
  const { data: attendanceSummary } = useQuery({
    queryKey: ["attendance-summary", attendanceId],
    queryFn: async () => {
      const attendeeIds = data.map((item) => item.id);
      const response = await getAttendanceSummary(attendanceId!, attendeeIds);
      if (response) {
        return response;
      }

      return [];
    },
    enabled: data && data?.length > 0 && isSuccess,
  });

  const onCloseModal = () => {
    if (isAddOpen) {
      setIsAddOpen(false);
      return;
    }

    setIsUpdateOpen("");
  };

  useEffect(() => {
    if (data && Array.isArray(data) && data?.length > 0) {
      setAttendeeList(data);
    }
  }, [data]);

  return (
    <ListManagementContainer>
      <section className="attendance-header">
        <div className="attendance-img">
          {attendanceDetail.imageUrl ? (
            <img
              src={attendanceDetail.imageUrl}
              alt="attendance-image"
              width={32}
              height={32}
            />
          ) : null}
        </div>

        <section className="attendance-info">
          <div className="name">{attendanceDetail.title}</div>
        </section>
      </section>

      {/* 출석부 명단 */}
      <section className="attendance-list">
        {attendeeList && attendeeList.length > 0
          ? attendanceSummary &&
            attendeeList.map((item, index) => (
              <ListManagementAttendanceItem
                item={{ ...item, ...attendanceSummary[index] }}
                setIsUpdateOpen={setIsUpdateOpen}
                key={`attendance-item__${item.id}`}
              />
            ))
          : "출석 대상이 없습니다."}
      </section>

      {/* 등록/변경 모달 */}
      <BottomDrawer
        open={isAddOpen || isUpdateOpen.length > 0}
        onClose={onCloseModal}
        children={
          <FormContents
            data={attendanceDetail}
            attendeeId={isUpdateOpen}
            attendanceId={attendanceId!}
            onClose={onCloseModal}
          />
        }
      />
      {/* 등록 버튼 */}
      <Fab color="primary" aria-label="add" onClick={() => setIsAddOpen(true)}>
        <Icon icon={Icons.add} size={32} color={Colors.White} />
      </Fab>
    </ListManagementContainer>
  );
};

export default ListManagement;
