"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Card, CardMedia, CardContent, Typography, Button, Box, IconButton } from "@mui/material";
import { styled } from "@mui/system";
import { Star, StarBorder } from "@mui/icons-material";
import { ROUTES } from "../utils/constants";

interface RecipeCardProps {
  id: string;
  title: string;
  preparationMethod: string;
  rating: number;
  numberOfRatings: number;
  onDelete?: (id: string) => void; // Adiciona a função de exclusão opcional
}

const SingleLineTypography = styled(Typography)({
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

const RecipeCard: React.FC<RecipeCardProps> = ({ id, title, preparationMethod, rating, numberOfRatings, onDelete }) => {
  const router = useRouter();

  const handleLearnMore = () => {
    router.push(`/recipes/${id}`);
  };

  const handleDelete = async () => {
    if (onDelete) {
      onDelete(id);
    }
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
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {[...Array(5)].map((_, index) => (
            index < rating ? <Star key={index} color="primary" /> : <StarBorder key={index} color="primary" />
          ))}
          <Typography variant="body2" color="text.secondary" sx={{ marginLeft: 1 }}>
            ({numberOfRatings} avaliações)
          </Typography>
        </Box>
      </CardContent>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: 1 }}>
        <Button size="small" color="primary" onClick={handleLearnMore}>
          Learn More
        </Button>
        {onDelete && (
          <IconButton size="small" color="secondary" onClick={handleDelete}>
            Delete
          </IconButton>
        )}
      </Box>
    </Card>
  );
};

export default RecipeCard;
