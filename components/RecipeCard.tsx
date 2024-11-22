"use client";
import React from "react";
import { Card, CardMedia, CardContent, Typography, Button } from "@mui/material";

interface RecipeCardProps {
  title: string;
  description: string;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ title, description }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image="/placeholder.png" // Substituir pelo caminho real
        alt="Recipe"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <Button size="small" color="primary">
        Learn More
      </Button>
    </Card>
  );
};

export default RecipeCard;
