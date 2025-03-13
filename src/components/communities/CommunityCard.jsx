import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  Chip,
  Avatar,
  CardActionArea
} from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { Link } from 'react-router-dom';

const CommunityCard = ({ community }) => {
  const { id, name, description, memberCount, postCount, tags, image, isJoined } = community;

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardActionArea component={Link} to={`/communities/${id}`}>
        <CardMedia
          component="img"
          height="140"
          image={image}
          alt={name}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h6" component="div" noWrap>
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            mb: 2
          }}>
            {description}
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
            {tags.slice(0, 3).map(tag => (
              <Chip key={tag} label={tag} size="small" />
            ))}
          </Box>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <PeopleIcon fontSize="small" color="action" />
              <Typography variant="body2" color="text.secondary">
                {memberCount.toLocaleString()}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <ChatBubbleOutlineIcon fontSize="small" color="action" />
              <Typography variant="body2" color="text.secondary">
                {postCount.toLocaleString()}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </CardActionArea>
      <Box sx={{ p: 2, pt: 0 }}>
        <Button 
          variant={isJoined ? "outlined" : "contained"} 
          fullWidth
          color={isJoined ? "primary" : "primary"}
        >
          {isJoined ? "Joined" : "Join"}
        </Button>
      </Box>
    </Card>
  );
};

export default CommunityCard; 