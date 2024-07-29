import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#000000", // Main color for primary elements
      contrastText: "#ffffff", // Ensures text is readable on primary color
    },
    secondary: {
      main: "#ff5a47", // Secondary color for accents
      contrastText: "#ffffff", // Ensures text is readable on secondary color
    },
    background: {
      default: "#ffffff", // Smooth background gradient
      paper: "#FAF9F6", // Background color for paper components
    },
    text: {
      primary: "#333333", // Dark text for better readability
      secondary: "#555555", // Slightly lighter text for less emphasis
    },
  },
  typography: {
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    h1: {
      fontSize: "2rem",
      fontWeight: 600,
    },
    h2: {
      fontSize: "1.75rem",
      fontWeight: 500,
    },
    h3: {
      fontSize: "1.5rem",
      fontWeight: 400,
    },
    body1: {
      fontSize: "1rem",
    },
    body2: {
      fontSize: "0.875rem",
    },
    body3: {
      fontSize: "0.675rem",
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#000000",
          padding: "0",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          background: "#EFB596", // Primary button background
          color: "#ffffff", // Button text color
          borderRadius: "4px", // Slightly rounded corners for buttons
          padding: "8px 16px", // Adequate padding for buttons
          textTransform: "none", // Preserve button text case
          "&:hover": {
            background: "#E7905C", // Darker shade on hover
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
          },
          "&:disabled": {
            background: "#dddddd", // Light gray for disabled buttons
            color: "#aaaaaa", // Lighter text color for disabled state
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          marginBottom: "16px", // Space between form fields
          "& .MuiInputLabel-root": {
            color: "#555555", // Color for input labels
          },
          "& .MuiInputBase-input": {
            color: "#333333", // Color for input text
          },
          "& .MuiFormHelperText-root": {
            color: "#d32f2f", // Red color for error messages
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          padding: "24px", // Padding inside dialog
          borderRadius: "8px", // Rounded corners for dialog
          background: "#FAF9F6", // White background for dialog
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: "#333333",
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          padding: "0 16px",
          maxWidth: "false", // Allow full width for large screens
          "@media (min-width:600px)": {
            padding: "0 16px",
          },
          "@media (min-width:1200px)": {
            padding: "0 24px", // Adjust padding for larger screens
          },
        },
      },
    },
  },
});

export default theme;
