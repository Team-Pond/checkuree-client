import { Root, List, Trigger, Content } from "@radix-ui/react-tabs";

export default function CommonTabs() {
  return (
    <Root defaultValue="account">
      <List className="flex gap-3">
        <Trigger value="1">학생관리</Trigger>
        <Trigger value="2">출석관리</Trigger>
        <Trigger value="3">학습관리</Trigger>
        <Trigger value="4">상담관리</Trigger>
      </List>

      <div>
        <Content value="1">
          <span>학생관리</span>
        </Content>

        <Content value="2">
          <span>출석관리</span>
        </Content>

        <Content value="3">
          <span>학습관리</span>
        </Content>
        <Content value="4">
          <span>상담관리</span>
        </Content>
      </div>
    </Root>
  );
}
