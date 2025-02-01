import { getAttendee } from "@/api v2/AttendeeApiClient";
import { DaysType, GenderType } from "@/api v2/AttendeeSchema";
import { useQuery } from "@tanstack/react-query";

export const useAttendeeList = ({
  bookId,
  dayArrays,
  gender,
}: {
  bookId: number;
  dayArrays: DaysType[];
  gender: GenderType;
}) => {
  return useQuery({
    queryKey: ["roaster", bookId, dayArrays, gender],
    queryFn: async () => {
      const response = await getAttendee({
        attendanceBookId: Number(bookId),
        filter: {
          age: {
            min: 30,
            max: 1,
          },
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
