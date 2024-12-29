import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  Chip,
  IconButton,
  Card,
  CardContent,
  CardActions,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Divider,
  Stack,
  Grid,
  Avatar,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  AddPhotoAlternate,
  VideoLibrary,
  Link as LinkIcon,
  Edit,
  Schedule,
  Save,
  Preview,
  EmojiEmotions,
  Add,
  Tag,
  LocationOn,
} from '@mui/icons-material';

const platforms = [
  { name: 'Facebook', icon: '/path/to/facebook-icon.svg' },
  { name: 'Instagram', icon: '/path/to/instagram-icon.svg' },
  { name: 'LinkedIn', icon: '/path/to/linkedin-icon.svg' },
  { name: 'Twitter', icon: '/path/to/twitter-icon.svg' },
];

const CreatePost = () => {
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [postText, setPostText] = useState('');
  const [hashtags, setHashtags] = useState([]);
  const [mediaFiles, setMediaFiles] = useState([]);
  const [scheduling, setScheduling] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);

  const handlePlatformToggle = (platform) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platform) ? prev.filter((p) => p !== platform) : [...prev, platform]
    );
  };

  const handleMediaUpload = (e) => {
    const files = Array.from(e.target.files);
    setMediaFiles((prev) => [...prev, ...files]);
  };

  const handleAddHashtag = (hashtag) => {
    if (hashtag && !hashtags.includes(hashtag)) {
      setHashtags((prev) => [...prev, hashtag]);
    }
  };

  const handleRemoveHashtag = (hashtag) => {
    setHashtags((prev) => prev.filter((h) => h !== hashtag));
  };

  const handlePreview = () => {
    setPreviewOpen(true);
  };

  const closePreview = () => {
    setPreviewOpen(false);
  };

  const handleSchedule = () => {
    setScheduling(true);
  };

  const closeScheduling = () => {
    setScheduling(false);
  };

  return (
    <Box sx={{ p: 3, maxWidth: '1000px', margin: '0 auto' }}>
      <Typography variant="h4" gutterBottom>
        Create Post
      </Typography>

      {/* Platform Selection */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6">Select Platforms</Typography>
          <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
            {platforms.map((platform) => (
              <Button
                key={platform.name}
                variant={selectedPlatforms.includes(platform.name) ? 'contained' : 'outlined'}
                onClick={() => handlePlatformToggle(platform.name)}
                startIcon={<Avatar src={platform.icon} alt={platform.name} />}
              >
                {platform.name}
              </Button>
            ))}
          </Stack>
        </CardContent>
      </Card>

      {/* Post Text Editor */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6">Write Your Post</Typography>
          <TextField
            multiline
            rows={4}
            fullWidth
            placeholder="Write something..."
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            sx={{ mt: 2 }}
            InputProps={{
              endAdornment: (
                <IconButton>
                  <EmojiEmotions />
                </IconButton>
              ),
            }}
          />
          <Typography variant="caption" sx={{ mt: 1, display: 'block' }}>
            Character limits are platform-specific and will be shown in the preview.
          </Typography>
        </CardContent>
      </Card>

      {/* Hashtag Suggestions */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6">Hashtag Suggestions</Typography>
          <Stack direction="row" spacing={1} sx={{ mt: 2, flexWrap: 'wrap' }}>
            {['#Marketing', '#SocialMedia', '#React', '#UIUX'].map((suggestion) => (
              <Chip
                key={suggestion}
                label={suggestion}
                onClick={() => handleAddHashtag(suggestion)}
                sx={{ cursor: 'pointer' }}
              />
            ))}
          </Stack>
          <Stack direction="row" spacing={1} sx={{ mt: 2, flexWrap: 'wrap' }}>
            {hashtags.map((hashtag) => (
              <Chip
                key={hashtag}
                label={hashtag}
                onDelete={() => handleRemoveHashtag(hashtag)}
                color="primary"
              />
            ))}
          </Stack>
        </CardContent>
      </Card>

      {/* Media Upload */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6">Upload Media</Typography>
          <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
            <Button
              variant="contained"
              component="label"
              startIcon={<AddPhotoAlternate />}
            >
              Add Images
              <input type="file" hidden accept="image/*" multiple onChange={handleMediaUpload} />
            </Button>
            <Button
              variant="contained"
              component="label"
              startIcon={<VideoLibrary />}
            >
              Add Videos
              <input type="file" hidden accept="video/*" multiple onChange={handleMediaUpload} />
            </Button>
          </Stack>
          <Stack direction="row" spacing={2} sx={{ mt: 2, flexWrap: 'wrap' }}>
            {mediaFiles.map((file, index) => (
              <Paper key={index} sx={{ p: 2, mb: 1, maxWidth: '150px', textAlign: 'center' }}>
                {file.name}
              </Paper>
            ))}
          </Stack>
        </CardContent>
      </Card>

      {/* Preview and Scheduling */}
      <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
        <Button variant="outlined" startIcon={<Preview />} onClick={handlePreview}>
          Preview
        </Button>
        <Button variant="contained" startIcon={<Schedule />} onClick={handleSchedule}>
          Schedule
        </Button>
        <Button variant="outlined" startIcon={<Save />}>
          Save as Draft
        </Button>
      </Stack>

      {/* Preview Dialog */}
      <Dialog open={previewOpen} onClose={closePreview} maxWidth="md" fullWidth>
        <DialogTitle>Post Preview</DialogTitle>
        <DialogContent>
          <Typography>Post preview will appear here (mock preview).</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={closePreview}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Scheduling Dialog */}
      <Dialog open={scheduling} onClose={closeScheduling} maxWidth="sm" fullWidth>
        <DialogTitle>Schedule Post</DialogTitle>
        <DialogContent>
          <TextField
            type="datetime-local"
            fullWidth
            label="Schedule Time"
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeScheduling}>Cancel</Button>
          <Button variant="contained">Confirm</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CreatePost;
