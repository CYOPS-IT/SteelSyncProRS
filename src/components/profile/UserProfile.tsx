import React, { useState } from 'react';
import { Box, Typography, Avatar, Button, Dialog, DialogTitle, DialogContent, IconButton, TextField, Stack, Divider, DialogActions, List, ListItem, ListItemIcon, ListItemText, Chip, Grid, Badge } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import EmailIcon from '@mui/icons-material/Email';
import BusinessIcon from '@mui/icons-material/Business';
import BadgeIcon from '@mui/icons-material/Badge';
import GroupsIcon from '@mui/icons-material/Groups';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { useAuth } from '../../contexts/AuthContext';
import { DEFAULT_PROFILE_IMAGES } from '../../types/user';

const UserProfile: React.FC = () => {
  const { user } = useAuth();
  const [openImageDialog, setOpenImageDialog] = useState(false);
  const [selectedImage, setSelectedImage] = useState(user?.profileImage || DEFAULT_PROFILE_IMAGES[0]);
  const [isEditing, setIsEditing] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    email: user?.email || '',
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    title: user?.title || '',
    department: user?.department || ''
  });

  if (!user) {
    return null;
  }

  const handleSave = () => {
    // Here you would typically make an API call to update the user profile
    // For now, we'll just simulate it with a timeout
    setTimeout(() => {
      setIsEditing(false);
    }, 500);
  };

  const handleCancel = () => {
    setFormData({
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      title: user.title,
      department: user.department
    });
    setIsEditing(false);
  };

  const handleImageSelect = (image: string) => {
    setSelectedImage(image);
    setOpenImageDialog(false);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setOpenImageDialog(false);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box sx={{ textAlign: 'center' }}>
        <Box sx={{ position: 'relative', display: 'inline-block', mb: 3 }}>
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            badgeContent={
              <IconButton
                size="small"
                sx={{
                  bgcolor: 'background.paper',
                  boxShadow: 2,
                  '&:hover': { bgcolor: 'background.paper' }
                }}
                onClick={() => setOpenImageDialog(true)}
              >
                <PhotoCameraIcon fontSize="small" />
              </IconButton>
            }
          >
            <Avatar
              src={selectedImage}
              sx={{
                width: 130,
                height: 130,
                bgcolor: 'primary.main',
                fontSize: '3rem',
                border: '4px solid',
                borderColor: 'background.paper',
                boxShadow: 3
              }}
            >
              {!selectedImage && `${user.firstName[0]}${user.lastName[0]}`}
            </Avatar>
          </Badge>
        </Box>

        <Typography variant="h5" component="h2" gutterBottom fontWeight="bold">
          {user.firstName} {user.lastName}
        </Typography>
        
        <Stack direction="row" spacing={1} justifyContent="center" sx={{ mb: 3 }}>
          <Chip 
            label={user.title} 
            color="primary" 
            sx={{ fontWeight: 500 }} 
          />
          <Chip 
            label={user.department} 
            variant="outlined" 
            sx={{ fontWeight: 500 }} 
          />
        </Stack>

        <Divider sx={{ my: 3 }} />

        <List sx={{ mb: 3 }}>
          <ListItem>
            <ListItemIcon>
              <EmailIcon color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary={<Typography variant="body2" color="text.secondary">Email</Typography>}
              secondary={<Typography variant="body1">{user.email}</Typography>} 
            />
          </ListItem>
          
          <ListItem>
            <ListItemIcon>
              <BusinessIcon color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary={<Typography variant="body2" color="text.secondary">Company</Typography>}
              secondary={<Typography variant="body1">{user.user_metadata?.company || 'Industrial Solutions Inc.'}</Typography>}
            />
          </ListItem>
          
          <ListItem>
            <ListItemIcon>
              <CalendarTodayIcon color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary={<Typography variant="body2" color="text.secondary">Join Date</Typography>}
              secondary={<Typography variant="body1">{user.joinDate}</Typography>}
            />
          </ListItem>
        </List>

        <Divider sx={{ my: 3 }} />

        <Button
          variant="contained"
          onClick={() => setIsEditing(true)}
          startIcon={<EditIcon />}
          fullWidth
          sx={{ py: 1.5 }}
        >
          Edit Profile
        </Button>

      {/* Profile Image Selection Dialog */}
      <Dialog
        open={openImageDialog}
        onClose={() => setOpenImageDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Choose Profile Picture</DialogTitle>
        <DialogContent>
          <Box sx={{ mb: 3 }}>
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="upload-profile-image"
              type="file"
              onChange={handleImageUpload}
            />
            <label htmlFor="upload-profile-image">
              <Button
                variant="outlined"
                component="span"
                fullWidth
                startIcon={<PhotoCameraIcon />}
              >
                Upload Custom Image
              </Button>
            </label>
          </Box>
          
          <Divider sx={{ my: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Or choose from defaults
            </Typography>
          </Divider>

          <Grid container spacing={2}>
            {DEFAULT_PROFILE_IMAGES.map((image, index) => (
              <Grid item xs={4} key={index}>
                <Avatar
                  src={image}
                  sx={{
                    width: '100%',
                    height: 'auto',
                    aspectRatio: '1',
                    cursor: 'pointer',
                    border: selectedImage === image ? '2px solid' : 'none',
                    borderColor: 'primary.main'
                  }}
                  onClick={() => handleImageSelect(image)}
                />
              </Grid>
            ))}
          </Grid>
        </DialogContent>
      </Dialog>
      
      {/* Edit Profile Dialog */}
      <Dialog open={isEditing} onClose={handleCancel} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Department"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">Save Changes</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserProfile;