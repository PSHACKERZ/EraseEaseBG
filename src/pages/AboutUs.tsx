import React from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';

const AboutUs: React.FC = () => {
  return (
    <Container maxWidth="md">
      <Box py={4}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom>
            About Us
          </Typography>
          <Typography variant="body1" paragraph>
            Welcome to EraseEaseBG, your go-to solution for seamless background removal. We are passionate about making professional-grade image editing accessible to everyone.
          </Typography>
          <Typography variant="body1" paragraph>
            Our mission is to provide a user-friendly, efficient tool that helps individuals and businesses transform their images with just a few clicks. Whether you're a professional photographer, e-commerce business owner, or someone who loves creating stunning visuals, EraseEaseBG is here to make your work easier.
          </Typography>
          <Typography variant="body1" paragraph>
            Using cutting-edge AI technology, we've developed a powerful background removal tool that delivers high-quality results while maintaining the integrity of your original images.
          </Typography>
          <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
            Why Choose EraseEaseBG?
          </Typography>
          <Typography variant="body1" paragraph>
            • Advanced AI Technology
            • User-Friendly Interface
            • Fast Processing
            • High-Quality Results
            • Secure Image Processing
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default AboutUs;
