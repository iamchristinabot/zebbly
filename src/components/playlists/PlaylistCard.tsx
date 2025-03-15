import React, { useState } from "react";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Avatar,
  IconButton,
  useTheme,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Link } from "react-router-dom";
import type { Playlist } from "../../types";

interface PlaylistCardProps {
  playlist: Playlist;
  isUserPlaylist?: boolean;
  onMenuOpen?: (
    event: React.MouseEvent<HTMLElement>,
    playlistId: string
  ) => void;
}

const PlaylistCard = ({
  playlist,
  isUserPlaylist = false,
  onMenuOpen,
}: PlaylistCardProps) => {
  const theme = useTheme();
  const [liked, setLiked] = useState(playlist.likes || false);

  const handleLike = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    e.preventDefault();
    setLiked(!liked);
    // In a real app, this would call an API to update the like count
  };

  return (
    <Card
      elevation={0}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        border: `1px solid ${theme.palette.brand.lightGray}`,
        borderRadius: 2,
        transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: theme.shadows[2],
        },
      }}
    >
      <CardActionArea
        component={Link}
        to={`/style-playlists/${playlist.id}`}
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
        }}
      >
        <Box sx={{ position: "relative" }}>
          <CardMedia
            component="img"
            height="160"
            image={playlist.coverImage}
            alt={playlist.title}
          />
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              background: "linear-gradient(transparent, rgba(0,0,0,0.7))",
              p: 1,
              display: "flex",
              alignItems: "center",
            }}
          >
            <Avatar
              src={playlist.creator.avatar}
              alt={playlist.creator.name}
              sx={{ width: 24, height: 24, mr: 1 }}
            />
            <Typography
              variant="caption"
              sx={{ color: "white", fontWeight: "medium" }}
            >
              {playlist.creator.name}
            </Typography>
          </Box>
        </Box>

        <CardContent sx={{ flexGrow: 1, p: 2 }}>
          <Typography variant="subtitle1" component="div" gutterBottom noWrap>
            {playlist.title}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mb: 1,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
              height: "2.5em",
            }}
          >
            {playlist.description}
          </Typography>

          <Typography variant="caption" color="text.secondary">
            {playlist.itemCount} items • {playlist.likes} likes
          </Typography>
        </CardContent>
      </CardActionArea>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 1,
        }}
      >
        <IconButton size="small" onClick={handleLike}>
          {liked ? (
            <FavoriteIcon fontSize="small" color="primary" />
          ) : (
            <FavoriteBorderIcon fontSize="small" />
          )}
        </IconButton>

        {isUserPlaylist && (
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              if (onMenuOpen) onMenuOpen(e, playlist.id);
            }}
          >
            <MoreVertIcon fontSize="small" />
          </IconButton>
        )}
      </Box>
    </Card>
  );
};

export default PlaylistCard;
