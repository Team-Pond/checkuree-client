export default function Header() {
  return (
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
  )
}
