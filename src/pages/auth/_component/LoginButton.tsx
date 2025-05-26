import { twMerge } from 'tailwind-merge'
import tw from 'tailwind-styled-components'

type LoginButtonProps = {
  children?: React.ReactNode
  onClick?: () => void
  className?: string
  type?: 'button' | 'submit' | 'reset'
}

export default function LoginButton({
  className,
  onClick,
  children,
  type = 'button',
}: LoginButtonProps) {
  return (
    <Button
      className={twMerge(
        'flex items-center justify-center text-lg  w-[342px] h-[52px] rounded-xl leading-[22px] cursor-pointer',
        className,
      )}
      type={type}
      onClick={onClick}
    >
      {children}
    </Button>
  )
}

const Button = tw.button`w-full h-12 flex justify-center items-center rounded-2xl`
