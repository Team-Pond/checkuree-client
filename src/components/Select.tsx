import {
  Root,
  Trigger,
  Value,
  Icon,
  Portal,
  Content,
  Item,
  ItemText,
  ItemIndicator,
  Viewport,
  ScrollDownButton,
  ScrollUpButton,
} from '@radix-ui/react-select'
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@radix-ui/react-icons'

type SelectProps = {
  onChange: (key: string, value: string) => void
  value: string
  options: {
    name: string
    value: string
  }[]
  placeholder: string
}

const Select = (props: SelectProps) => {
  const { onChange, options, placeholder } = props
  return (
    <Root onValueChange={(value) => onChange(value, value)}>
      <Trigger className="rounded-md outline-none inline-flex items-center justify-between w-[120px] px-3 py-2 bg-white border border-border-brand ounded-md text-sm focus:outline-none  focus:ring-green-500 ">
        <Value placeholder={placeholder} />
        <Icon className="mb-0.5">
          <ChevronDownIcon />
        </Icon>
      </Trigger>
      <Portal>
        <Content className="outline-none z-10 bg-white border border-gray-300 rounded-md shadow-md">
          <ScrollUpButton className="flex items-center justify-center h-6 bg-white">
            <ChevronUpIcon />
          </ScrollUpButton>
          <Viewport className="p-2">
            {options.map(({ name, value }) => (
              <Item
                key={`${value}-${name}`}
                value={value}
                className="flex items-center p-2 rounded-md text-sm cursor-pointer hover:bg-gray-100"
              >
                <ItemText>{name}</ItemText>
                <ItemIndicator className="ml-auto text-green-500">
                  <CheckIcon />
                </ItemIndicator>
              </Item>
            ))}
          </Viewport>
          <ScrollDownButton className="flex items-center justify-center h-6 bg-white">
            <ChevronDownIcon />
          </ScrollDownButton>
        </Content>
      </Portal>
    </Root>
  )
}

export default Select
