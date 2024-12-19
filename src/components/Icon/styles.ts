// Libraries
import { Colors } from "@/styles/globalStyles";
import styled from "@emotion/styled";

// Styles

interface IconProps {
  size?: number;
  color?: string;
}

const IconContainer = styled.span<IconProps>`
  font-family: "Material Icons Outlined", serif;
  font-size: ${(props) => (props.size ? `${props.size}px` : "24px")}!important;
  color: ${(props) => (props.color ? props.color : Colors.Black01)};
  display: grid;
  place-items: center;
`;

export default IconContainer;
