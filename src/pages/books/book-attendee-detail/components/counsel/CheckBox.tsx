interface IProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
}

export default function CheckBox({
  id,
  label,
  checked,
  onChange,
  className,
}: IProps) {
  return (
    <div className="flex items-center w-[167px] h-9 px-4 py-2">
      <div className="flex items-center cursor-pointer relative">
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded border border-slate-300 checked:bg-bg-tertiary checked:border-bg-tertiary"
        />
        <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3.5 w-3.5"
            viewBox="0 0 20 20"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="1"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            ></path>
          </svg>
        </span>
      </div>

      <label
        htmlFor={id}
        className="ml-2 text-text-primary text-s-bold cursor-pointer"
      >
        {label}
      </label>
    </div>
  );
}
