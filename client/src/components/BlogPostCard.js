import { Card, CardContent, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const BlogPostCard = ({ post }) => {
  const { title, shortDescription, images = [], _id } = post;
  const imageUrl =
    images.length > 0
      ? `http://localhost:8081/${images[0].replace(/\\/g, "/")}`
      : null;

  console.log("Post Data:", post);
  console.log("Image URL:", imageUrl);

  return (
    <Card
      sx={{
        width: 345,
        height: 400,
        mb: 2,
        mt: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {imageUrl && (
        <img
          src={imageUrl}
          alt={title}
          style={{ height: "200px", objectFit: "cover" }}
          onError={(e) => {
            console.error("Image failed to load:", e);
            e.target.style.display = "none";
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
        <Button
          component={Link}
          to={`/post/${_id}`} // Use _id to link to the post detail page
          variant="contained"
          sx={{ mt: 2 }}
        >
          Read More
        </Button>
      </CardContent>
    </Card>
  );
};

export default BlogPostCard;
