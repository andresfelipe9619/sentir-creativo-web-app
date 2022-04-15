import React from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

export default function NotFound() {
  return (
    <Box display="flex" alignItems="center" flexDirection="column">
      <Typography variant="h2">404 NOT FOUND</Typography>
      <img
        height="auto"
        width="40%"
        src="https://miro.medium.com/max/5775/1*pjHbZn1erZ1iZ81xUDGD7g.jpeg"
        alt="Not Found"
      />
    </Box>
  );
}
