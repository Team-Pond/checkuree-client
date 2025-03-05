interface IProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
}
export default function Radio({
  id,
  label,
  checked,
  onChange,
  className,
}: IProps) {
  return (
    <div className="inline-flex items-center">
      <label htmlFor={id} className="flex items-center cursor-pointer">
        <div className="relative flex items-center cursor-pointer">
          <input
            key={id}
            name="counsellingType"
            type="radio"
            id={id}
            className="peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-slate-300 checked:border-slate-400 transition-all"
            checked={checked}
            onChange={(e) => {
              onChange(e.target.checked);
            }}
          />
          <span className="absolute bg-bg-tertiary w-3 h-3 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></span>
        </div>
        <span className="ml-2 text-text-primary text-s-bold cursor-pointer">
          {label}
        </span>
      </label>
    </div>
  );
}
