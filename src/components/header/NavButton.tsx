import { Button, ButtonProps, useTheme } from '@mui/material';
import React from 'react';

interface NavButtonProps extends Omit<ButtonProps, 'startIcon'> {
  children: React.ReactNode;
  active: boolean;
  startIcon: React.ReactNode;
}

export const NavButton = ({ children, active, startIcon, ...props }: NavButtonProps) => {
  const theme = useTheme();
  
  return (
    <Button
      fullWidth
      sx={{
        justifyContent: 'flex-start',
        padding: '8px 16px',
        marginBottom: 1,
        borderRadius: 2,
        color: active ? theme.palette.primary.main : theme.palette.text.primary,
        backgroundColor: active ? theme.palette.primary.light + '20' : 'transparent',
        '&:hover': {
          backgroundColor: active ? theme.palette.primary.light + '30' : theme.palette.action.hover,
        },
      }}
      startIcon={startIcon}
      {...props}
    >
      {children}
    </Button>
  );
};

export default NavButton; 