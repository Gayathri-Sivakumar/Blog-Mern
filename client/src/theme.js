import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#000f", // Main color for primary elements
      contrastText: "#fff", // Ensures text is readable on primary color
    },
    secondary: {
      main: "#ff5a47", // Secondary color for accents
      contrastText: "#fff", // Ensures text is readable on secondary color
    },
    background: {
      default: "#fff", // Smooth background gradient
      paper: "##FAF9F6", // Background color for paper components
    },
    text: {
      primary: "#333", // Dark text for better readability
      secondary: "#555", // Slightly lighter text for less emphasis
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
          background: "#ff61", // Primary color for the AppBar
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          background: "#ff6f61", // Primary button background
          color: "#fff", // Button text color
          borderRadius: "4px", // Slightly rounded corners for buttons
          padding: "8px 16px", // Adequate padding for buttons
          textTransform: "none", // Preserve button text case
          "&:hover": {
            background: "#ff5a47", // Darker shade on hover
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
          },
          "&:disabled": {
            background: "#ddd", // Light gray for disabled buttons
            color: "#aaa", // Lighter text color for disabled state
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          marginBottom: "16px", // Space between form fields
          "& .MuiInputLabel-root": {
            color: "#555", // Color for input labels
          },
          "& .MuiInputBase-input": {
            color: "#333", // Color for input text
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
          color: "#333", // Ensure text is readable
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          padding: "0 16px", // Padding inside Container
          "@media (min-width:600px)": {
            padding: "0 24px", // More padding on larger screens
          },
        },
      },
    },
  },
});

export default theme;
