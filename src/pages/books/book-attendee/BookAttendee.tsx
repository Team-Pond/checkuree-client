import { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAttendee } from "@/api v2/AttendeeApiClient";

import { DaysType } from "@/api v2/AttendanceBookSchema";
import Header from "./components/Header";
import Bottom from "../components/Bottom";
import BottomFilter from "./components/BottomFilter";
import { GenderType } from "@/api v2/AttendeeSchema";
import MainContent from "./components/MainContent";
import { BookContext } from "@/context/BookContext";
import { useParams, useSearchParams } from "react-router-dom";

const DaysMatch: Record<string, DaysType> = {
  월: "MONDAY",
  화: "TUESDAY",
  수: "WEDNESDAY",
  목: "THURSDAY",
  금: "FRIDAY",
  토: "SATURDAY",
  일: "SUNDAY",
};
export default function BookRoaster() {
  const [searchParams] = useSearchParams();
  const { bookId } = useParams();
  const bookName = searchParams.get("bookName");
  const context = useContext(BookContext);
  const { selectedBook } = context!;

  const [openFilter, setOpenFilter] = useState<boolean>(false);

  const onDrawerChange = () => {
    setOpenFilter(!openFilter);
  };

  const [dayArrays, setDayArrays] = useState<DaysType[]>([]);
  const [gender, setGender] = useState<GenderType>("");
  const [search, setSearch] = useState<string>("");
  const onDaysChange = (day: DaysType) => {
    if (dayArrays.includes(DaysMatch[day])) {
      setDayArrays(dayArrays.filter((item) => item !== DaysMatch[day]));
    } else {
      setDayArrays([...dayArrays, DaysMatch[day]]);
    }
  };

  const onChangeGender = (selectGender: GenderType) => {
    setGender(gender === selectGender ? "" : selectGender);
  };
  const { data: roaster } = useQuery({
    queryKey: ["roaster", bookId, dayArrays, gender],
    queryFn: async () => {
      const response = await getAttendee({
        attendanceBookId: Number(bookId) || selectedBook?.id!,
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

  const getGrades = (grades: { id: number; name: string }[]) => {
    const gradesBooks = grades.map((grade) => grade.name);
    return gradesBooks.join(" / ");
  };

  const onChangeSearch = (value: string) => {
    setSearch(value);
  };

  return (
    <section className="flex flex-col w-full">
      <Header
        title={bookName || selectedBook?.title!}
        onDrawerChange={onDrawerChange}
        onChangeSearch={onChangeSearch}
      />
      <MainContent roaster={roaster!} getGrades={getGrades} />
      <BottomFilter
        openFilter={openFilter}
        onDrawerChange={onDrawerChange}
        onChangeGender={onChangeGender}
        onDaysChange={onDaysChange}
        gender={gender}
        dayArrays={dayArrays}
        DaysMatch={DaysMatch}
      />
      {!openFilter && (
        <>
          <div className="flex justify-between px-[44px] items-center w-full h-[92px]" />
          <Bottom />
        </>
      )}
    </section>
  );
}
