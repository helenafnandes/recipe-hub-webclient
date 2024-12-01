"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Card, CardMedia, CardContent, Typography, Button } from "@mui/material";
import { styled } from "@mui/system";

interface RecipeCardProps {
  id: string;
  title: string;
  preparationMethod: string;
  rating: number;
  numberOfRatings: number;
}

const SingleLineTypography = styled(Typography)({
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

const RecipeCard: React.FC<RecipeCardProps> = ({ id, title, preparationMethod, rating, numberOfRatings }) => {
  const router = useRouter();

  const handleLearnMore = () => {
    router.push(`/recipes/${id}`);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        alt="Recipe"
        src="/placeholder.jpg"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <SingleLineTypography variant="body2" color="text.secondary">
          {preparationMethod}
        </SingleLineTypography>
        <Typography variant="body2" color="text.secondary">
          Rating: {rating} ({numberOfRatings} avaliações)
        </Typography>
      </CardContent>
      <Button size="small" color="primary" onClick={handleLearnMore}>
        Learn More
      </Button>
    </Card>
  );
};

export default RecipeCard;
