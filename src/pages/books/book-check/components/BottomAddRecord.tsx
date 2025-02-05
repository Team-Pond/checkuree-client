import BottomDrawer from "../../../../components/BottomDrawer";
import { useState } from "react";
import { useRecordCreate } from "../queries";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { TimeSelectionView } from "./bottomPages/TimeSelect";
import { StudentSearchView } from "./bottomPages/StudentSearch";

type IProps = {
  openFilter: boolean;
  onDrawerChange: () => void;
  attendanceBookId: number;
  currentDate: string;
};

export const BottomAddRecord = (props: IProps) => {
  const { openFilter, onDrawerChange, attendanceBookId } = props;

  const { bookId } = useParams();

  const [search, setSearch] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<{
    id: number;
    name: string;
  } | null>(null);

  const { mutate: recordMutation } = useRecordCreate({
    bookId: Number(bookId!),
    currentDate: props.currentDate,
  });

  const unsetSelectedStudent = () => {
    setSelectedTime("");
    setSelectedStudent(null);
  };

  const closeDrawer = () => {
    setSearch("");
    unsetSelectedStudent();
    onDrawerChange();
  };

  return (
    <BottomDrawer
      isOpen={openFilter}
      onClose={() => {
        closeDrawer();
      }}
    >
      <div className="flex flex-col gap-0 p-1 min-h-[300px] max-h-[80vh] overflow-y-auto">
        <div className="min-h-[350px] flex flex-col">
          {!selectedStudent ? (
            <StudentSearchView
              attendanceBookId={attendanceBookId}
              onSelectStudent={setSelectedStudent}
              search={search}
              setSearch={setSearch}
            />
          ) : (
            <TimeSelectionView
              student={selectedStudent}
              selectedTime={selectedTime}
              setSelectedTime={setSelectedTime}
              onBack={() => {
                unsetSelectedStudent();
              }}
              onConfirm={(time) => {
                recordMutation({
                  attendeeId: selectedStudent.id,
                  status: "PENDING",
                  attendTime: time,
                });
                toast.success(
                  `${selectedStudent.name} 학생의 스케쥴이 \n${time}에 추가되었습니다.`
                );
                closeDrawer();
              }}
            />
          )}
        </div>
      </div>
    </BottomDrawer>
  );
};
