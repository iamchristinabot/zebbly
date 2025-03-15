import ImageIcon from "@mui/icons-material/Image";
import LinkIcon from "@mui/icons-material/Link";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Paper,
  TextField,
  useTheme,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useStores } from "../../hooks/useStores";
import { ShoppingProfileType } from "../../stores/socialFeedStore";

interface CreatePostProps {
  activeProfile: ShoppingProfileType;
}

const CreatePost = observer(({ activeProfile }: CreatePostProps) => {
  const theme = useTheme();
  const { userStore } = useStores();
  const [postContent, setPostContent] = useState("");

  const handlePostSubmit = () => {
    if (!postContent.trim()) return;
    // TODO: Implement post creation
    console.log("Creating post:", postContent);
    setPostContent("");
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        mb: 3,
        border: `1px solid ${theme.palette.brand.lightGray}`,
        borderRadius: 2,
      }}
    >
      <Box sx={{ display: "flex", gap: 2 }}>
        <Avatar
          src={userStore.currentUser?.avatar}
          alt={userStore.currentUser?.name}
          sx={{ width: 40, height: 40 }}
        />
        <Box sx={{ flex: 1 }}>
          <TextField
            fullWidth
            multiline
            rows={2}
            placeholder={`Share something for your ${activeProfile} style...`}
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box>
              <IconButton size="small" color="primary">
                <ImageIcon />
              </IconButton>
              <IconButton size="small" color="primary">
                <LinkIcon />
              </IconButton>
            </Box>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button variant="text" component={Link} to="/create">
                Advanced Post
              </Button>
              <Button
                variant="contained"
                disabled={!postContent.trim()}
                onClick={handlePostSubmit}
              >
                Post
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
});

export default CreatePost;
