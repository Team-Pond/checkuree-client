interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  'data-cy'?: string
}

export default function Button({
  children,
  className,
  type = 'button',
  onClick,
}: ButtonProps) {
  return (
    <button type={type} onClick={onClick} className={className}>
      {children}
    </button>
  )
}
