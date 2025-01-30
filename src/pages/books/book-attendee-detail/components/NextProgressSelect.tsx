import * as Select from "@radix-ui/react-select";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";

type IProps = {};

const options = [{ text: "(체르니50 다음 과정)", value: "1" }];

const NextProgressSelect = (props: IProps) => {
  return (
    <Select.Root onValueChange={() => {}}>
      <Select.Trigger
        className="inline-flex items-center justify-between w-full h-12 px-3 py-2 bg-white border  outline-none rounded-xl text-sm "
        aria-label="관계"
      >
        <Select.Value placeholder="" />
        <Select.Icon>
          <ChevronDownIcon />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className="z-10 bg-white border border-gray-300 rounded-md shadow-md">
          <Select.ScrollUpButton className="flex items-center justify-center h-6 bg-white">
            <ChevronUpIcon />
          </Select.ScrollUpButton>
          <Select.Viewport className="p-2">
            {options.map(({ text, value }) => (
              <Select.Item
                key={value}
                value={value}
                className="flex items-center p-2 rounded-md text-sm cursor-pointer hover:bg-gray-100"
              >
                <Select.ItemText>{text}</Select.ItemText>
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
  );
};

export default NextProgressSelect;
