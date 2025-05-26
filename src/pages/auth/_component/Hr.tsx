export default function Hr() {
  return (
    <div className="flex items-center justify-center gap-2">
      <hr className="w-[140px] h-[1px] bg-[rgba(0,0,0,0.24)]" />
      <p className="text-xs text-[rgba(0,0,0,0.24)]">또는</p>
      <hr className="w-[140px] h-[1px] bg-[rgba(0,0,0,0.24)]" />
    </div>
  );
}
