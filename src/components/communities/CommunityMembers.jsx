import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Button,
  TextField,
  InputAdornment,
  Divider,
  Chip
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';

const CommunityMembers = ({ communityId }) => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Fetch members data
    setLoading(true);
    // This would be an API call in a real app
    setTimeout(() => {
      // Mock members data
      const mockMembers = [
        {
          id: 'u1',
          name: 'Sarah Johnson',
          username: 'sarahj',
          avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
          role: 'admin',
          joinDate: '2022-05-15T10:30:00Z'
        },
        {
          id: 'u2',
          name: 'Michael Chen',
          username: 'mikechen',
          avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
          role: 'moderator',
          joinDate: '2022-06-20T14:45:00Z'
        },
        {
          id: 'u3',
          name: 'Emily Rodriguez',
          username: 'emilyr',
          avatar: 'https://randomuser.me/api/portraits/women/67.jpg',
          role: 'member',
          joinDate: '2022-07-10T09:15:00Z'
        },
        {
          id: 'u4',
          name: 'David Kim',
          username: 'davidk',
          avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
          role: 'member',
          joinDate: '2022-08-05T16:30:00Z'
        },
        {
          id: 'u5',
          name: 'Jessica Taylor',
          username: 'jesst',
          avatar: 'https://randomuser.me/api/portraits/women/22.jpg',
          role: 'member',
          joinDate: '2022-09-12T11:20:00Z'
        }
      ];
      
      setMembers(mockMembers);
      setLoading(false);
    }, 1000);
  }, [communityId]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredMembers = members.filter(member => 
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box>
      <TextField
        fullWidth
        placeholder="Search members..."
        variant="outlined"
        value={searchQuery}
        onChange={handleSearchChange}
        sx={{ mb: 3 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" component="h3" gutterBottom>
          Community Team
        </Typography>
        <List>
          {filteredMembers
            .filter(member => member.role === 'admin' || member.role === 'moderator')
            .map(member => (
              <ListItem key={member.id} alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar src={member.avatar} alt={member.name} />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography component={Link} to={`/profile/${member.id}`} sx={{ textDecoration: 'none', color: 'inherit', fontWeight: 'medium' }}>
                        {member.name}
                      </Typography>
                      <Chip 
                        label={member.role === 'admin' ? 'Admin' : 'Moderator'} 
                        size="small" 
                        color={member.role === 'admin' ? 'primary' : 'secondary'}
                        sx={{ ml: 1 }}
                      />
                    </Box>
                  }
                  secondary={
                    <Typography variant="body2" color="text.secondary">
                      @{member.username} • Joined {new Date(member.joinDate).toLocaleDateString()}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
        </List>
      </Box>
      
      <Divider sx={{ my: 3 }} />
      
      <Box>
        <Typography variant="h6" component="h3" gutterBottom>
          Members
        </Typography>
        <List>
          {filteredMembers
            .filter(member => member.role === 'member')
            .map(member => (
              <ListItem key={member.id} alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar src={member.avatar} alt={member.name} />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography component={Link} to={`/profile/${member.id}`} sx={{ textDecoration: 'none', color: 'inherit', fontWeight: 'medium' }}>
                      {member.name}
                    </Typography>
                  }
                  secondary={
                    <Typography variant="body2" color="text.secondary">
                      @{member.username} • Joined {new Date(member.joinDate).toLocaleDateString()}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
        </List>
      </Box>
    </Box>
  );
};

export default CommunityMembers; 