import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Card,
  CardContent,
  CardActions,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Divider,
  Chip,
  Stack,
} from '@mui/material';
import { Delete, Add, AssignmentInd, AccountCircle } from '@mui/icons-material';

const AccountManagement = () => {
  const [accounts, setAccounts] = useState([]);
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [activityLogs, setActivityLogs] = useState([]);
  const [newAccount, setNewAccount] = useState({ platform: '', status: 'Disconnected' });
  const [newRole, setNewRole] = useState({ name: '', permissions: [] });
  const [newMember, setNewMember] = useState({ name: '', role: '' });

  const availableRoles = ['Admin', 'Editor', 'Viewer'];
  const availablePermissions = ['Create Content', 'Approve Content', 'Schedule Content', 'View Analytics'];

  useEffect(() => {
    setRoles(availableRoles);
    setPermissions(availablePermissions);
  }, []);

  const addAccount = () => {
    if (newAccount.platform.trim()) {
      setAccounts([...accounts, newAccount]);
      logActivity(`Added new account: ${newAccount.platform}`);
      setNewAccount({ platform: '', status: 'Disconnected' });
    }
  };

  const removeAccount = (platform) => {
    setAccounts(accounts.filter((account) => account.platform !== platform));
    logActivity(`Removed account: ${platform}`);
  };

  const assignRole = () => {
    if (newMember.name && newMember.role) {
      logActivity(`Assigned role '${newMember.role}' to '${newMember.name}'`);
      setNewMember({ name: '', role: '' });
      setNewRole({ name: '', permissions: [] });
    }
  };

  const handlePermissionsChange = (permission) => {
    setNewRole((prevRole) => {
      const permissions = prevRole.permissions.includes(permission)
        ? prevRole.permissions.filter((perm) => perm !== permission)
        : [...prevRole.permissions, permission];
      return { ...prevRole, permissions };
    });
  };

  const logActivity = (message) => {
    setActivityLogs((prevLogs) => [
      ...prevLogs,
      { timestamp: new Date().toLocaleString(), message },
    ]);
  };

  return (
    <Box sx={{ p: 3, maxWidth: '800px', margin: '0 auto' }}>
      <Typography variant="h4" gutterBottom>
        <AccountCircle fontSize="large" /> Account Management
      </Typography>

      {/* Accounts Section */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Connected Accounts
          </Typography>
          <List>
            {accounts.map((account, index) => (
              <ListItem key={index} divider>
                <ListItemText
                  primary={account.platform}
                  secondary={`Status: ${account.status}`}
                />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    color="error"
                    onClick={() => removeAccount(account.platform)}
                  >
                    <Delete />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </CardContent>
        <Divider />
        <CardActions>
          <TextField
            label="New Account"
            variant="outlined"
            size="small"
            value={newAccount.platform}
            onChange={(e) => setNewAccount({ ...newAccount, platform: e.target.value })}
            sx={{ flexGrow: 1, mr: 2 }}
          />
          <Button variant="contained" color="primary" onClick={addAccount}>
            Add Account
          </Button>
        </CardActions>
      </Card>

      {/* Roles and Permissions */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Team Roles & Permissions
          </Typography>
          <Stack spacing={2}>
            <TextField
              label="Team Member Name"
              variant="outlined"
              size="small"
              value={newMember.name}
              onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
              sx={{ flexGrow: 1 }}
            />
            <TextField
              label="Role"
              select
              variant="outlined"
              size="small"
              value={newMember.role}
              onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
              sx={{ flexGrow: 1 }}
            >
              {roles.map((role) => (
                <MenuItem key={role} value={role}>
                  {role}
                </MenuItem>
              ))}
            </TextField>
            <Typography variant="subtitle1">Permissions</Typography>
            <Stack direction="row" spacing={1}>
              {availablePermissions.map((permission) => (
                <FormControlLabel
                  key={permission}
                  control={
                    <Checkbox
                      checked={newRole.permissions.includes(permission)}
                      onChange={() => handlePermissionsChange(permission)}
                    />
                  }
                  label={permission}
                />
              ))}
            </Stack>
          </Stack>
        </CardContent>
        <Divider />
        <CardActions>
          <Button variant="contained" color="primary" onClick={assignRole} startIcon={<AssignmentInd />}>
            Assign Role
          </Button>
        </CardActions>
      </Card>

      {/* Activity Logs */}
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Activity Logs
          </Typography>
          <List>
            {activityLogs.map((log, index) => (
              <ListItem key={index} divider>
                <ListItemText
                  primary={log.message}
                  secondary={log.timestamp}
                />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AccountManagement;
