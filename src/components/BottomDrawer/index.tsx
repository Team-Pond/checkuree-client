import React from "react";

// Components
import { Drawer } from "@mui/material";
import { Global, css } from "@emotion/react";

// Types
interface PropsType {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const BottomDrawer = ({ open, onClose, children }: PropsType) => {
  return (
    <>
      <Global
        styles={css`
          .MuiPaper-root {
            height: 95vh !important;
            border-top-left-radius: 32px;
            border-top-right-radius: 32px;
          }
        `}
      />
      <Drawer anchor="bottom" open={open} onClose={onClose}>
        {children}
      </Drawer>
    </>
  );
};

export default BottomDrawer;
