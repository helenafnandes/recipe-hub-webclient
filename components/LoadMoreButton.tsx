import React from "react";
import { Button, CircularProgress } from "@mui/material";

interface LoadMoreButtonProps {
  loading: boolean;
  loadMore: () => void;
}

const LoadMoreButton: React.FC<LoadMoreButtonProps> = ({ loading, loadMore }) => {
  return (
    <>
      {loading ? (
        <CircularProgress sx={{ margin: "2rem auto", display: "block" }} />
      ) : (
        <Button
          variant="contained"
          color="primary"
          onClick={loadMore}
          sx={{ marginTop: "2rem" }}
        >
          Load More
        </Button>
      )}
    </>
  );
};

export default LoadMoreButton;
