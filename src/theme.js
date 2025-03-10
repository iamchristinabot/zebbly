import { createTheme } from '@mui/material/styles';

// Define Zebbly brand colors based on the provided color palette
const zebblyColors = {
  primary: {
    main: '#90abc5', // Color 0 - Blue
    light: '#a6bfd5',
    dark: '#7a91a7',
    contrastText: '#FFFFFF',
  },
  secondary: {
    main: '#bad8d8', // Color 1 - Light Teal
    light: '#d0e5e5',
    dark: '#9eb8b8',
    contrastText: '#333333',
  },
  error: {
    main: '#f4aaa9', // Color 7 - Coral/Pink
    light: '#f7bfbe',
    dark: '#d08e8d',
    contrastText: '#FFFFFF',
  },
  warning: {
    main: '#decfc2', // Color 2 - Beige
    light: '#e8ddd3',
    dark: '#beb0a5',
    contrastText: '#333333',
  },
  info: {
    main: '#aac8c8', // Color 6 - Medium Teal
    light: '#c0d7d7',
    dark: '#8fa9a9',
    contrastText: '#333333',
  },
  success: {
    main: '#d7e6e3', // Color 5 - Light Mint
    light: '#e5efed',
    dark: '#b7c4c1',
    contrastText: '#333333',
  },
  background: {
    default: '#FFFFFF',
    paper: '#F8F8F8',
  },
  text: {
    primary: '#333333',
    secondary: '#959692', // Color 9 - Dark Gray
  },
  // Custom brand colors
  brand: {
    blue: '#90abc5',       // Color 0
    lightTeal: '#bad8d8',  // Color 1
    beige: '#decfc2',      // Color 2
    pink: '#fad5d1',       // Color 3
    mauve: '#e0c9c2',      // Color 4
    mint: '#d7e6e3',       // Color 5
    teal: '#aac8c8',       // Color 6
    coral: '#f4aaa9',      // Color 7
    lightGray: '#cbc9c8',  // Color 8
    darkGray: '#959692',   // Color 9
  }
};

const theme = createTheme({
  palette: {
    primary: zebblyColors.primary,
    secondary: zebblyColors.secondary,
    error: zebblyColors.error,
    warning: zebblyColors.warning,
    info: zebblyColors.info,
    success: zebblyColors.success,
    background: zebblyColors.background,
    text: zebblyColors.text,
    // Add the brand colors to the palette for easy access
    brand: zebblyColors.brand,
  },
  typography: {
    fontFamily: '"Open Sans", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: '"Open Sans", "Helvetica", "Arial", sans-serif',
      fontWeight: 600,
      fontSize: '2.5rem',
    },
    h2: {
      fontFamily: '"Open Sans", "Helvetica", "Arial", sans-serif',
      fontWeight: 600,
      fontSize: '2rem',
    },
    h3: {
      fontFamily: '"Open Sans", "Helvetica", "Arial", sans-serif',
      fontWeight: 600,
      fontSize: '1.75rem',
    },
    h4: {
      fontFamily: '"Open Sans", "Helvetica", "Arial", sans-serif',
      fontWeight: 600,
      fontSize: '1.5rem',
    },
    h5: {
      fontFamily: '"Open Sans", "Helvetica", "Arial", sans-serif',
      fontWeight: 600,
      fontSize: '1.25rem',
    },
    h6: {
      fontFamily: '"Open Sans", "Helvetica", "Arial", sans-serif',
      fontWeight: 600,
      fontSize: '1rem',
    },
    subtitle1: {
      fontWeight: 500,
    },
    button: {
      fontWeight: 600,
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          padding: '8px 16px',
          boxShadow: 'none',
        },
        contained: {
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
      variants: [
        {
          props: { variant: 'contained', color: 'primary' },
          style: {
            backgroundColor: zebblyColors.primary.main,
            color: zebblyColors.primary.contrastText,
          },
        },
        {
          props: { variant: 'outlined' },
          style: {
            borderWidth: 2,
          },
        },
      ],
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          border: `1px solid ${zebblyColors.brand.lightGray}`,
          borderRadius: 8,
          transition: 'transform 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-4px)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          padding: '12px 16px',
          height: 'auto',
          '&.MuiChip-outlined': {
            borderWidth: 1,
            borderColor: zebblyColors.brand.lightGray,
          },
        },
        label: {
          padding: '8px 4px',
          fontSize: '1rem',
          fontWeight: 500,
        },
      },
      variants: [
        {
          props: { variant: 'category' },
          style: {
            backgroundColor: '#FFFFFF',
            color: zebblyColors.brand.blue,
            border: `1px solid ${zebblyColors.brand.blue}20`,
            '&:hover': {
              backgroundColor: zebblyColors.brand.blue + '10',
            },
          },
        },
      ],
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          fontSize: '1rem',
          minWidth: 'auto',
          padding: '12px 16px',
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          height: 3,
          backgroundColor: zebblyColors.brand.coral,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          borderBottom: `1px solid ${zebblyColors.brand.lightGray}`,
          backgroundColor: '#FFFFFF',
          color: zebblyColors.text.primary,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 20,
          },
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          backgroundColor: zebblyColors.brand.mint,
          color: zebblyColors.brand.blue,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          overflow: 'hidden',
        },
      },
    },
  },
});

// Custom components for the theme
theme.components.MuiChip.variants.push(
  {
    props: { variant: 'category', color: 'her' },
    style: {
      backgroundColor: '#FFFFFF',
      color: zebblyColors.brand.coral,
      '&:hover': {
        backgroundColor: zebblyColors.brand.coral + '10',
      },
    },
  },
  {
    props: { variant: 'category', color: 'him' },
    style: {
      backgroundColor: '#FFFFFF',
      color: zebblyColors.brand.blue,
      '&:hover': {
        backgroundColor: zebblyColors.brand.blue + '10',
      },
    },
  },
  {
    props: { variant: 'category', color: 'teens' },
    style: {
      backgroundColor: '#FFFFFF',
      color: zebblyColors.brand.teal,
      '&:hover': {
        backgroundColor: zebblyColors.brand.teal + '10',
      },
    },
  },
  {
    props: { variant: 'category', color: 'kids' },
    style: {
      backgroundColor: '#FFFFFF',
      color: zebblyColors.brand.beige,
      '&:hover': {
        backgroundColor: zebblyColors.brand.beige + '10',
      },
    },
  },
  {
    props: { variant: 'category', color: 'baby' },
    style: {
      backgroundColor: '#FFFFFF',
      color: zebblyColors.brand.pink,
      '&:hover': {
        backgroundColor: zebblyColors.brand.pink + '10',
      },
    },
  }
);

// Add a custom background component for the hero section
theme.components.MuiBox = {
  variants: [
    {
      props: { variant: 'hero' },
      style: {
        background: `linear-gradient(120deg, ${zebblyColors.brand.pink} 0%, ${zebblyColors.brand.mint} 100%)`,
        borderRadius: 16,
        padding: '32px',
        position: 'relative',
        overflow: 'hidden',
      },
    },
    {
      props: { variant: 'section' },
      style: {
        padding: '32px 0',
      },
    },
  ],
};

export default theme; 