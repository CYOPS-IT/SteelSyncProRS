import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent,
  Divider,
  Button,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Chip
} from '@mui/material';
import StorageIcon from '@mui/icons-material/Storage';
import BarChartIcon from '@mui/icons-material/BarChart';
import ShieldIcon from '@mui/icons-material/Shield';
import GroupsIcon from '@mui/icons-material/Groups';
import ConstructionIcon from '@mui/icons-material/Construction';
import EngineeringIcon from '@mui/icons-material/Engineering';
import FactoryIcon from '@mui/icons-material/Factory';
import InventoryIcon from '@mui/icons-material/Inventory';
import BuildIcon from '@mui/icons-material/Build';
import SpeedIcon from '@mui/icons-material/Speed';
import DevicesIcon from '@mui/icons-material/Devices';
import SecurityIcon from '@mui/icons-material/Security';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CodeIcon from '@mui/icons-material/Code';
import StorageOutlinedIcon from '@mui/icons-material/StorageOutlined';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import CloudIcon from '@mui/icons-material/Cloud';
import LanguageIcon from '@mui/icons-material/Language';
import { APP_NAME } from '../lib/constants';
import { features } from '../lib/api';

const Features: React.FC = () => {
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
                POWERFUL FEATURES
              </Typography>
              <Typography variant="h2" component="h1" gutterBottom fontWeight="bold" sx={{ 
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                lineHeight: 1.2,
                mb: 3
              }}>
                Streamline Your Steel Manufacturing Process
              </Typography>
              <Typography variant="h6" paragraph sx={{ mb: 4, opacity: 0.9, fontWeight: 'normal' }}>
                {APP_NAME} offers a comprehensive suite of features designed specifically for the steel manufacturing industry.
              </Typography>
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

      {/* Core Features Section */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Box textAlign="center" mb={8}>
          <Typography variant="h3" component="h2" gutterBottom fontWeight="bold">
            Core Features
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
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', transition: 'transform 0.3s ease', '&:hover': { transform: 'translateY(-8px)' } }}>
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

      {/* Feature Details Section */}
      <Box sx={{ bgcolor: 'background.default', py: 10 }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box 
                component="img"
                src="https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80"
                alt="Production dashboard"
                sx={{ 
                  width: '100%', 
                  borderRadius: 4,
                  boxShadow: '0 10px 30px rgba(0,0,0,0.15)'
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="overline" component="div" sx={{ color: 'primary.main', fontWeight: 'bold', letterSpacing: 2, mb: 1 }}>
                PRODUCTION MANAGEMENT
              </Typography>
              <Typography variant="h3" component="h2" gutterBottom fontWeight="bold">
                Optimize Your Production Line
              </Typography>
              <Typography variant="body1" paragraph>
                Our production management module gives you complete visibility and control over your manufacturing processes.
              </Typography>
              
              <List>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Real-time Production Monitoring" 
                    secondary="Track production progress, machine status, and worker performance in real-time."
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Automated Scheduling" 
                    secondary="Optimize production schedules based on resource availability and demand forecasts."
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Quality Assurance Integration" 
                    secondary="Seamlessly integrate quality checks into your production workflow."
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Downtime Analysis" 
                    secondary="Identify and address causes of production downtime to improve efficiency."
                  />
                </ListItem>
              </List>
            </Grid>
          </Grid>

          <Divider sx={{ my: 10 }} />

          <Grid container spacing={6} alignItems="center" direction={{ xs: 'column-reverse', md: 'row' }}>
            <Grid item xs={12} md={6}>
              <Typography variant="overline" component="div" sx={{ color: 'primary.main', fontWeight: 'bold', letterSpacing: 2, mb: 1 }}>
                INVENTORY CONTROL
              </Typography>
              <Typography variant="h3" component="h2" gutterBottom fontWeight="bold">
                Smart Inventory Management
              </Typography>
              <Typography variant="body1" paragraph>
                Take control of your inventory with our advanced tracking and forecasting tools.
              </Typography>
              
              <List>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Automated Stock Alerts" 
                    secondary="Receive notifications when inventory levels reach predefined thresholds."
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Barcode & RFID Integration" 
                    secondary="Streamline inventory tracking with integrated scanning capabilities."
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Demand Forecasting" 
                    secondary="Use historical data and AI to predict future inventory needs."
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Supplier Management" 
                    secondary="Manage supplier relationships and automate purchase orders."
                  />
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box 
                component="img"
                src="https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80"
                alt="Inventory management"
                sx={{ 
                  width: '100%', 
                  borderRadius: 4,
                  boxShadow: '0 10px 30px rgba(0,0,0,0.15)'
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Capabilities Section */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Box textAlign="center" mb={8}>
          <Typography variant="overline" component="div" sx={{ color: 'primary.main', fontWeight: 'bold', letterSpacing: 2, mb: 1 }}>
            ADVANCED CAPABILITIES
          </Typography>
          <Typography variant="h3" component="h2" gutterBottom fontWeight="bold">
            Enterprise-Grade Capabilities
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto' }}>
            {APP_NAME} includes advanced capabilities designed for modern steel manufacturing enterprises.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 4, height: '100%' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                  <SpeedIcon />
                </Avatar>
                <Typography variant="h5" component="h3" fontWeight="bold">
                  Performance Analytics
                </Typography>
              </Box>
              <Typography variant="body1" paragraph>
                Comprehensive analytics and reporting tools to measure and improve manufacturing performance.
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="primary" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Real-time KPI dashboards" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="primary" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Customizable reports" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="primary" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Trend analysis" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="primary" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Predictive analytics" />
                </ListItem>
              </List>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 4, height: '100%' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                  <DevicesIcon />
                </Avatar>
                <Typography variant="h5" component="h3" fontWeight="bold">
                  Multi-Device Access
                </Typography>
              </Box>
              <Typography variant="body1" paragraph>
                Access your manufacturing data from anywhere, on any device, with our responsive platform.
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="primary" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Desktop & mobile apps" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="primary" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Offline capabilities" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="primary" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Real-time synchronization" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="primary" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Shop floor tablets & kiosks" />
                </ListItem>
              </List>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 4, height: '100%' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                  <SecurityIcon />
                </Avatar>
                <Typography variant="h5" component="h3" fontWeight="bold">
                  Enterprise Security
                </Typography>
              </Box>
              <Typography variant="body1" paragraph>
                Industry-leading security features to protect your sensitive manufacturing data.
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="primary" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Role-based access control" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="primary" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="End-to-end encryption" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="primary" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Audit logging" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="primary" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Compliance certifications" />
                </ListItem>
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Tech Stack Section */}
      <Box sx={{ bgcolor: 'background.default', py: 10 }}>
        <Container maxWidth="lg">
          <Box textAlign="center" mb={8}>
            <Typography variant="overline" component="div" sx={{ color: 'primary.main', fontWeight: 'bold', letterSpacing: 2, mb: 1 }}>
              TECHNOLOGY STACK
            </Typography>
            <Typography variant="h3" component="h2" gutterBottom fontWeight="bold">
              Built with Modern Technologies
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto' }}>
              {APP_NAME} is built on a robust, scalable technology stack designed for performance and reliability.
            </Typography>
          </Box>

          <Grid container spacing={4}>
            <Grid item xs={12} md={3}>
              <Paper sx={{ p: 4, height: '100%', textAlign: 'center' }}>
                <Avatar sx={{ bgcolor: 'primary.main', mx: 'auto', mb: 2, width: 60, height: 60 }}>
                  <CodeIcon sx={{ fontSize: 30 }} />
                </Avatar>
                <Typography variant="h5" component="h3" fontWeight="bold" gutterBottom>
                  Frontend
                </Typography>
                <Divider sx={{ my: 2 }} />
                <List dense>
                  <ListItem>
                    <ListItemText primary="React 18" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="TypeScript" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Material UI" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Tailwind CSS" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="React Router" />
                  </ListItem>
                </List>
              </Paper>
            </Grid>
            <Grid item xs={12} md={3}>
              <Paper sx={{ p: 4, height: '100%', textAlign: 'center' }}>
                <Avatar sx={{ bgcolor: 'primary.main', mx: 'auto', mb: 2, width: 60, height: 60 }}>
                  <StorageOutlinedIcon sx={{ fontSize: 30 }} />
                </Avatar>
                <Typography variant="h5" component="h3" fontWeight="bold" gutterBottom>
                  Backend
                </Typography>
                <Divider sx={{ my: 2 }} />
                <List dense>
                  <ListItem>
                    <ListItemText primary="Node.js" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Express" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="PostgreSQL" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Supabase" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="RESTful APIs" />
                  </ListItem>
                </List>
              </Paper>
            </Grid>
            <Grid item xs={12} md={3}>
              <Paper sx={{ p: 4, height: '100%', textAlign: 'center' }}>
                <Avatar sx={{ bgcolor: 'primary.main', mx: 'auto', mb: 2, width: 60, height: 60 }}>
                  <CloudIcon sx={{ fontSize: 30 }} />
                </Avatar>
                <Typography variant="h5" component="h3" fontWeight="bold" gutterBottom>
                  Infrastructure
                </Typography>
                <Divider sx={{ my: 2 }} />
                <List dense>
                  <ListItem>
                    <ListItemText primary="Docker" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Kubernetes" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="AWS / Azure / GCP" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="CI/CD Pipelines" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Monitoring & Logging" />
                  </ListItem>
                </List>
              </Paper>
            </Grid>
            <Grid item xs={12} md={3}>
              <Paper sx={{ p: 4, height: '100%', textAlign: 'center' }}>
                <Avatar sx={{ bgcolor: 'primary.main', mx: 'auto', mb: 2, width: 60, height: 60 }}>
                  <DesignServicesIcon sx={{ fontSize: 30 }} />
                </Avatar>
                <Typography variant="h5" component="h3" fontWeight="bold" gutterBottom>
                  Development
                </Typography>
                <Divider sx={{ my: 2 }} />
                <List dense>
                  <ListItem>
                    <ListItemText primary="Agile Methodology" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Test-Driven Development" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Automated Testing" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Code Quality Tools" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Security Scanning" />
                  </ListItem>
                </List>
              </Paper>
            </Grid>
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
            Ready to Transform Your Manufacturing?
          </Typography>
          <Typography variant="subtitle1" paragraph sx={{ mb: 4, opacity: 0.9 }}>
            Join hundreds of companies that have revolutionized their operations with {APP_NAME}.
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
              Contact Sales
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

export default Features;