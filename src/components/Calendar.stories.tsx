import { Meta, StoryObj } from "@storybook/react/*";
import Calendar from "./Calendar";

const meta = {
  title: "Components/Calendar",
  component: Calendar,
} satisfies Meta<typeof Calendar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const General: Story = {
  args: {
    className: "",
    handleCurrentDay: () => {},
  },
};
