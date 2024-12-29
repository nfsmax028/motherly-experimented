import React, { useState } from "react";
import {
  Box,
  Typography,
  Divider,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Paper,
  Grid,
  Card,
  IconButton,
} from "@mui/material";
import { AccountCircle, Lock, Email } from "@mui/icons-material";

const Settings = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [subscription, setSubscription] = useState("basic");
  const [password, setPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newUsername, setNewUsername] = useState("");

  const handleNotificationsChange = (event) => {
    setNotificationsEnabled(event.target.checked);
  };

  const handleSubscriptionChange = (event) => {
    setSubscription(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleEmailChange = (event) => {
    setNewEmail(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setNewUsername(event.target.value);
  };

  return (
    <Box sx={{ padding: 4, backgroundColor: "#121212", minHeight: "100vh" }}>
      <Typography variant="h4" color="primary" gutterBottom>
        Settings
      </Typography>

      {/* Profile Settings */}
      <Paper sx={{ padding: 3, backgroundColor: "#1e1e1e", marginBottom: 4 }}>
        <Typography variant="h6" color="white" gutterBottom>
          Profile Settings
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              value={newUsername}
              onChange={handleUsernameChange}
              sx={{
                backgroundColor: "#ffffff",
                borderRadius: 2,
                '& .MuiInputBase-root': { color: "#000000" },
              }}
              InputLabelProps={{ style: { color: "#ffffff" } }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              value={newEmail}
              onChange={handleEmailChange}
              sx={{
                backgroundColor: "#ffffff",
                borderRadius: 2,
                '& .MuiInputBase-root': { color: "#000000" },
              }}
              InputLabelProps={{ style: { color: "#ffffff" } }}
            />
          </Grid>
        </Grid>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: 2 }}
        >
          Save Changes
        </Button>
      </Paper>

      {/* Notifications Preferences */}
      <Paper sx={{ padding: 3, backgroundColor: "#1e1e1e", marginBottom: 4 }}>
        <Typography variant="h6" color="white" gutterBottom>
          Notifications Preferences
        </Typography>
        <FormControlLabel
          control={
            <Switch
              checked={notificationsEnabled}
              onChange={handleNotificationsChange}
              color="primary"
            />
          }
          label="Enable Notifications"
          sx={{ color: "#ffffff" }}
        />
        <Button variant="outlined" color="primary" fullWidth sx={{ marginTop: 2 }}>
          Update Preferences
        </Button>
      </Paper>

      {/* Billing and Subscription Management */}
      <Paper sx={{ padding: 3, backgroundColor: "#1e1e1e", marginBottom: 4 }}>
        <Typography variant="h6" color="white" gutterBottom>
          Billing and Subscription
        </Typography>
        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <InputLabel sx={{ color: "#ffffff" }}>Subscription Plan</InputLabel>
          <Select
            value={subscription}
            onChange={handleSubscriptionChange}
            label="Subscription Plan"
            sx={{
              backgroundColor: "#ffffff",
              color: "#000000",
              borderRadius: 2,
            }}
          >
            <MenuItem value="basic">Basic</MenuItem>
            <MenuItem value="premium">Premium</MenuItem>
            <MenuItem value="enterprise">Enterprise</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" color="primary" fullWidth sx={{ marginTop: 2 }}>
          Update Subscription
        </Button>
      </Paper>

      {/* Privacy and Security */}
      <Paper sx={{ padding: 3, backgroundColor: "#1e1e1e", marginBottom: 4 }}>
        <Typography variant="h6" color="white" gutterBottom>
          Privacy and Security
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Change Password"
              variant="outlined"
              fullWidth
              type="password"
              value={password}
              onChange={handlePasswordChange}
              sx={{
                backgroundColor: "#ffffff",
                borderRadius: 2,
                '& .MuiInputBase-root': { color: "#000000" },
              }}
              InputLabelProps={{ style: { color: "#ffffff" } }}
            />
          </Grid>
        </Grid>
        <Button variant="contained" color="primary" fullWidth sx={{ marginTop: 2 }}>
          Change Password
        </Button>
      </Paper>

      {/* Advanced Settings */}
      <Paper sx={{ padding: 3, backgroundColor: "#1e1e1e", marginBottom: 4 }}>
        <Typography variant="h6" color="white" gutterBottom>
          Advanced Settings
        </Typography>
        <Card sx={{ padding: 2, backgroundColor: "#262626" }}>
          <Typography variant="body1" color="white">
            Two-Factor Authentication
          </Typography>
          <FormControlLabel
            control={<Switch color="primary" />}
            label="Enable 2FA"
            sx={{ marginTop: 1, color: "#ffffff" }}
          />
        </Card>
        <Button variant="outlined" color="primary" fullWidth sx={{ marginTop: 2 }}>
          Save Changes
        </Button>
      </Paper>
    </Box>
  );
};

export default Settings;
