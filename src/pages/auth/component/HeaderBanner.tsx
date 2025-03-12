export default function HeaderBanner() {
  return (
    <div className="flex flex-col gap-2">
      <img
        src={"/images/logos/checkuree_logo.svg"}
        width={284}
        height={48}
        alt="로고 이미지"
      />
      <p className="font-medium text-lg text-[#454545]">
        레슨 관리와 통계까지 손쉽게
      </p>
    </div>
  );
}
