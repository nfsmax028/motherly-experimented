import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Card,
  CardContent,
  CardActions,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Tooltip,
  IconButton,
  Grid,
  Paper,
  CircularProgress,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CommentIcon from "@mui/icons-material/Comment";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import DeleteIcon from "@mui/icons-material/Delete";

const Team = () => {
  const [teamMembers, setTeamMembers] = useState([
    { id: 1, name: "John Doe", role: "Content Creator", tasks: ["Create Instagram Post"] },
    { id: 2, name: "Jane Smith", role: "Approver", tasks: ["Review Campaign #1"] },
  ]);
  const [newMember, setNewMember] = useState({ name: "", role: "" });
  const [activityLog, setActivityLog] = useState([
    "John assigned 'Create Instagram Post' to Jane.",
    "Jane approved Campaign #1.",
  ]);
  const [comments, setComments] = useState([
    { post: "Draft Post 1", comment: "Change the caption tone to be more formal." },
  ]);
  const [loading, setLoading] = useState(false);

  const handleAddMember = () => {
    if (newMember.name && newMember.role) {
      setLoading(true);
      setTimeout(() => {
        setTeamMembers([
          ...teamMembers,
          { ...newMember, id: Date.now(), tasks: [] },
        ]);
        setActivityLog([
          ...activityLog,
          `Added new member: ${newMember.name} (${newMember.role}).`,
        ]);
        setNewMember({ name: "", role: "" });
        setLoading(false);
      }, 1000);
    }
  };

  const handleAssignTask = (id, task) => {
    const updatedMembers = teamMembers.map((member) =>
      member.id === id ? { ...member, tasks: [...member.tasks, task] } : member
    );
    setTeamMembers(updatedMembers);
    setActivityLog([...activityLog, `Task '${task}' assigned to member.`]);
  };

  const handleDeleteMember = (id) => {
    const member = teamMembers.find((m) => m.id === id);
    setTeamMembers(teamMembers.filter((member) => member.id !== id));
    setActivityLog([...activityLog, `Removed team member: ${member.name}.`]);
  };

  return (
    <Box sx={{ padding: 4, backgroundColor: "#121212", minHeight: "100vh" }}>
      <Typography variant="h4" color="primary" gutterBottom>
        Team Collaboration
      </Typography>
      <Divider sx={{ marginBottom: 3 }} />

      {/* Add New Member */}
      <Paper sx={{ padding: 2, backgroundColor: "#1e1e1e", marginBottom: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              value={newMember.name}
              onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
              sx={{ backgroundColor: "#fff" }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Role"
              variant="outlined"
              fullWidth
              value={newMember.role}
              onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
              sx={{ backgroundColor: "#fff" }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              startIcon={loading ? <CircularProgress size={24} color="inherit" /> : <AddCircleOutlineIcon />}
              onClick={handleAddMember}
              disabled={loading}
            >
              {loading ? "Adding..." : "Add Member"}
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Team Members */}
      <Grid container spacing={3}>
        {teamMembers.map((member) => (
          <Grid item xs={12} sm={6} md={4} key={member.id}>
            <Card sx={{ backgroundColor: "#1e1e1e" }}>
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Avatar sx={{ bgcolor: "primary.main" }}>{member.name.charAt(0)}</Avatar>
                  <Typography variant="h6" color="white">{member.name}</Typography>
                </Box>
                <Typography variant="subtitle1" color="text.secondary">
                  {member.role}
                </Typography>
                <Divider sx={{ marginY: 2 }} />
                <Typography variant="body1" color="white">Tasks:</Typography>
                <List sx={{ paddingLeft: 2 }}>
                  {member.tasks.map((task, index) => (
                    <ListItem key={index} sx={{ color: "white" }}>
                      <ListItemText primary={task} />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
              <CardActions>
                <Tooltip title="Assign Task">
                  <IconButton color="primary" onClick={() => handleAssignTask(member.id, "New Task")}>
                    <AssignmentTurnedInIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Remove Member">
                  <IconButton color="error" onClick={() => handleDeleteMember(member.id)}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Activity Log */}
      <Paper sx={{ padding: 2, backgroundColor: "#1e1e1e", marginTop: 4 }}>
        <Typography variant="h5" color="primary" gutterBottom>
          Activity Log
        </Typography>
        <List sx={{ color: "white" }}>
          {activityLog.map((log, index) => (
            <ListItem key={index}>
              <ListItemText primary={log} />
            </ListItem>
          ))}
        </List>
      </Paper>

      {/* Comments Section */}
      <Paper sx={{ padding: 2, backgroundColor: "#1e1e1e", marginTop: 4 }}>
        <Typography variant="h5" color="primary" gutterBottom>
          Comments on Drafts
        </Typography>
        <List sx={{ color: "white" }}>
          {comments.map((comment, index) => (
            <ListItem key={index}>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: "primary.main" }}>
                  <CommentIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={`Post: ${comment.post}`} secondary={comment.comment} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default Team;
