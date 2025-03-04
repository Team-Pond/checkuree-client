import { Meta, StoryObj } from "@storybook/react";
import Modal from "./Modal"; // Modal 경로 수정 필요

const meta = {
  title: "Components/Modal", // Title for the component in Storybook
  component: Modal, // Modal component to be displayed
} satisfies Meta<typeof Modal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const General: Story = {
  args: {
    className: "",
  },
};
