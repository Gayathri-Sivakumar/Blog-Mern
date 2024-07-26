// src/components/CommentSection.js
import {
  TextField,
  Button,
  List,
  ListItem,
  Typography,
  Box,
} from "@mui/material";
import { useState } from "react";

const CommentSection = ({ comments }) => {
  const [comment, setComment] = useState("");

  const handleCommentChange = (e) => setComment(e.target.value);
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    // Handle comment submission logic
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Comments
      </Typography>
      <List>
        {comments.map((c, index) => (
          <ListItem key={index}>
            <Typography variant="body2">{c}</Typography>
          </ListItem>
        ))}
      </List>
      <form onSubmit={handleCommentSubmit}>
        <TextField
          label="Add a comment"
          multiline
          rows={4}
          value={comment}
          onChange={handleCommentChange}
          fullWidth
          sx={{ mt: 2 }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default CommentSection;
