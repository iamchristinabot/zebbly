import React from 'react';
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Typography,
  Box,
  Chip,
  useTheme,
} from '@mui/material';
import {
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  Comment as CommentIcon,
  Share as ShareIcon,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { FeedItem } from '../stores/socialFeedStore';
import { formatDistanceToNow } from 'date-fns';

interface SocialFeedItemProps {
  item: FeedItem;
  onLike: (itemId: string) => void;
  onComment: (itemId: string) => void;
  onShare: (itemId: string) => void;
}

const SocialFeedItem: React.FC<SocialFeedItemProps> = ({
  item,
  onLike,
  onComment,
  onShare,
}) => {
  const theme = useTheme();

  const handleLike = () => onLike(item.id);
  const handleComment = () => onComment(item.id);
  const handleShare = () => onShare(item.id);

  return (
    <Card
      elevation={0}
      sx={{
        mb: 2,
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 2,
      }}
    >
      <CardHeader
        avatar={
          <Avatar
            src={item.creator.avatar}
            alt={item.creator.name}
            component={Link}
            to={`/profile/${item.creator.id}`}
            sx={{ textDecoration: 'none' }}
          />
        }
        title={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography
              component={Link}
              to={`/profile/${item.creator.id}`}
              sx={{ 
                textDecoration: 'none', 
                color: 'inherit',
                fontWeight: 'bold',
                '&:hover': { color: theme.palette.primary.main }
              }}
            >
              {item.creator.name}
            </Typography>
            <Chip
              label={item.type === 'product' ? 'Product' : 'Playlist'}
              size="small"
              color={item.type === 'product' ? 'primary' : 'secondary'}
              sx={{ height: 20 }}
            />
          </Box>
        }
        subheader={formatDistanceToNow(item.createdAt, { addSuffix: true })}
      />

      {item.type === 'product' ? (
        <>
          <CardMedia
            component="img"
            height="300"
            image={(item.content as any).image}
            alt={(item.content as any).title}
            sx={{ objectFit: 'cover' }}
          />
          <CardContent>
            <Typography variant="h6" gutterBottom>
              {(item.content as any).title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              ${(item.content as any).price} • {(item.content as any).store}
            </Typography>
          </CardContent>
        </>
      ) : (
        <>
          <CardMedia
            component="img"
            height="200"
            image={(item.content as any).coverImage}
            alt={(item.content as any).title}
            sx={{ objectFit: 'cover' }}
          />
          <CardContent>
            <Typography variant="h6" gutterBottom>
              {(item.content as any).title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {(item.content as any).description}
            </Typography>
            <Typography variant="caption" display="block" sx={{ mt: 1 }}>
              {(item.content as any).itemCount} items • {(item.content as any).likes} likes
            </Typography>
          </CardContent>
        </>
      )}

      <CardActions disableSpacing>
        <IconButton onClick={handleLike}>
          {item.isLiked ? (
            <FavoriteIcon color="error" />
          ) : (
            <FavoriteBorderIcon />
          )}
        </IconButton>
        <Typography variant="body2" color="text.secondary" sx={{ mr: 2 }}>
          {item.likes}
        </Typography>
        
        <IconButton onClick={handleComment}>
          <CommentIcon />
        </IconButton>
        <Typography variant="body2" color="text.secondary" sx={{ mr: 2 }}>
          {item.comments}
        </Typography>

        <IconButton onClick={handleShare}>
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default SocialFeedItem; 