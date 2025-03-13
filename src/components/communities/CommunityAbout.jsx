import React from 'react';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Chip
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import RuleIcon from '@mui/icons-material/Rule';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CategoryIcon from '@mui/icons-material/Category';
import PeopleIcon from '@mui/icons-material/People';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

const CommunityAbout = ({ community }) => {
  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" component="h3" gutterBottom>
          About This Community
        </Typography>
        <Typography variant="body1" paragraph>
          {community.longDescription}
        </Typography>
        
        <List sx={{ mt: 2 }}>
          <ListItem>
            <ListItemIcon>
              <CalendarTodayIcon />
            </ListItemIcon>
            <ListItemText 
              primary="Created"
              secondary={new Date(community.createdAt).toLocaleDateString(undefined, { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            />
          </ListItem>
          
          <ListItem>
            <ListItemIcon>
              <CategoryIcon />
            </ListItemIcon>
            <ListItemText 
              primary="Category"
              secondary={community.category}
            />
          </ListItem>
          
          <ListItem>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText 
              primary="Members"
              secondary={community.memberCount.toLocaleString()}
            />
          </ListItem>
          
          <ListItem>
            <ListItemIcon>
              <ChatBubbleOutlineIcon />
            </ListItemIcon>
            <ListItemText 
              primary="Posts"
              secondary={community.postCount.toLocaleString()}
            />
          </ListItem>
        </List>
      </Paper>
      
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" component="h3" gutterBottom>
          Community Rules
        </Typography>
        <List>
          {community.rules.map((rule, index) => (
            <ListItem key={index}>
              <ListItemIcon>
                <RuleIcon />
              </ListItemIcon>
              <ListItemText primary={rule} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default CommunityAbout; 