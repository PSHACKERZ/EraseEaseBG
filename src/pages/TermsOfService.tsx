import React from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';

const TermsOfService: React.FC = () => {
  return (
    <Container maxWidth="md">
      <Box py={4}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom>
            Terms of Service
          </Typography>
          
          <Typography variant="body1" paragraph>
            Last updated: January 18, 2025
          </Typography>

          <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>
            1. Acceptance of Terms
          </Typography>
          <Typography variant="body1" paragraph>
            By accessing or using EraseEaseBG's services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our service.
          </Typography>

          <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>
            2. Service Description
          </Typography>
          <Typography variant="body1" paragraph>
            EraseEaseBG provides an AI-powered background removal service for images. We reserve the right to modify, suspend, or discontinue any aspect of our service at any time.
          </Typography>

          <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>
            3. User Responsibilities
          </Typography>
          <Typography variant="body1" paragraph>
            You agree to:
            • Only upload images you have the right to use
            • Not use our service for any illegal purposes
            • Not attempt to disrupt or compromise our service
            • Maintain the security of your account credentials
          </Typography>

          <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>
            4. Intellectual Property
          </Typography>
          <Typography variant="body1" paragraph>
            You retain all rights to your original images. By using our service, you grant us the necessary rights to process your images for the purpose of background removal.
          </Typography>

          <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>
            5. Limitation of Liability
          </Typography>
          <Typography variant="body1" paragraph>
            EraseEaseBG is provided "as is" without any warranties. We are not liable for any damages arising from the use of our service.
          </Typography>

          <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>
            6. Changes to Terms
          </Typography>
          <Typography variant="body1" paragraph>
            We reserve the right to modify these terms at any time. Continued use of the service after changes constitutes acceptance of the new terms.
          </Typography>

          <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>
            7. Contact
          </Typography>
          <Typography variant="body1" paragraph>
            For any questions about these Terms of Service, please contact us through our Contact page.
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default TermsOfService;
