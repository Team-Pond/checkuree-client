import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section className="w-[393px] flex flex-col items-center pt-20">
      <img
        src="/images/icons/book-roaster/ico-error-frog.svg"
        alt=" 아이콘"
        width={50}
        height={50}
        className="mb-4"
      />

      <h2 className="text-center mb-12">
        죄송합니다.
        <br />
        해당 페이지를 찾을 수 없습니다.
      </h2>

      <div className="text-lg">
        출석부로 돌아가시려면{" "}
        <Link
          to="/auth/signin"
          className="font-semibold text-bg-tertiary underline"
        >
          여기
        </Link>
        를 눌러주세요!
      </div>
    </section>
  );
};

export default NotFound;
