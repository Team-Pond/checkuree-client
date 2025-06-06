interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  'data-cy'?: string
  label?: string
  labelClassName?: string
}

export default function Button({
  label,
  labelClassName,
  className,
  type = 'button',
  onClick,
  'aria-label': ariaLabel,
  'data-cy': dataCy,
  disabled = false,
  children,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={className}
      disabled={disabled}
      aria-label={ariaLabel}
      data-cy={dataCy}
    >
      {children ?? <span className={labelClassName}>{label}</span>}
    </button>
  )
}
