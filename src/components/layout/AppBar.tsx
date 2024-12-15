import React from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

const AppBarComponent = () => {
  return (
    <div>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ bgcolor: 'white', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}>
        <Toolbar>
         <div className="w-16 h-16 rounded-lg bg-primary flex justify-center items-center p-2 my-3">
        <p className="text-center uppercase text-xs">Chatbot</p>
         </div>
        </Toolbar>
      </AppBar>
    </Box>
    </div>
  );
};

export default AppBarComponent;
