import CommonModal from "@/components/CommonModal";
import React, { useState } from "react";
import NextProgressSelect from "./NextProgressSelect";
import { updateProgressPromote } from "@/api v2/AttendeeApiClient";
import { QueryClient, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  attendeeProgressId: number;
  bookId: number;
}

const NextProgressModal: React.FC<Props> = ({
  isOpen,
  onClose,
  attendeeProgressId,
  bookId,
}) => {
  const { attendeeId } = useParams();
  const [formData, setFormData] = useState({
    completeAt: "",
    startAt: "",
  });
  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value.replace(/\D/g, "");

    if (input.length > 8) {
      input = input.slice(0, 8);
    }

    if (input.length >= 5) {
      input = input.slice(0, 4) + "." + input.slice(4);
    }

    if (input.length >= 8) {
      input = input.slice(0, 7) + "." + input.slice(7);
    }

    setFormData((prev) => ({
      ...prev,
      startAt: input,
    }));
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value.replace(/\D/g, "");

    if (input.length > 8) {
      input = input.slice(0, 8);
    }

    if (input.length >= 5) {
      input = input.slice(0, 4) + "." + input.slice(4);
    }

    if (input.length >= 8) {
      input = input.slice(0, 7) + "." + input.slice(7);
    }

    setFormData((prev) => ({
      ...prev,
      completeAt: input,
    }));
  };

  const queryClinet = new QueryClient();
  const { mutate: progressMutation } = useMutation({
    mutationFn: async () =>
      await updateProgressPromote({
        attendanceBookId: Number(bookId),
        params: {
          attendeeProgressId: attendeeProgressId,
          completedAt: formData.completeAt.replaceAll(".", "-"),
          startAt: formData.startAt.replaceAll(".", "-"),
        },
      }).then((res) => res.data),
    onSuccess: () => {
      toast.success("다음 과정이 저장되었습니다.");
      queryClinet.invalidateQueries({
        queryKey: ["attendee-detail", String(attendeeId)],
      });
      onClose();
    },
  });

  return (
    <CommonModal
      isOpen={isOpen}
      onClose={onClose}
      isClose={false}
      className="max-w-xs flex items-center justify-between  w-full"
    >
      <div className="flex flex-col gap-6 justify-center items-center  w-full">
        <div className="flex flex-col gap-2 w-full">
          <div className="flex gap-1 items-center">
            <p className="font-bold text-m-medium">과정 종료일</p>
            <p className="text-text-danger">*</p>
          </div>

          <input
            type="text"
            placeholder="YYYY.MM.DD"
            className="outline-none bg-white border border-[#E7E7E7] rounded-xl  w-full h-12 flex items-center pl-4"
            value={formData.completeAt}
            onChange={handleEndDateChange}
          />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <div className="flex gap-1 items-center">
            <p className="font-bold text-m-medium">다음 과정 시작</p>
            <p className="text-text-danger">*</p>
          </div>
          {/* <NextProgressSelect /> */}
          <input
            type="text"
            placeholder="YYYY.MM.DD"
            className="outline-none bg-white border border-[#E7E7E7] rounded-xl w-full h-12 flex items-center pl-4"
            value={formData.startAt}
            onChange={handleStartDateChange}
          />
        </div>

        <div className="flex gap-4 w-full">
          <button
            type="button"
            onClick={onClose}
            className="w-full h-12 flex justify-center items-center rounded-2xl bg-bg-secondary text-text-secondary text-l-semibold"
          >
            취소
          </button>
          <button
            onClick={() => {
              progressMutation();
            }}
            type="button"
            className="w-full h-12 flex justify-center items-center rounded-2xl bg-bg-tertiary text-[#F1F8F3] text-l-semibold"
          >
            저장하기
          </button>
        </div>
      </div>
    </CommonModal>
  );
};

export default NextProgressModal;
