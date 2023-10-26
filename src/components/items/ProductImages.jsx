import React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function ProductImages({ single, index, setIndex }) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const ChangePicture = (index) => {
    setIndex(index);
  };

  return (
    <Box display="block" flexWrap="wrap">
      {single?.image?.map((pic, index) => (
        <Card
          key={index}
          sx={{
            width: isSmallScreen ? "100%" : "225px",
            height: isSmallScreen ? "auto" : "160px",
            marginRight: isSmallScreen ? "0" : "10px",
            marginBottom: isSmallScreen ? "5px" : "2px",
            padding: "10px",
            cursor: "pointer",
          }}
        >
          <CardMedia
            component="img"
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
            onClick={() => ChangePicture(index)}
            image={`http://localhost:5000/uploads/product/${pic}`}
            alt="Product Image"
          />
        </Card>
      ))}
    </Box>
  );
}
