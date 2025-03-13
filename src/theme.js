import { createTheme } from '@mui/material/styles';

// Pinterest-inspired aesthetic (without the red)
const colors = {
  primary: {
    main: '#6C5CE7', // Soft purple - inspirational but not corporate
    light: '#A29BFE',
    dark: '#5541D7',
    contrastText: '#FFFFFF',
  },
  secondary: {
    main: '#333333', // Rich black for buttons
    light: '#555555',
    dark: '#222222',
    contrastText: '#FFFFFF',
  },
  error: {
    main: '#FF7675', // Soft coral
    light: '#FF9A99',
    dark: '#E05756',
    contrastText: '#FFFFFF',
  },
  warning: {
    main: '#FDCB6E', // Muted yellow
    light: '#FFE29D',
    dark: '#E0B25C',
    contrastText: '#333333',
  },
  info: {
    main: '#74B9FF', // Soft blue
    light: '#A3D0FF',
    dark: '#5A99DB',
    contrastText: '#FFFFFF',
  },
  success: {
    main: '#55EFC4', // Mint green
    light: '#7FFFD4',
    dark: '#41C7A7',
    contrastText: '#333333',
  },
  text: {
    primary: '#2D3436', // Soft black
    secondary: '#636E72', // Medium gray
    disabled: '#B2BEC3',
  },
  background: {
    default: '#FAFAFA', // Very light gray
    paper: '#FFFFFF',
  },
  divider: '#E9ECEF', // Subtle off-white divider
  // Custom brand colors
  brand: {
    softPurple: '#6C5CE7', // Primary brand color
    black: '#333333', // Secondary for buttons
    lavenderMist: '#E2D8F3', // Light purple
    deepLavender: '#5246B8', // Darker purple
    softTeal: '#B4E0E0', // Soft teal/aqua
    dustyRose: '#D8A9B7', // Muted pink
    slateBlue: '#7986CB', // Soft blue with purple undertones
    mintGreen: '#B5E6D8', // Soft mint
    paleLilac: '#D0C4DF', // Very soft purple
    lightGray: '#F0F2F5', // Background gray
  },
};

// Create the theme
const theme = createTheme({
  palette: colors,
  typography: {
    fontFamily: [
      'Montserrat',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontWeight: 600,
      fontSize: '2rem',
      color: colors.text.primary,
      letterSpacing: '-0.01em',
    },
    h2: {
      fontWeight: 600,
      fontSize: '1.75rem',
      color: colors.text.primary,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.5rem',
      color: colors.text.primary,
    },
    h4: {
      fontWeight: 500,
      fontSize: '1.25rem',
      color: colors.text.primary,
    },
    h5: {
      fontWeight: 500,
      fontSize: '1.1rem',
      color: colors.text.primary,
    },
    h6: {
      fontWeight: 500,
      fontSize: '1rem',
      color: colors.text.primary,
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 500,
      color: colors.text.secondary,
      letterSpacing: '0.01em',
    },
    subtitle2: {
      fontSize: '0.875rem',
      fontWeight: 500,
      color: colors.text.secondary,
      letterSpacing: '0.01em',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
      color: colors.text.primary,
      fontFamily: [
        'Source Sans Pro',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
      ].join(','),
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
      color: colors.text.secondary,
      fontFamily: [
        'Source Sans Pro',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
      ].join(','),
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
      letterSpacing: '0.02em',
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '10px 20px',
          fontWeight: 500,
          boxShadow: 'none',
          transition: 'all 0.2s ease-in-out',
        },
        contained: {
          '&:hover': {
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
            transform: 'translateY(-1px)',
          },
        },
        containedSecondary: {
          '&:hover': {
            boxShadow: '0px 4px 8px rgba(231, 111, 81, 0.2)',
          },
        },
        outlined: {
          borderWidth: 1.5, // Slightly thicker border for a crafted feel
          '&:hover': {
            borderWidth: 1.5,
          },
        },
        text: {
          '&:hover': {
            backgroundColor: 'rgba(42, 157, 143, 0.05)',
          },
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
          borderRadius: 12,
          transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.08)',
          },
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
            '&.Mui-focused': {
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: colors.primary.main,
                borderWidth: 2,
              },
            },
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: colors.primary.light,
          },
        },
        notchedOutline: {
          borderColor: colors.divider,
          transition: 'border-color 0.2s ease-in-out',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 16, // More rounded chips
          backgroundColor: colors.brand.cream,
          color: colors.text.primary,
          '&.MuiChip-clickable:hover': {
            backgroundColor: colors.brand.sand,
          },
        },
        outlined: {
          borderColor: colors.divider,
          borderWidth: 1.5, // Slightly thicker border for a crafted feel
        },
        colorPrimary: {
          backgroundColor: 'rgba(42, 157, 143, 0.1)',
          color: colors.primary.dark,
        },
        colorSecondary: {
          backgroundColor: 'rgba(231, 111, 81, 0.1)',
          color: colors.secondary.dark,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          borderBottom: `1px solid ${colors.divider}`,
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
          '&.Mui-selected': {
            color: colors.primary.main,
          },
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
          borderRadius: 12,
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
    MuiRadio: {
      styleOverrides: {
        root: {
          color: colors.primary.main,
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: colors.primary.main,
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        outlined: {
          borderRadius: 8,
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          borderRadius: 8,
          boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.05)',
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: 'rgba(42, 157, 143, 0.05)',
          },
          '&.Mui-selected': {
            backgroundColor: 'rgba(42, 157, 143, 0.1)',
            '&:hover': {
              backgroundColor: 'rgba(42, 157, 143, 0.15)',
            },
          },
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          '&:hover': {
            backgroundColor: 'rgba(42, 157, 143, 0.05)',
          },
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          backgroundColor: colors.primary.light,
        },
      },
    },
    MuiBadge: {
      styleOverrides: {
        badge: {
          fontWeight: 500,
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        root: {
          padding: 8,
        },
        track: {
          backgroundColor: colors.brand.clay,
          opacity: 0.5,
        },
        thumb: {
          backgroundColor: '#FFFFFF',
        },
      },
    },
  },
});

export default theme; 