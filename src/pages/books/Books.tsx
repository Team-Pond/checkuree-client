import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getMeBooks } from "@/api v2/AttendanceBookApiClient";
import { useQuery } from "@tanstack/react-query";
import { formatTimeRange, getDayGroupFromInput } from "@/utils";
import { BookContext } from "@/context/BookContext";

export default function Books() {
  const navigate = useNavigate();
  const context = useContext(BookContext);
  useEffect(() => {
    const getMyBooks = async () => {};
    getMyBooks();
  }, []);

  const { data: bookList } = useQuery({
    queryKey: ["books"],
    queryFn: async () => {
      const response = await getMeBooks();
      if (response.status === 200) {
        return response;
      } else {
        console.log(response); // 에러 바운더리 추가
      }
    },
  });

  const { setSelectedBook } = context!;

  const handleNavigation = (id: string, title: string) => {
    navigate(`/book/${id}`);
    setSelectedBook({ title });
  };

  return (
    <section className="relative flex flex-col w-full min-h-screen">
      <div className="w-full h-[64px] flex items-center justify-between px-4 py-5">
        <img
          src="/images/logos/checkuree_logo.svg"
          alt="체쿠리 아이콘"
          width={170}
          height={20}
        />
        <img
          src="/images/icons/book/ico-notification.svg"
          alt="알림 아이콘"
          width={20}
          height={20}
        />
      </div>
      <div className="flex-1 bg-bg-secondary justify-items-center flex justify-center">
        <div className="w-full max-w-[340px]  border-spacing-0 py-5 grid grid-cols-2  gap-y-6 gap-x-4 ">
          {bookList?.data.map((attendance) => {
            return (
              <div
                key={attendance.id}
                className="max-w-[162px] h-[195px] w-full"
                onClick={() =>
                  handleNavigation(String(attendance.id), attendance.title)
                }
              >
                <img
                  src={
                    attendance.imageUrl === "string"
                      ? "/images/img-test.png"
                      : "/images/img-test.png"
                  }
                  className="w-full h-[97px] rounded-t-2xl"
                  alt=""
                />
                <div className="flex flex-col gap-2 px-3 py-4 text-left rounded-b-2xl bg-white">
                  <div className="flex gap-2">
                    <p className="font-bold text-text-primary">
                      {attendance.title}
                    </p>
                    <p className="font-semibold text-text-secondary">
                      {/* TODO: roasterCount */}
                      {12}
                    </p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-text-brand font-bold text-sm">
                      {getDayGroupFromInput(attendance.availableDays)}
                    </p>
                    <p className="text-text-secondary font-medium text-sm">
                      {formatTimeRange("1200", "2000")}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="fixed bottom-11 ml-[270px] max-w-[390px] w-full">
        <button
          onClick={() => navigate("/book/create")}
          className="w-[104px] h-[46px] rounded-full flex gap-2 justify-center items-center bg-bg-tertiary"
        >
          <img
            src="/images/icons/book/ico-plus.svg"
            alt="플러스 아이콘"
            width={16}
            height={16}
          />
          <p className="text-white font-semibold text-lg">출석부</p>
        </button>
      </div>
    </section>
  );
}
