import {
    Avatar,
    Box,
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    SxProps,
    Theme
} from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useStores } from '../hooks/useStores';
import type { ShoppingProfile } from '../stores/shoppingProfileStore';

interface ProfileSelectorProps {
  value?: string;
  onChange: (profileId: string) => void;
  label?: string;
  helperText?: string;
  disabled?: boolean;
  error?: boolean;
  required?: boolean;
  minWidth?: number | string;
  showLabel?: boolean;
  sx?: SxProps<Theme>;
}

const ProfileSelector = observer(({
  value,
  onChange,
  label = 'Shopping Profile',
  helperText,
  disabled = false,
  error = false,
  required = false,
  minWidth = 200,
  showLabel = true,
  sx = {}
}: ProfileSelectorProps) => {
  const { shoppingProfileStore } = useStores();
  const profiles = shoppingProfileStore?.profiles || [];
  const loading = shoppingProfileStore?.isLoading || false;

  const handleChange = (event: SelectChangeEvent<string>) => {
    onChange(event.target.value);
  };

  return (
    <FormControl 
      sx={{ minWidth, ...sx }} 
      error={error}
      required={required}
      disabled={disabled || loading}
    >
      {showLabel && <InputLabel id="profile-select-label">{label}</InputLabel>}
      <Select
        labelId="profile-select-label"
        id="profile-select"
        value={value || ''}
        label={showLabel ? label : undefined}
        onChange={handleChange}
      >
        {profiles.length > 0 ? (
          profiles.map((profile: ShoppingProfile) => (
            <MenuItem key={profile.id} value={profile.id}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar 
                  src={profile.avatar} 
                  sx={{ width: 24, height: 24, mr: 1 }}
                />
                {profile.name}
              </Box>
            </MenuItem>
          ))
        ) : (
          <MenuItem disabled>No profiles available</MenuItem>
        )}
      </Select>
      {helperText && (
        <FormHelperText>{helperText}</FormHelperText>
      )}
    </FormControl>
  );
});

export default ProfileSelector; 