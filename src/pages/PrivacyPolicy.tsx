import React from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';
import MetaTags from '../components/MetaTags';

const PrivacyPolicy: React.FC = () => {
  return (
    <Container maxWidth="md">
      <MetaTags
        title="Privacy Policy - EraseEaseBG"
        description="Read the EraseEaseBG Privacy Policy to understand how we collect, use, and protect your personal information and data when you use our background removal service."
      />
      <Box py={4}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom>
            Privacy Policy
          </Typography>
          
          <Typography variant="body1" paragraph>
            Last updated: {new Date().toLocaleDateString()}
          </Typography>

          <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>
            1. Introduction
          </Typography>
          <Typography variant="body1" paragraph>
            At EraseEaseBG, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your personal information when you use our services.
          </Typography>

          <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>
            2. Advertising and Google AdSense
          </Typography>
          <Typography variant="body1" paragraph>
            We use Google AdSense advertising on our website. Google AdSense uses cookies to serve ads based on your prior visits to our website or other websites. Google's use of advertising cookies enables it and its partners to serve ads based on your visit to our site and/or other sites on the Internet.
          </Typography>
          <Typography variant="body1" paragraph>
            You may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">Google Ads Settings</a>.
          </Typography>

          <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>
            3. Information We Collect
          </Typography>
          <Typography variant="body1" paragraph>
            We collect information that you provide directly to us, including:
          </Typography>
          <ul>
            <li>Images you upload for processing</li>
            <li>Contact information (email address, name)</li>
            <li>Payment information</li>
            <li>Usage data and analytics</li>
          </ul>

          <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>
            4. Cookies and Tracking Technologies
          </Typography>
          <Typography variant="body1" paragraph>
            We use cookies and similar tracking technologies to track activity on our website and hold certain information. Cookies are files with small amount of data which may include an anonymous unique identifier.
          </Typography>
          <Typography variant="body1" paragraph>
            We use the following types of cookies:
          </Typography>
          <ul>
            <li>Essential cookies for website functionality</li>
            <li>Analytics cookies to understand user behavior</li>
            <li>Advertising cookies for personalized ads</li>
            <li>Third-party cookies from our advertising partners</li>
          </ul>

          <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>
            5. Third-Party Advertising
          </Typography>
          <Typography variant="body1" paragraph>
            We work with third-party advertising companies to serve ads when you visit our website. These companies may use information about your visits to this and other websites to provide advertisements about goods and services of interest to you.
          </Typography>
          <Typography variant="body1" paragraph>
            Our advertising partners include:
          </Typography>
          <ul>
            <li>Google AdSense</li>
            <li>Other advertising networks</li>
          </ul>

          <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>
            6. Your Rights
          </Typography>
          <Typography variant="body1" paragraph>
            You have the right to:
          </Typography>
          <ul>
            <li>Access your personal data</li>
            <li>Correct inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Object to data processing</li>
            <li>Opt-out of marketing communications</li>
          </ul>

          <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>
            7. Contact Us
          </Typography>
          <Typography variant="body1" paragraph>
            If you have any questions about this Privacy Policy, please contact us at:
            <br />
            Email: gamazing694@gmail.com
            <br />
            Address: Delhi, India
          </Typography>

          <Typography variant="body1" paragraph>
            Last updated: {new Date().toLocaleDateString()}
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default PrivacyPolicy;
