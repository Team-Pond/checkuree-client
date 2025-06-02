interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  'data-cy'?: string
}

export default function Button({
  children,
  className,
  type = 'button',
  onClick,
  'data-cy': dataCy,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={className}
      data-cy={dataCy}
    >
      {children}
    </button>
  )
}
