import React, { useState, useRef } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Paper, 
  TextField, 
  Button, 
  Alert, 
  Snackbar,
  Card,
  CardContent,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CircularProgress
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SendIcon from '@mui/icons-material/Send';
import BusinessIcon from '@mui/icons-material/Business';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import ScheduleIcon from '@mui/icons-material/Schedule';
import emailjs from 'emailjs-com';
import { APP_NAME } from '../lib/constants';

// EmailJS configuration - using public keys for demo purposes
const EMAILJS_SERVICE_ID = 'service_steelsyncpro'; // Replace with your actual service ID
const EMAILJS_TEMPLATE_ID = 'steelsyncpr_contact_form'; // Replace with your actual template ID
const EMAILJS_USER_ID = 'HipnufWZiuaQSArQ1'; // Replace with your actual public key

const Contact: React.FC = () => {
  const form = useRef<HTMLFormElement>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [messageError, setMessageError] = useState(false);
  const [sending, setSending] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

  const validateEmail = (email: string) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset errors
    setNameError(false);
    setEmailError(false);
    setMessageError(false);
    
    // Validate inputs
    let hasError = false;
    
    if (!name.trim()) {
      setNameError(true);
      hasError = true;
    }
    
    if (!email.trim() || !validateEmail(email)) {
      setEmailError(true);
      hasError = true;
    }
    
    if (!message.trim()) {
      setMessageError(true);
      hasError = true;
    }
    
    if (hasError) return;
    
    // For demo purposes, simulate email sending
    setSending(true);
    
    try {
      // In a real implementation, use EmailJS to send the email
      const templateParams = {
        from_name: name,
        from_email: email,
        subject: subject || `New contact form submission from ${name}`,
        message: message,
        to_email: 'info@steelsyncpro.com'
      };
      
      // Initialize EmailJS with your user ID
      emailjs.init(EMAILJS_USER_ID);
      
      // Send the email
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_USER_ID
      );
      
      // Show success message
      setSnackbarMessage('Your message has been sent successfully! We will get back to you soon.');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      
      // Reset form
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
      
      if (form.current) {
        form.current.reset();
      }
    } catch (error) {
      console.error('Error sending email:', error);
      
      // Show error message
      setSnackbarMessage('Failed to send your message. Please try again later.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    } finally {
      setSending(false);
    }
  };

  return (
    <Box>
      {/* Hero Section */}
      <Box 
        sx={{ 
          bgcolor: 'primary.main', 
          color: 'white',
          py: { xs: 6, md: 10 },
          position: 'relative',
          overflow: 'hidden',
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(135deg, rgba(44, 62, 80, 0.9) 0%, rgba(52, 73, 94, 0.8) 100%)',
            zIndex: 1
          }
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="overline" component="div" sx={{ fontWeight: 'bold', letterSpacing: 2, mb: 1 }}>
                GET IN TOUCH
              </Typography>
              <Typography variant="h2" component="h1" gutterBottom fontWeight="bold" sx={{ 
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                lineHeight: 1.2,
                mb: 3
              }}>
                Contact Us
              </Typography>
              <Typography variant="h6" paragraph sx={{ mb: 4, opacity: 0.9, fontWeight: 'normal' }}>
                Have questions about {APP_NAME}? Our team is here to help. Reach out to us and we'll get back to you as soon as possible.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'block' } }}>
              <Box 
                component="img"
                src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80"
                alt="Contact us"
                sx={{ 
                  width: '100%', 
                  borderRadius: 4,
                  boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                  transform: 'perspective(1000px) rotateY(-5deg)',
                  transition: 'transform 0.5s ease',
                  '&:hover': {
                    transform: 'perspective(1000px) rotateY(0deg)'
                  }
                }}
              />
            </Grid>
          </Grid>
        </Container>
        <Box 
          component="div" 
          sx={{ 
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'url(https://images.unsplash.com/photo-1423666639041-f56000c27a9a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: 0,
            opacity: 0.2
          }}
        />
      </Box>

      {/* Contact Form Section */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Grid container spacing={6}>
          {/* Contact Form */}
          <Grid item xs={12} md={7}>
            <Paper sx={{ p: 4, borderRadius: 2 }}>
              <Typography variant="h4" component="h2" gutterBottom fontWeight="bold">
                Send Us a Message
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph sx={{ mb: 4 }}>
                Fill out the form below and our team will get back to you within 24 hours.
              </Typography>
              
              <Box component="form" ref={form} onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Your Name"
                      name="user_name"
                      fullWidth
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      error={nameError}
                      helperText={nameError ? "Please enter your name" : ""}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Email Address"
                      name="user_email"
                      fullWidth
                      required
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      error={emailError}
                      helperText={emailError ? "Please enter a valid email address" : ""}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Subject"
                      name="subject"
                      fullWidth
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Message"
                      name="message"
                      fullWidth
                      required
                      multiline
                      rows={6}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      error={messageError}
                      helperText={messageError ? "Please enter your message" : ""}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      fullWidth
                      disabled={sending}
                      startIcon={sending ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
                      sx={{ py: 1.5 }}
                    >
                      {sending ? 'Sending...' : 'Send Message'}
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Grid>
          
          {/* Contact Information */}
          <Grid item xs={12} md={5}>
            <Card sx={{ mb: 4, borderRadius: 2 }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h5" component="h3" gutterBottom fontWeight="bold">
                  Contact Information
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <Avatar sx={{ bgcolor: 'primary.main' }}>
                        <EmailIcon />
                      </Avatar>
                    </ListItemIcon>
                    <ListItemText 
                      primary="Email" 
                      secondary={
                        <Typography 
                          component="a" 
                          href="mailto:info@steelsyncpro.com" 
                          color="primary"
                          sx={{ textDecoration: 'none' }}
                        >
                          info@steelsyncpro.com
                        </Typography>
                      } 
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Avatar sx={{ bgcolor: 'primary.main' }}>
                        <PhoneIcon />
                      </Avatar>
                    </ListItemIcon>
                    <ListItemText 
                      primary="Phone" 
                      secondary={
                        <Typography 
                          component="a" 
                          href="tel:+1-555-123-4567" 
                          color="primary"
                          sx={{ textDecoration: 'none' }}
                        >
                          +1 (555) 123-4567
                        </Typography>
                      } 
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Avatar sx={{ bgcolor: 'primary.main' }}>
                        <LocationOnIcon />
                      </Avatar>
                    </ListItemIcon>
                    <ListItemText 
                      primary="Address" 
                      secondary="1234 Steel Avenue, Pittsburgh, PA 15213, USA" 
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
            
            <Card sx={{ mb: 4, borderRadius: 2 }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h5" component="h3" gutterBottom fontWeight="bold">
                  Business Hours
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <ScheduleIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Monday - Friday" 
                      secondary="9:00 AM - 6:00 PM EST" 
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <ScheduleIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Saturday" 
                      secondary="10:00 AM - 2:00 PM EST" 
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <ScheduleIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Sunday" 
                      secondary="Closed" 
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
            
            <Card sx={{ borderRadius: 2 }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h5" component="h3" gutterBottom fontWeight="bold">
                  Departments
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <BusinessIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Sales" 
                      secondary={
                        <Typography 
                          component="a" 
                          href="mailto:sales@steelsyncpro.com" 
                          color="primary"
                          sx={{ textDecoration: 'none' }}
                        >
                          sales@steelsyncpro.com
                        </Typography>
                      } 
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <SupportAgentIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Support" 
                      secondary={
                        <Typography 
                          component="a" 
                          href="mailto:support@steelsyncpro.com" 
                          color="primary"
                          sx={{ textDecoration: 'none' }}
                        >
                          support@steelsyncpro.com
                        </Typography>
                      } 
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Map Section */}
      <Box sx={{ height: '400px', width: '100%', mb: 10 }}>
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d96706.50013548559!2d-80.05903184179685!3d40.43539401793123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8834f16f48068503%3A0x8df915a15aa21b34!2sPittsburgh%2C%20PA!5e0!3m2!1sen!2sus!4v1653661275312!5m2!1sen!2sus" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          title="Steel Sync Pro Location"
        ></iframe>
      </Box>

      {/* FAQ Section */}
      <Container maxWidth="lg" sx={{ mb: 10 }}>
        <Box textAlign="center" mb={6}>
          <Typography variant="h3" component="h2" gutterBottom fontWeight="bold">
            Frequently Asked Questions
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto' }}>
            Find answers to common questions about {APP_NAME}.
          </Typography>
        </Box>
        
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%', borderRadius: 2 }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h6" component="h3" gutterBottom fontWeight="bold">
                  How quickly can {APP_NAME} be implemented?
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Implementation time varies based on your specific requirements, but most customers are up and running within 2-4 weeks. Our implementation team works closely with you to ensure a smooth transition.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%', borderRadius: 2 }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h6" component="h3" gutterBottom fontWeight="bold">
                  Can {APP_NAME} integrate with our existing systems?
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Yes, {APP_NAME} is designed to integrate with most common ERP systems, manufacturing equipment, and business software. We offer pre-built integrations for popular systems and can develop custom integrations as needed.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%', borderRadius: 2 }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h6" component="h3" gutterBottom fontWeight="bold">
                  Is training provided with the software?
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Yes, we provide comprehensive training for all users as part of the implementation process. We also offer ongoing training resources, including documentation, video tutorials, and webinars.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%', borderRadius: 2 }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h6" component="h3" gutterBottom fontWeight="bold">
                  What kind of support is available?
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  We offer 24/7 technical support for critical issues, with standard support available during business hours. All customers have access to our knowledge base, community forums, and regular software updates.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* CTA Section */}
      <Box sx={{ 
        bgcolor: 'primary.main', 
        color: 'white', 
        py: 10,
        position: 'relative',
        overflow: 'hidden',
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, rgba(44, 62, 80, 0.9) 0%, rgba(52, 73, 94, 0.8) 100%)',
          zIndex: 1
        }
      }}>
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <Typography variant="h3" component="h2" gutterBottom fontWeight="bold">
            Ready to Transform Your Manufacturing?
          </Typography>
          <Typography variant="subtitle1" paragraph sx={{ mb: 4, opacity: 0.9 }}>
            Contact us today to schedule a demo and see how {APP_NAME} can help you optimize your steel manufacturing operations.
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
            <Button 
              variant="contained" 
              size="large"
              sx={{ 
                bgcolor: 'white', 
                color: 'primary.main',
                px: 4,
                py: 1.5,
                fontWeight: 'bold',
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,0.9)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 20px rgba(0,0,0,0.2)'
                }
              }}
            >
              Request Demo
            </Button>
            <Button 
              variant="outlined" 
              size="large"
              sx={{ 
                color: 'white', 
                borderColor: 'white',
                px: 4,
                py: 1.5,
                '&:hover': {
                  borderColor: 'white',
                  bgcolor: 'rgba(255,255,255,0.1)',
                  transform: 'translateY(-2px)'
                }
              }}
            >
              View Documentation
            </Button>
          </Box>
        </Container>
        <Box 
          component="div" 
          sx={{ 
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'url(https://images.unsplash.com/photo-1423666639041-f56000c27a9a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: 0,
            opacity: 0.1
          }}
        />
      </Box>

      {/* Success/Error Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={15000} // Changed from 6000 to 15000 (15 seconds)
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setSnackbarOpen(false)} 
          severity={snackbarSeverity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Contact;