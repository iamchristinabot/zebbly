import {
    Button,
    Paper,
    Typography,
    useTheme
} from "@mui/material";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";



const CompleteYourProfile = observer(() => {
  const theme = useTheme();
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        border: `1px solid ${theme.palette.brand.lightGray}`,
        borderRadius: 2,
        bgcolor: theme.palette.brand.lightTeal,
        mb: 4,
      }}
    >
      <Typography variant="h6" gutterBottom>
        Complete Your Profile
      </Typography>
      <Typography variant="body2" paragraph>
        Add your interests and bio to get personalized product recommendations.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/profile"
      >
        Update Profile
      </Button>
    </Paper>
  );
});

export default CompleteYourProfile;
