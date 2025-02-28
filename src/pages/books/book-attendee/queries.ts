import { getAttendee } from "@/api/AttendeeApiClient";
import { DaysType, GenderType } from "@/api/AttendeeSchema";
import { attendeeKeys } from "@/queryKeys";
import { useQuery } from "@tanstack/react-query";

export const useAttendeeList = ({
  bookId,
  dayArrays,
  gender,
  age,
}: {
  bookId: number;
  dayArrays: DaysType[];
  gender: GenderType;
  age: { min: number; max: number };
}) => {
  return useQuery({
    queryKey: attendeeKeys.list(bookId, dayArrays, gender, age).queryKey,
    queryFn: async () => {
      const response = await getAttendee({
        attendanceBookId: Number(bookId),
        filter: {
          age: age,
          gradeIds: [0],
          scheduleDays: dayArrays,
          gender: gender,
          status: "ATTENDING",
        },
      });
      if (response.status === 200) return response;
    },
  });
};
