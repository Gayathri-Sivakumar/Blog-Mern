import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
  Avatar,
  Box,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const LoginDialog = ({
  open,
  handleClose,
  handleChange,
  handleSubmit,
  credentials,
}) => {
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 3,
          mb: 2,
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <DialogTitle
          sx={{ textAlign: "center", fontWeight: "bold", fontSize: 24 }}
        >
          Login
        </DialogTitle>
      </Box>
      <DialogContent>
        <DialogContentText sx={{ textAlign: "center", mb: 2, mt: 0 }}>
          To access the admin panel, please enter your email and password.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          label="Email Address"
          type="email"
          name="email"
          fullWidth
          required
          variant="outlined"
          placeholder="Enter your email"
          value={credentials.email}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <TextField
          margin="dense"
          label="Password"
          type="password"
          name="password"
          fullWidth
          required
          variant="outlined"
          placeholder="Enter your password"
          value={credentials.password}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions sx={{ justifyContent: "space-between", px: 3, pb: 2 }}>
        <Button onClick={handleClose} variant="outlined" color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Login
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LoginDialog;
