import { createTheme } from '@mui/material/styles';

// Mercari-inspired color palette with a friendlier touch
const colors = {
  primary: {
    main: '#4E41D9', // Mercari purple/blue from logo
    light: '#7B71E3',
    dark: '#3730A3',
    contrastText: '#FFFFFF',
  },
  secondary: {
    main: '#FF0211', // Mercari red
    light: '#FF5A5F',
    dark: '#C70012',
    contrastText: '#FFFFFF',
  },
  error: {
    main: '#FF0211',
    light: '#FF5A5F',
    dark: '#C70012',
    contrastText: '#FFFFFF',
  },
  warning: {
    main: '#FFA000',
    light: '#FFC107',
    dark: '#FF8F00',
    contrastText: '#000000',
  },
  info: {
    main: '#4E41D9',
    light: '#7B71E3',
    dark: '#3730A3',
    contrastText: '#FFFFFF',
  },
  success: {
    main: '#4CAF50',
    light: '#81C784',
    dark: '#388E3C',
    contrastText: '#FFFFFF',
  },
  text: {
    primary: '#333333',
    secondary: '#757575',
    disabled: '#BDBDBD',
  },
  background: {
    default: '#F8F8F8', // Lighter background for a friendlier feel
    paper: '#FFFFFF',
  },
  divider: '#EEEEEE',
  // Custom brand colors
  brand: {
    lightGray: '#F0F0F0',
    mediumGray: '#CCCCCC',
    darkGray: '#757575',
    black: '#333333',
    red: '#FF0211',
    purple: '#4E41D9',
  },
};

// Create the theme
const theme = createTheme({
  palette: colors,
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontWeight: 600, // Slightly less bold for a friendlier look
      fontSize: '2.5rem',
    },
    h2: {
      fontWeight: 600,
      fontSize: '2rem',
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.75rem',
    },
    h4: {
      fontWeight: 500, // Medium weight for a friendlier look
      fontSize: '1.5rem',
    },
    h5: {
      fontWeight: 500,
      fontSize: '1.25rem',
    },
    h6: {
      fontWeight: 500,
      fontSize: '1rem',
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 500,
    },
    subtitle2: {
      fontSize: '0.875rem',
      fontWeight: 500,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6, // Increased line height for better readability
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
    },
    button: {
      textTransform: 'none', // Mercari doesn't use uppercase buttons
      fontWeight: 500, // Medium weight for a friendlier look
    },
  },
  shape: {
    borderRadius: 8, // More rounded corners for a friendlier feel
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '10px 20px',
          fontWeight: 500,
          fontSize: '0.9375rem',
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
          },
        },
        outlined: {
          borderWidth: 1.5, // Slightly thicker border
        },
      },
      defaultProps: {
        disableElevation: true,
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.05)',
          borderRadius: 12, // More rounded cards
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: 20,
          '&:last-child': {
            paddingBottom: 20,
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 16, // Fully rounded chips like Mercari
          fontWeight: 500,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0px 1px 5px rgba(0, 0, 0, 0.05)',
        },
      },
      defaultProps: {
        color: 'default',
        elevation: 0,
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          minWidth: 'auto',
          padding: '12px 16px',
          borderRadius: 0,
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          height: 3,
          borderRadius: 1.5,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.05)',
        },
        elevation1: {
          boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.05)',
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: colors.divider,
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          paddingTop: 12,
          paddingBottom: 12,
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          border: `1px solid ${colors.divider}`,
        },
      },
    },
    MuiBadge: {
      styleOverrides: {
        badge: {
          fontWeight: 500,
          borderRadius: 12, // Fully rounded badges
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          padding: 10,
        },
      },
    },
    // Add styles for the search field like Mercari's
    MuiInputBase: {
      styleOverrides: {
        root: {
          borderRadius: 20, // Fully rounded search field
          backgroundColor: '#F0F0F0',
          '&.Mui-focused': {
            backgroundColor: '#FFFFFF',
            boxShadow: '0px 0px 0px 2px rgba(78, 65, 217, 0.2)',
          },
        },
        input: {
          padding: '12px 16px',
        },
      },
    },
    // Navigation tabs like Mercari's bottom navigation
    MuiBottomNavigation: {
      styleOverrides: {
        root: {
          height: 60,
        },
      },
    },
    MuiBottomNavigationAction: {
      styleOverrides: {
        root: {
          padding: '8px 0',
          minWidth: 'auto',
          '&.Mui-selected': {
            paddingTop: 8,
          },
        },
        label: {
          fontSize: '0.75rem',
          '&.Mui-selected': {
            fontSize: '0.75rem',
          },
        },
      },
    },
  },
});

export default theme; 