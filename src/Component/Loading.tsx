import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

interface LoadingScreenProps {
message?: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ message }) => {
return (
<Box
sx={{
position: "fixed",
top: 0,
left: 0,
width: "100vw",
height: "100vh",
backgroundColor: "rgba(255, 255, 255, 0.8)", // semi-transparent overlay
display: "flex",
flexDirection: "column",
justifyContent: "center",
alignItems: "center",
zIndex: 1300, // higher than most components
}}
> <CircularProgress size={60} sx={{color:"#45d39aff"}}/>
<Typography variant="h6" sx={{ mt: 2 }}>
{message} </Typography> </Box>
);
};

export default LoadingScreen;
