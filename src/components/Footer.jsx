import { Box } from "@mui/system";
import React from "react";
import img from "../assets/ekart.webp"
const Footer = () => {
  return (
    <Box className="bg-gray-800 p-4 text-white">
      <Box className="flex justify-center">
        <img src={img}  alt="QKart-icon" className="h-10 w-auto" />
      </Box>
      <p className="mt-2 text-center">
        EKart is your one stop solution to buy the latest trending items
        with India's Fastest Delivery to your doorstep
      </p>
    </Box>
  );
};

export default Footer;