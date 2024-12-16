import { Conversation } from "@/types/Conversation";
import Link from "next/link";
import React from "react";
import TrashIcon from "@/icons/TrashIcon";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "rgba(254, 247, 255, 1)",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "1rem",
  backdropFilter: "blur(15px)",
};

const modalBackdropStyle = {
  backdropFilter: "blur(10px)",
};


const ConversationItem = ({ id, title }: Conversation) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDelete = () => {
    // Delete conversation
    handleClose();
  }

  return (
    <>
      <Link href={`/${id}`}>
        <div className="w-full bg-primaryContainer py-4 text-lg rounded-2xl">
          <div className="flex items-center justify-between px-4 pr-6">
            <p className="text-sm md:text-base font-[400]">{title}</p>
            <button onClick={handleOpen}>
              <TrashIcon />
            </button>
          </div>
        </div>
      </Link>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        BackdropProps={{
          style: modalBackdropStyle,
        }}
      >
        <Box sx={style}>
          <div className="flex flex-col gap-8">
            <Typography id="modal-modal-description" sx={{ mt: 2 }} className="text-lg font-[500] text-center">
              {`Are you sure you want to delete ${title}?`}
            </Typography>
            <div className="flex gap-4 justify-between">
                <Button onClick={handleClose} className="w-full rounded-full py-2" style={{ backgroundColor: 'rgba(232, 222, 248, 1)' }}>Cancel</Button>
              <Button onClick={handleDelete} className="w-full rounded-full py-2 bg-red-700 text-white">Delete</Button>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default ConversationItem;
