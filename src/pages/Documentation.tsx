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
  Chip,
  Link,
  Tabs,
  Tab,
  TextField,
  InputAdornment
} from '@mui/material';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import CodeIcon from '@mui/icons-material/Code';
import StorageIcon from '@mui/icons-material/Storage';
import DescriptionIcon from '@mui/icons-material/Description';
import SearchIcon from '@mui/icons-material/Search';
import DownloadIcon from '@mui/icons-material/Download';
import ArticleIcon from '@mui/icons-material/Article';
import ForumIcon from '@mui/icons-material/Forum';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import FactoryIcon from '@mui/icons-material/Factory';
import InventoryIcon from '@mui/icons-material/Inventory';
import BuildIcon from '@mui/icons-material/Build';
import { APP_NAME } from '../lib/constants';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`documentation-tabpanel-${index}`}
      aria-labelledby={`documentation-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ py: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `documentation-tab-${index}`,
    'aria-controls': `documentation-tabpanel-${index}`,
  };
}

const Documentation: React.FC = () => {
  const [tabValue, setTabValue] = React.useState(0);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
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
                COMPREHENSIVE DOCUMENTATION
              </Typography>
              <Typography variant="h2" component="h1" gutterBottom fontWeight="bold" sx={{ 
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                lineHeight: 1.2,
                mb: 3
              }}>
                Resources to Help You Succeed
              </Typography>
              <Typography variant="h6" paragraph sx={{ mb: 4, opacity: 0.9, fontWeight: 'normal' }}>
                Explore our comprehensive documentation, tutorials, and resources to get the most out of {APP_NAME}.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
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
                  Get Started
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
                  API Reference
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'block' } }}>
              <Box 
                component="img"
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80"
                alt="Documentation"
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
            backgroundImage: 'url(https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: 0,
            opacity: 0.2
          }}
        />
      </Box>

      {/* Search Section */}
      <Container maxWidth="lg" sx={{ py: 5 }}>
        <Paper sx={{ p: 4, mb: 6 }}>
          <Typography variant="h5" component="h2" gutterBottom fontWeight="bold" textAlign="center">
            Search Documentation
          </Typography>
          <Box sx={{ maxWidth: 700, mx: 'auto' }}>
            <TextField
              fullWidth
              placeholder="Search for guides, tutorials, API references..."
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 2 }}
            />
            <Typography variant="body2" color="text.secondary" textAlign="center">
              Popular searches: Getting Started, API Reference, Authentication, Data Models, Deployment
            </Typography>
          </Box>
        </Paper>

        {/* Documentation Tabs */}
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs 
              value={tabValue} 
              onChange={handleTabChange} 
              aria-label="documentation tabs"
              variant="scrollable"
              scrollButtons="auto"
              allowScrollButtonsMobile
            >
              <Tab label="User Guides" icon={<MenuBookIcon />} iconPosition="start" {...a11yProps(0)} />
              <Tab label="Technical Stack" icon={<CodeIcon />} iconPosition="start" {...a11yProps(1)} />
              <Tab label="API Reference" icon={<StorageIcon />} iconPosition="start" {...a11yProps(2)} />
              <Tab label="Tutorials" icon={<VideoLibraryIcon />} iconPosition="start" {...a11yProps(3)} />
              <Tab label="FAQs" icon={<HelpOutlineIcon />} iconPosition="start" {...a11yProps(4)} />
              <Tab label="Release Notes" icon={<NewReleasesIcon />} iconPosition="start" {...a11yProps(5)} />
            </Tabs>
          </Box>
          
          {/* User Guides Tab */}
          <TabPanel value={tabValue} index={0}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={4}>
                <Paper sx={{ p: 3, height: '100%' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                      <MenuBookIcon />
                    </Avatar>
                    <Typography variant="h6" fontWeight="bold">
                      Getting Started
                    </Typography>
                  </Box>
                  <Divider sx={{ mb: 2 }} />
                  <List dense>
                    <ListItem component={Link} href="#" underline="hover" sx={{ color: 'text.primary' }}>
                      <ListItemText primary="Introduction to Steel Sync Pro" />
                    </ListItem>
                    <ListItem component={Link} href="#" underline="hover" sx={{ color: 'text.primary' }}>
                      <ListItemText primary="System Requirements" />
                    </ListItem>
                    <ListItem component={Link} href="#" underline="hover" sx={{ color: 'text.primary' }}>
                      <ListItemText primary="Installation Guide" />
                    </ListItem>
                    <ListItem component={Link} href="#" underline="hover" sx={{ color: 'text.primary' }}>
                      <ListItemText primary="First-Time Setup" />
                    </ListItem>
                    <ListItem component={Link} href="#" underline="hover" sx={{ color: 'text.primary' }}>
                      <ListItemText primary="User Management" />
                    </ListItem>
                  </List>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4}>
                <Paper sx={{ p: 3, height: '100%' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                      <FactoryIcon />
                    </Avatar>
                    <Typography variant="h6" fontWeight="bold">
                      Production Management
                    </Typography>
                  </Box>
                  <Divider sx={{ mb: 2 }} />
                  <List dense>
                    <ListItem component={Link} href="#" underline="hover" sx={{ color: 'text.primary' }}>
                      <ListItemText primary="Production Planning" />
                    </ListItem>
                    <ListItem component={Link} href="#" underline="hover" sx={{ color: 'text.primary' }}>
                      <ListItemText primary="Work Order Management" />
                    </ListItem>
                    <ListItem component={Link} href="#" underline="hover" sx={{ color: 'text.primary' }}>
                      <ListItemText primary="Production Scheduling" />
                    </ListItem>
                    <ListItem component={Link} href="#" underline="hover" sx={{ color: 'text.primary' }}>
                      <ListItemText primary="Quality Control" />
                    </ListItem>
                    <ListItem component={Link} href="#" underline="hover" sx={{ color: 'text.primary' }}>
                      <ListItemText primary="Production Analytics" />
                    </ListItem>
                  </List>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4}>
                <Paper sx={{ p: 3, height: '100%' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                      <InventoryIcon />
                    </Avatar>
                    <Typography variant="h6" fontWeight="bold">
                      Inventory Management
                    </Typography>
                  </Box>
                  <Divider sx={{ mb: 2 }} />
                  <List dense>
                    <ListItem component={Link} href="#" underline="hover" sx={{ color: 'text.primary' }}>
                      <ListItemText primary="Inventory Setup" />
                    </ListItem>
                    <ListItem component={Link} href="#" underline="hover" sx={{ color: 'text.primary' }}>
                      <ListItemText primary="Stock Management" />
                    </ListItem>
                    <ListItem component={Link} href="#" underline="hover" sx={{ color: 'text.primary' }}>
                      <ListItemText primary="Barcode & RFID Integration" />
                    </ListItem>
                    <ListItem component={Link} href="#" underline="hover" sx={{ color: 'text.primary' }}>
                      <ListItemText primary="Inventory Forecasting" />
                    </ListItem>
                    <ListItem component={Link} href="#" underline="hover" sx={{ color: 'text.primary' }}>
                      <ListItemText primary="Inventory Reports" />
                    </ListItem>
                  </List>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4}>
                <Paper sx={{ p: 3, height: '100%' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                      <BuildIcon />
                    </Avatar>
                    <Typography variant="h6" fontWeight="bold">
                      Maintenance Management
                    </Typography>
                  </Box>
                  <Divider sx={{ mb: 2 }} />
                  <List dense>
                    <ListItem component={Link} href="#" underline="hover" sx={{ color: 'text.primary' }}>
                      <ListItemText primary="Maintenance Planning" />
                    </ListItem>
                    <ListItem component={Link} href="#" underline="hover" sx={{ color: 'text.primary' }}>
                      <ListItemText primary="Preventive Maintenance" />
                    </ListItem>
                    <ListItem component={Link} href="#" underline="hover" sx={{ color: 'text.primary' }}>
                      <ListItemText primary="Equipment Management" />
                    </ListItem>
                    <ListItem component={Link} href="#" underline="hover" sx={{ color: 'text.primary' }}>
                      <ListItemText primary="Maintenance Reports" />
                    </ListItem>
                  </List>
                </Paper>
              </Grid>
            </Grid>
          </TabPanel>
          
          {/* Technical Stack Tab */}
          <TabPanel value={tabValue} index={1}>
            <Typography variant="h6" gutterBottom>
              Current Implementation
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Overview of the current implementation and features in {APP_NAME}.
            </Typography>
            
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Frontend Features
                  </Typography>
                  <Typography variant="body2" paragraph>
                    Current implemented frontend features and components.
                  </Typography>
                  <List dense>
                    <ListItem component={Link} href="#" underline="hover" sx={{ color: 'text.primary' }}>
                      <ListItemIcon>
                        <ArticleIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Authentication System" 
                        secondary="Demo login with email/password"
                      />
                    </ListItem>
                    <ListItem component={Link} href="#" underline="hover" sx={{ color: 'text.primary' }}>
                      <ListItemIcon>
                        <ArticleIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Dashboard" 
                        secondary="Production metrics and activity tracking"
                      />
                    </ListItem>
                    <ListItem component={Link} href="#" underline="hover" sx={{ color: 'text.primary' }}>
                      <ListItemIcon>
                        <ArticleIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Responsive Design" 
                        secondary="Mobile-friendly interface with Material UI"
                      />
                    </ListItem>
                  </List>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Technical Stack
                  </Typography>
                  <Typography variant="body2" paragraph>
                    Current technologies and libraries in use.
                  </Typography>
                  <List dense>
                    <ListItem component={Link} href="#" underline="hover" sx={{ color: 'text.primary' }}>
                      <ListItemIcon>
                        <ArticleIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="React 18.3.1" 
                        secondary="Modern React with hooks and context"
                      />
                    </ListItem>
                    <ListItem component={Link} href="#" underline="hover" sx={{ color: 'text.primary' }}>
                      <ListItemIcon>
                        <ArticleIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Material UI 5.15.10" 
                        secondary="Component library and theming"
                      />
                    </ListItem>
                    <ListItem component={Link} href="#" underline="hover" sx={{ color: 'text.primary' }}>
                      <ListItemIcon>
                        <ArticleIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="React Router 6.22.1" 
                        secondary="Client-side routing"
                      />
                    </ListItem>
                    <ListItem component={Link} href="#" underline="hover" sx={{ color: 'text.primary' }}>
                      <ListItemIcon>
                        <ArticleIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="TypeScript" 
                        secondary="Type safety and developer experience"
                      />
                    </ListItem>
                  </List>
                </Paper>
              </Grid>
            </Grid>
          </TabPanel>
          
          {/* API Reference Tab */}
          <TabPanel value={tabValue} index={2}>
            <Typography variant="h6" gutterBottom>
              Current Implementation
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Overview of the current implementation and features in {APP_NAME}.
            </Typography>
            
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Frontend Features
                  </Typography>
                  <Typography variant="body2" paragraph>
                    Current implemented frontend features and components.
                  </Typography>
                  <List dense>
                    <ListItem component={Link} href="#" underline="hover" sx={{ color: 'text.primary' }}>
                      <ListItemIcon>
                        <ArticleIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Authentication System" 
                        secondary="Demo login with email/password"
                      />
                    </ListItem>
                    <ListItem component={Link} href="#" underline="hover" sx={{ color: 'text.primary' }}>
                      <ListItemIcon>
                        <ArticleIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Dashboard" 
                        secondary="Production metrics and activity tracking"
                      />
                    </ListItem>
                    <ListItem component={Link} href="#" underline="hover" sx={{ color: 'text.primary' }}>
                      <ListItemIcon>
                        <ArticleIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Responsive Design" 
                        secondary="Mobile-friendly interface with Material UI"
                      />
                    </ListItem>
                  </List>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Technical Stack
                  </Typography>
                  <Typography variant="body2" paragraph>
                    Current technologies and libraries in use.
                  </Typography>
                  <List dense>
                    <ListItem component={Link} href="#" underline="hover" sx={{ color: 'text.primary' }}>
                      <ListItemIcon>
                        <ArticleIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="React 18.3.1" 
                        secondary="Modern React with hooks and context"
                      />
                    </ListItem>
                    <ListItem component={Link} href="#" underline="hover" sx={{ color: 'text.primary' }}>
                      <ListItemIcon>
                        <ArticleIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Material UI 5.15.10" 
                        secondary="Component library and theming"
                      />
                    </ListItem>
                    <ListItem component={Link} href="#" underline="hover" sx={{ color: 'text.primary' }}>
                      <ListItemIcon>
                        <ArticleIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="React Router 6.22.1" 
                        secondary="Client-side routing"
                      />
                    </ListItem>
                    <ListItem component={Link} href="#" underline="hover" sx={{ color: 'text.primary' }}>
                      <ListItemIcon>
                        <ArticleIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="TypeScript" 
                        secondary="Type safety and developer experience"
                      />
                    </ListItem>
                  </List>
                </Paper>
              </Grid>
            </Grid>
          </TabPanel>
          
          {/* Tutorials Tab */}
          <TabPanel value={tabValue} index={3}>
            <Typography variant="h6" gutterBottom>
              Tutorials
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Step-by-step guides to help you get the most out of {APP_NAME}.
            </Typography>
            
            <Grid container spacing={4}>
              <Grid item xs={12} md={4}>
                <Card>
                  <Box 
                    component="img"
                    src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80"
                    alt="Getting Started Tutorial"
                    sx={{ width: '100%', height: 200, objectFit: 'cover' }}
                  />
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Getting Started with {APP_NAME}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      Learn how to set up your first project and get started with {APP_NAME}.
                    </Typography>
                    <Button variant="outlined" fullWidth>
                      Watch Tutorial
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card>
                  <Box 
                    component="img"
                    src="https://images.unsplash.com/photo-1581092335397-9583eb92d232?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80"
                    alt="Inventory Management Tutorial"
                    sx={{ width: '100%', height: 200, objectFit: 'cover' }}
                  />
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Inventory Management
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      Learn how to effectively manage your inventory with {APP_NAME}.
                    </Typography>
                    <Button variant="outlined" fullWidth>
                      Watch Tutorial
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card>
                  <Box 
                    component="img"
                    src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80"
                    alt="Production Planning Tutorial"
                    sx={{ width: '100%', height: 200, objectFit: 'cover' }}
                  />
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Production Planning
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      Learn how to plan and schedule production with {APP_NAME}.
                    </Typography>
                    <Button variant="outlined" fullWidth>
                      Watch Tutorial
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </TabPanel>
          
          {/* FAQs Tab */}
          <TabPanel value={tabValue} index={4}>
            <Typography variant="h6" gutterBottom>
              Frequently Asked Questions
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Find answers to common questions about {APP_NAME}.
            </Typography>
            
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    General Questions
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <HelpOutlineIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="What is Steel Sync Pro?" 
                        secondary="Steel Sync Pro is a comprehensive manufacturing management system designed specifically for the steel industry."
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <HelpOutlineIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="How do I get started?" 
                        secondary="You can get started by signing up for an account and following our Getting Started guide."
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <HelpOutlineIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Is there a mobile app?" 
                        secondary="Yes, Steel Sync Pro is available on iOS and Android devices."
                      />
                    </ListItem>
                  </List>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Technical Questions
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <HelpOutlineIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Can I integrate with my ERP system?" 
                        secondary="Yes, Steel Sync Pro offers integration with popular ERP systems like SAP, Oracle, and Microsoft Dynamics."
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <HelpOutlineIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Is my data secure?" 
                        secondary="Yes, we use industry-standard encryption and security practices to protect your data."
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <HelpOutlineIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Can I export my data?" 
                        secondary="Yes, you can export your data in various formats including CSV, Excel, and PDF."
                      />
                    </ListItem>
                  </List>
                </Paper>
              </Grid>
            </Grid>
          </TabPanel>
          
          {/* Release Notes Tab */}
          <TabPanel value={tabValue} index={5}>
            <Typography variant="h6" gutterBottom>
              Release Notes
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Current version: 25.03.07.2
            </Typography>
            
            <Paper sx={{ p: 3, mb: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                  <NewReleasesIcon />
                </Avatar>
                <Box>
                  <Typography variant="h6" fontWeight="bold">
                    Version 25.03.07.2 (Current)
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Released March 7, 2025
                  </Typography>
                </Box>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Profile and Authentication Update
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="success" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Enhanced User Profile" 
                    secondary="Improved profile management with avatar selection and editable fields"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="success" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Favorites Feature" 
                    secondary="Added ability to mark and manage favorite sections"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="success" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Authentication Improvements" 
                    secondary="Enhanced authentication system with mock data support"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="success" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="UI Enhancements" 
                    secondary="Updated dashboard layout and navigation improvements"
                  />
                </ListItem>
              </List>
            </Paper>
            
            <Paper sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                  <NewReleasesIcon />
                </Avatar>
                <Box>
                  <Typography variant="h6" fontWeight="bold">
                    Version 25.03.07.1
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Released March 7, 2025
                  </Typography>
                </Box>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Initial Release
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="success" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Core Features" 
                    secondary="Dashboard with manufacturing metrics, project management, production scheduling, inventory tracking"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="success" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Authentication System" 
                    secondary="Secure login with demo mode for testing"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="success" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Modern UI" 
                    secondary="Responsive design with Material UI components"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="success" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Documentation" 
                    secondary="Comprehensive documentation and guides"
                  />
                </ListItem>
              </List>
            </Paper>
          </TabPanel>
        </Box>
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
            Ready to Get Started?
          </Typography>
          <Typography variant="subtitle1" paragraph sx={{ mb: 4, opacity: 0.9 }}>
            Contact our team to learn more about how {APP_NAME} can transform your steel manufacturing operations.
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
            backgroundImage: 'url(https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80)',
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

export default Documentation;