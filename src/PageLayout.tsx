import { ReactNode } from 'react'

interface PageContainerProps {
  children: ReactNode
}

export default function PageLayout({ children }: PageContainerProps) {
  return (
    <main className="max-w-[430px] min-w-[320px] w-full h-screen flex flex-col items-center scrollbar-hide custom-scrollbar-hide">
      {children}
    </main>
  )
}
