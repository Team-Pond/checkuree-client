import Logo from "../../public/images/logos/checkuree_logo.svg";
import DetailOpen from "../../public/images/icons/ico-detail-open.svg";

// Types
type ColorKey =
  | "CheckureeGreen"
  | "CheckureeGreen10"
  | "LightGreen"
  | "Orange"
  | "WarningRed"
  | "Red"
  | "White"
  | "Black01"
  | "Gray80"
  | "Gray60"
  | "Gray50"
  | "Gray40";

export const Colors: Record<ColorKey, string> = {
  CheckureeGreen: "#59996B",
  CheckureeGreen10: "#F0FFF4",
  LightGreen: "#EDF9E3",
  Orange: "#EDC588",
  WarningRed: "#DE6161",
  Red: "#E9B3B3",
  White: "#ffffff",
  Black01: "#222222",
  Gray80: "#8E8E8E",
  Gray60: "#C9C9C9",
  Gray50: "#D5D5D5",
  Gray40: "#D9D9D9",
};

export const Icons: Record<string, { src: string; type: string }> = {
  groups: { src: "groups", type: "material-icons-outlined" },
  sentiment_satisfied_alt: {
    src: "sentiment_satisfied_alt",
    type: "material-icons-outlined",
  },
  watch_later: { src: "watch_later", type: "material-icons-outlined" },
  highlight_off: { src: "highlight_off", type: "material-icons-outlined" },
  add: { src: "add", type: "material-icons-outlined" },
  radio_button_unchecked: {
    src: "radio_button_unchecked",
    type: "material-icons-outlined",
  },
  check_circle: {
    src: "check_circle",
    type: "material-icons-outlined",
  },
};

export const Images: Record<string, string> = { Logo, DetailOpen };
