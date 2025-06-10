import * as Select from '@radix-ui/react-select'
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@radix-ui/react-icons'

type CounsellerSelectProps = {
  onChange: (id: number) => void
  options: {
    name: string
    value: string
  }[]
  placeholder: string
  disabled: boolean
}

const CounsellerSelect = (props: CounsellerSelectProps) => {
  const { onChange, options, placeholder, disabled } = props

  return (
    <Select.Root
      onValueChange={(value) => onChange(Number(value))}
      disabled={disabled}
    >
      <Select.Trigger className="rounded-xl outline-none inline-flex items-center justify-between w-full h-12 px-3 py-2 bg-white border border-border-brand ounded-md text-sm focus:outline-none  focus:ring-green-500 ">
        <Select.Value placeholder={placeholder} />
        <Select.Icon>
          <ChevronDownIcon />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className="outline-none z-10 mt-[49px] bg-white border border-gray-300 rounded-xl shadow-md">
          <Select.ScrollUpButton className="flex items-center justify-center h-6 bg-white">
            <ChevronUpIcon />
          </Select.ScrollUpButton>
          <Select.Viewport className="p-[6px]">
            {options.map(({ name, value }) => (
              <Select.Item
                key={value}
                value={value}
                className="flex items-center p-2 rounded-md text-sm cursor-pointer hover:bg-gray-100"
              >
                <Select.ItemText>{name}</Select.ItemText>
                <Select.ItemIndicator className="ml-auto text-green-500">
                  <CheckIcon />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Viewport>
          <Select.ScrollDownButton className="flex items-center justify-center h-6 bg-white">
            <ChevronDownIcon />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  )
}

export default CounsellerSelect
