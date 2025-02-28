import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { 
  Box, 
  Button, 
  Container, 
  Grid, 
  Typography, 
  Card, 
  CardContent,
  Stack,
  Avatar,
  Paper,
  Divider
} from '@mui/material';
import StorageIcon from '@mui/icons-material/Storage';
import BarChartIcon from '@mui/icons-material/BarChart';
import ShieldIcon from '@mui/icons-material/Shield';
import GroupsIcon from '@mui/icons-material/Groups';
import FactoryIcon from '@mui/icons-material/Factory';
import EngineeringIcon from '@mui/icons-material/Engineering';
import { APP_NAME } from '../lib/constants';
import { features, testimonials } from '../lib/api';

const Home: React.FC = () => {
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
              <Box sx={{ mb: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <FactoryIcon sx={{ fontSize: 40, mr: 2 }} />
                  <Typography variant="h6" component="span" sx={{ fontWeight: 'bold', letterSpacing: 1 }}>
                    {APP_NAME.toUpperCase()}
                  </Typography>
                </Box>
                <Typography variant="h2" component="h1" gutterBottom fontWeight="bold" sx={{ 
                  fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                  lineHeight: 1.2,
                  mb: 3
                }}>
                  Streamline Your Steel Manufacturing Process
                </Typography>
                <Typography variant="h6" paragraph sx={{ mb: 4, opacity: 0.9, fontWeight: 'normal' }}>
                  {APP_NAME} helps you manage inventory, track production, and optimize your steel manufacturing workflow in one place.
                </Typography>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <Button 
                    component={RouterLink} 
                    to="/features" 
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
                    Get Started
                  </Button>
                  <Button 
                    component={RouterLink} 
                    to="/capabilities" 
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
                    Learn More
                  </Button>
                </Stack>
              </Box>
            </Grid>
            <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'block' } }}>
              <Box 
                component="img"
                src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80"
                alt="Steel manufacturing"
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
            backgroundImage: 'url(https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: 0,
            opacity: 0.2
          }}
        />
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Box textAlign="center" mb={8}>
          <Typography variant="overline" component="div" sx={{ color: 'primary.main', fontWeight: 'bold', letterSpacing: 2, mb: 1 }}>
            POWERFUL FEATURES
          </Typography>
          <Typography variant="h3" component="h2" gutterBottom fontWeight="bold">
            Key Features
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto' }}>
            Our comprehensive solution provides everything you need to manage your steel manufacturing operations efficiently.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {features.map((feature, index) => {
            const FeatureIcon = index === 0 ? StorageIcon : 
                               index === 1 ? BarChartIcon : 
                               index === 2 ? GroupsIcon : ShieldIcon;
            
            return (
              <Grid item xs={12} sm={6} md={3} key={feature.id}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <Box sx={{ p: 3, display: 'flex', justifyContent: 'center', bgcolor: 'primary.main', color: 'white' }}>
                    <FeatureIcon sx={{ fontSize: 60 }} />
                  </Box>
                  <CardContent sx={{ flexGrow: 1, pt: 4 }}>
                    <Typography gutterBottom variant="h5" component="h3" align="center" fontWeight="bold">
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" align="center">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>

      {/* How It Works Section */}
      <Box sx={{ bgcolor: 'background.default', py: 10 }}>
        <Container maxWidth="lg">
          <Box textAlign="center" mb={8}>
            <Typography variant="overline" component="div" sx={{ color: 'primary.main', fontWeight: 'bold', letterSpacing: 2, mb: 1 }}>
              STREAMLINED PROCESS
            </Typography>
            <Typography variant="h3" component="h2" gutterBottom fontWeight="bold">
              How {APP_NAME} Works
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto' }}>
              Our platform simplifies every aspect of steel manufacturing management
            </Typography>
          </Box>
          
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <Box sx={{ 
                  bgcolor: 'primary.main', 
                  color: 'white', 
                  width: 80, 
                  height: 80, 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  mb: 3
                }}>
                  <FactoryIcon sx={{ fontSize: 40 }} />
                </Box>
                <Typography variant="h5" component="h3" gutterBottom fontWeight="bold">
                  1. Production Planning
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Schedule and optimize your production runs based on demand forecasts and resource availability.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <Box sx={{ 
                  bgcolor: 'primary.main', 
                  color: 'white', 
                  width: 80, 
                  height: 80, 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  mb: 3
                }}>
                  <EngineeringIcon sx={{ fontSize: 40 }} />
                </Box>
                <Typography variant="h5" component="h3" gutterBottom fontWeight="bold">
                  2. Real-time Monitoring
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Track production progress, machine status, and worker performance in real-time from anywhere.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <Box sx={{ 
                  bgcolor: 'primary.main', 
                  color: 'white', 
                  width: 80, 
                  height: 80, 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  mb: 3
                }}>
                  <BarChartIcon sx={{ fontSize: 40 }} />
                </Box>
                <Typography variant="h5" component="h3" gutterBottom fontWeight="bold">
                  3. Data-Driven Insights
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Analyze performance metrics and identify opportunities for process improvement and cost reduction.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Testimonial Section */}
      <Box sx={{ py: 10 }}>
        <Container maxWidth="lg">
          <Box textAlign="center" mb={8}>
            <Typography variant="overline" component="div" sx={{ color: 'primary.main', fontWeight: 'bold', letterSpacing: 2, mb: 1 }}>
              SUCCESS STORIES
            </Typography>
            <Typography variant="h3" component="h2" gutterBottom fontWeight="bold">
              Trusted by Industry Leaders
            </Typography>
          </Box>
          <Grid container spacing={4} justifyContent="center">
            {testimonials.map((testimonial) => (
              <Grid item xs={12} md={4} key={testimonial.id}>
                <Card sx={{ height: '100%', position: 'relative', overflow: 'visible' }}>
                  <Box sx={{ 
                    position: 'absolute', 
                    top: -20, 
                    left: 20, 
                    width: 40, 
                    height: 40, 
                    bgcolor: 'primary.main', 
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 2,
                    boxShadow: 3,
                    fontSize: 24,
                    fontWeight: 'bold'
                  }}>
                    "
                  </Box>
                  <CardContent sx={{ pt: 4 }}>
                    <Typography variant="body1" paragraph sx={{ fontStyle: 'italic', mb: 3 }}>
                      "{testimonial.quote}"
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>{testimonial.initials}</Avatar>
                      <Box>
                        <Typography variant="subtitle1" fontWeight="bold">
                          {testimonial.author}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {testimonial.position}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

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
            Ready to Optimize Your Steel Manufacturing?
          </Typography>
          <Typography variant="subtitle1" paragraph sx={{ mb: 4, opacity: 0.9 }}>
            Join hundreds of companies that have transformed their operations with {APP_NAME}.
          </Typography>
          <Button 
            component={RouterLink} 
            to="/features" 
            variant="contained" 
            size="large"
            sx={{ 
              bgcolor: 'white', 
              color: 'primary.main',
              px: 6,
              py: 1.5,
              fontWeight: 'bold',
              '&:hover': {
                bgcolor: 'rgba(255,255,255,0.9)',
                transform: 'translateY(-2px)',
                boxShadow: '0 6px 20px rgba(0,0,0,0.2)'
              }
            }}
          >
            Learn More
          </Button>
        </Container>
        <Box 
          component="div" 
          sx={{ 
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'url(https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: 0,
            opacity: 0.1
          }}
        />
      </Box>
    </Box>
  );
};

export default Home;