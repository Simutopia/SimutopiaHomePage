import React, { createContext, useContext, useState, useCallback } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

const PopperContext = createContext();

export const PopperProvider = ({ children }) => {
  const [popperState, setPopperState] = useState({
    open: false,
    message: "",
    resolve: null,
  });

  const confirm = useCallback((message) => {
    return new Promise((resolve) => {
      setPopperState({ open: true, message, resolve });
    });
  }, []);

  const handleClose = (result) => {
    if (popperState.resolve) {
      popperState.resolve(result);
    }
    setPopperState({ open: false, message: "", resolve: null });
  };

  return (
    <PopperContext.Provider value={{ confirm }}>
      {children}
      <Dialog
        open={popperState.open}
        onClose={() => handleClose(false)}
        aria-labelledby="workspace-confirm-title"
        aria-describedby="workspace-confirm-message"
      >
        <DialogTitle id="workspace-confirm-title">Please confirm</DialogTitle>
        <DialogContent>
          <DialogContentText id="workspace-confirm-message">
            {popperState.message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose(false)}>Cancel</Button>
          <Button onClick={() => handleClose(true)} variant="contained" autoFocus>
            Continue
          </Button>
        </DialogActions>
      </Dialog>
    </PopperContext.Provider>
  );
};

export const usePopper = () => useContext(PopperContext);
