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
        <Paper key={comment._id} elevation={3} sx={{ p: 3, mb: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Avatar sx={{ bgcolor: "primary.main", color: "white" }}>
              {comment.authorName
                ? comment.authorName.charAt(0).toUpperCase()
                : "?"}
            </Avatar>
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              sx={{ ml: 2, textTransform: "capitalize" }}
            >
              {comment.authorName
                ? comment.authorName.charAt(0).toUpperCase() +
                  comment.authorName.slice(1).toLowerCase()
                : "Anonymous"}
            </Typography>
          </Box>
          <Typography variant="body1" sx={{ mb: 1 }}>
            {comment.content.charAt(0).toUpperCase() + comment.content.slice(1)}
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
