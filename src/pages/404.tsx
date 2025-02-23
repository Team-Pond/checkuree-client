import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section className="w-[393px] flex flex-col items-center justify-center h-full">
      <div className="flex flex-col gap-5 items-center">
        <img
          src="/images/icons/book-roaster/ico-error-frog.svg"
          alt=" 아이콘"
          width={70}
          height={70}
          className="mb-4"
        />

        <h2 className="text-center mb-12 font-appleLiGothic font-semibold">
          해당 페이지를 찾을 수 없습니다. <br />
          출석부로 돌아가시려면 &nbsp;
          <Link
            to="/auth/signin"
            className="font-semibold text-bg-tertiary underline"
          >
            {"여기"}
          </Link>
          를 눌러주세요!
        </h2>
      </div>
    </section>
  );
};

export default NotFound;
