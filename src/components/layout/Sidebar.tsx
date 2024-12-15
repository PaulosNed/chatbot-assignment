"use client";

import React from "react";
import MenuIcon from "@mui/icons-material/Menu";

import Drawer from "@mui/material/Drawer";
import ConversationList from "./ConversationList";

const Sidebar = () => {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <>
      <button
        onClick={toggleDrawer(true)}
        className="flex md:hidden px-4 md:px-10 items-center py-4"
      >
        <MenuIcon />
      </button>

    <Drawer
      open={open}
      onClose={toggleDrawer(false)}
      PaperProps={{
        sx: {
          borderTopRightRadius: '1.5rem',
          borderBottomRightRadius: '1.5rem',
        },
      }}
    >
      <div className="w-[80vw] px-4 py-5">
        <ConversationList />
      </div>
    </Drawer>
    </>
  );
};

export default Sidebar;
