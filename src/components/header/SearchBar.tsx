import { Box, InputBase, useTheme } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export const SearchBar = () => {
  const theme = useTheme();
  
  return (
    <Box
      sx={{
        position: 'relative',
        borderRadius: 20,
        backgroundColor: theme.palette.brand.lightGray,
        '&:hover': {
          backgroundColor: theme.palette.action.hover,
        },
        marginRight: 2,
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: 3,
          width: 'auto',
        },
        display: { xs: 'none', sm: 'block' }
      }}
    >
      <Box sx={{ padding: '0 16px', height: '100%', position: 'absolute', pointerEvents: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <SearchIcon />
      </Box>
      <InputBase
        placeholder="Search…"
        sx={{
          color: 'inherit',
          padding: '8px 8px 8px 0',
          paddingLeft: `calc(1em + 32px)`,
          transition: theme.transitions.create('width'),
          width: '100%',
          [theme.breakpoints.up('md')]: {
            width: '20ch',
          },
        }}
      />
    </Box>
  );
};

export default SearchBar; 