import React, { useState, useRef } from 'react'
import tw from 'tailwind-styled-components'

const periods = ['오전', '오후']
const hours = Array.from({ length: 12 }, (_, i) => (i + 1).toString())
const minutes = Array.from({ length: 6 }, (_, i) =>
  (i * 10).toString().padStart(2, '0'),
)

export type TimePickerProps = {
  handleTimeChange: (time: {
    period: string
    hour: string
    minute: string
  }) => void
  handleOpenTimePicker: (state: boolean) => void
}

const TimePicker = (props: TimePickerProps) => {
  const { handleTimeChange, handleOpenTimePicker } = props

  const [selectedPeriod, setSelectedPeriod] = useState(periods[0])
  const [selectedHour, setSelectedHour] = useState(hours[0])
  const [selectedMinute, setSelectedMinute] = useState(minutes[0])

  const periodRef = useRef<HTMLDivElement>(null)
  const hourRef = useRef<HTMLDivElement>(null)
  const minuteRef = useRef<HTMLDivElement>(null)

  const itemHeight = 40 // Height of each item (in px)

  // Helper function to snap to the nearest value
  const snapToNearest = (
    ref: React.RefObject<HTMLDivElement>,
    items: string[],
    setSelected: React.Dispatch<React.SetStateAction<string>>,
  ) => {
    if (!ref.current) return
    const scrollTop = ref.current.scrollTop
    const index = Math.round(scrollTop / itemHeight)
    ref.current.scrollTo({
      top: index * itemHeight,
      behavior: 'auto',
    })
    setSelected(items[index])
  }

  // Debounce function to optimize scroll performance
  const debounce = (func: Function, delay: number) => {
    let timeoutId: NodeJS.Timeout
    return (...args: any[]) => {
      if (timeoutId) clearTimeout(timeoutId)
      timeoutId = setTimeout(() => func(...args), delay)
    }
  }

  // Scroll handler with debounce
  const handleScroll = debounce(
    (
      ref: React.RefObject<HTMLDivElement>,
      items: string[],
      setSelected: React.Dispatch<React.SetStateAction<string>>,
    ) => {
      snapToNearest(ref, items, setSelected)
    },
    100, // Delay in milliseconds
  )

  // Render scrollable column
  const renderColumn = (
    ref: React.RefObject<HTMLDivElement>,
    items: string[],
    selectedValue: string,
    setSelected: React.Dispatch<React.SetStateAction<string>>,
  ) => (
    /**
     * snap-mandatory: 스크롤이 각 항목에 딱 멈춰서 멈추게 만드는 css 기능
     */
    <div
      ref={ref}
      className="relative w-[34px] h-[87px] overflow-y-scroll scrollbar-none "
      onScroll={() => handleScroll(ref, items, setSelected)}
    >
      {/* Spacer for top alignment */}
      <div className="h-[20px]" />
      {items.map((item, index) => (
        <div
          key={index}
          className={`text-center py-2  ${
            selectedValue === item ? 'font-bold text-black' : 'text-gray-400'
          }`}
        >
          {Number(item) < 10 && Number(item) > 0 ? '0' + item : item}
        </div>
      ))}
      {/* Spacer for bottom alignment */}
      <div className="h-[40px]" />
    </div>
  )

  // **Added:** Close modal when clicking outside the TimePicker
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleOpenTimePicker(false)
      handleTimeChange({
        period: selectedPeriod,
        hour: selectedHour,
        minute: selectedMinute,
      })
    }
  }

  return (
    // **Added:** Backdrop for modal
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={handleBackdropClick} // **Added:** Handle backdrop click
    >
      <div
        className="flex space-x-4 w-full h-[150px] items-center justify-center bg-white max-w-[160px] rounded-2xl shadow-md"
        onBlur={() => {
          handleOpenTimePicker(false)
          handleTimeChange({
            period: selectedPeriod,
            hour: selectedHour,
            minute: selectedMinute,
          })
        }}
        tabIndex={0} // 포커스 가능하도록 추가
      >
        {/* Period Column */}
        {renderColumn(periodRef, periods, selectedPeriod, setSelectedPeriod)}
        {/* Hour Column */}

        {renderColumn(hourRef, hours, selectedHour, setSelectedHour)}

        {/* Minute Column */}
        {renderColumn(minuteRef, minutes, selectedMinute, setSelectedMinute)}
      </div>
    </div>
  )
}

export default TimePicker

const Button = tw.button`w-full h-12 flex justify-center items-center rounded-2xl`
