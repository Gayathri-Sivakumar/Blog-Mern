import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Link } from "react-router-dom";
import ArrowForward from "@mui/icons-material/ArrowForward";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const BlogPostCard = ({ post, admin, handleDeleteClick }) => {
  const { title, shortDescription, images = [], _id } = post;
  const imageUrl =
    images.length > 0
      ? `https://blog-mern-api-nine.vercel.app/${images[0].replace(/\\/g, "/")}`
      : null;

  return (
    <Card
      sx={{
        width: 345,
        height: 400,
        mb: 2,
        mt: 3,
        display: "flex",
        flexDirection: "column",
        position: "relative",
        boxShadow: 3,
      }}
    >
      {imageUrl && (
        <img
          src={imageUrl}
          alt={title}
          style={{ height: "200px", objectFit: "cover" }}
          onError={(e) => {
            e.target.src = "/path/to/default/image.jpg";
          }}
        />
      )}
      <CardContent>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1 }}>
          {shortDescription}
        </Typography>
      </CardContent>
      <Box
        sx={{
          position: "absolute",
          bottom: 16,
          width: "100%",
          px: 2,
          display: "flex",
          justifyContent: admin ? "space-between" : "center",
          alignItems: "center",
        }}
      >
        <Button
          component={Link}
          to={`/post/${_id}`}
          variant="contained"
          endIcon={<ArrowForward />}
          fullWidth={!admin}
        >
          Read More
        </Button>
        {admin && (
          <Box display="flex" alignItems="center">
            <Tooltip title="Edit">
              <IconButton
                component={Link}
                to={`/admin/edit/${_id}`}
                color="primary"
                size="small"
                sx={{ ml: 1 }}
              >
                <EditIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton
                onClick={() => handleDeleteClick(_id)}
                color="error"
                size="small"
                sx={{ ml: 1 }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        )}
      </Box>
    </Card>
  );
};

export default BlogPostCard;
