// src/components/CommentSection.js
import { Box, Typography, Paper, Avatar, Divider } from "@mui/material";

const CommentSection = ({ comments }) => {
  console.log(comments);
  if (!Array.isArray(comments)) {
    return null;
  }

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Comments
      </Typography>
      {comments.map((comment) => (
        <Paper key={comment._id} elevation={3} sx={{ p: 2, mb: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <Avatar>
              {comment.authorName ? comment.authorName.charAt(0) : "?"}
            </Avatar>
            <Typography variant="subtitle1" fontWeight="bold" sx={{ ml: 2 }}>
              {comment.authorName || "Anonymous"}
            </Typography>
          </Box>
          <Typography variant="body1" sx={{ mb: 1 }}>
            {comment.content}
          </Typography>
          <Divider />
          <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
            {new Date(comment.createdAt).toLocaleDateString()}
          </Typography>
        </Paper>
      ))}
    </Box>
  );
};

export default CommentSection;
