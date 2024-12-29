import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
  const navigate = useNavigate();
  const [analyticsData, setAnalyticsData] = useState({
    followers: 10000,
    engagementRate: 4.5,
    reach: 50000,
    impressions: 120000,
  });
  const [recentActivity, setRecentActivity] = useState([
    { activity: "User123 started following you", timestamp: "2 minutes ago" },
    { activity: "Post A reached 1,000 likes", timestamp: "5 minutes ago" },
    { activity: "Comment from User456", timestamp: "10 minutes ago" },
  ]);
  const [scheduledPosts, setScheduledPosts] = useState([
    {
      platform: "Instagram",
      content: "Post about New Year Campaign",
      time: "2024-12-31 10:00 AM",
      status: "Scheduled",
    },
    {
      platform: "Facebook",
      content: "Happy Holidays!",
      time: "2024-12-25 09:00 AM",
      status: "Draft",
    },
  ]);
  const [selectedPlatform, setSelectedPlatform] = useState("Instagram");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    // Simulate fetching updated analytics data
    setAnalyticsData({
      followers: 12000,
      engagementRate: 5.2,
      reach: 60000,
      impressions: 150000,
    });
  }, []);

  const pageEngagementData = [
    { month: "Jan", engagementRate: 4.5 },
    { month: "Feb", engagementRate: 4.7 },
    { month: "Mar", engagementRate: 5.0 },
    { month: "Apr", engagementRate: 4.9 },
    { month: "May", engagementRate: 5.2 },
    { month: "Jun", engagementRate: 5.1 },
  ];

  const overallPerformanceData = [
    { metric: "Reach", value: 60000 },
    { metric: "Impressions", value: 150000 },
    { metric: "Followers", value: 12000 },
  ];

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn"); // Clear login state
    navigate("/login"); // Redirect to login
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <div style={styles.dashboardContainer}>
      {/* Header Section */}
      <div style={styles.header}>
        <h1 style={styles.title}>Social Media Dashboard</h1>
        <div style={styles.headerActions}>
          <Link to="/create-post" style={styles.button}>
            Create New Post
          </Link>
          <div style={styles.dropdownContainer}>
            <button onClick={toggleDropdown} style={styles.dropdownButton}>
              Menu
            </button>
            {isDropdownOpen && (
              <div style={styles.dropdownMenu}>
                <Link to="/analytics" style={styles.dropdownItem}>
                  Analytics
                </Link>
                <Link to="/content-manager" style={styles.dropdownItem}>
                  Content Manager
                </Link>
                <Link to="/team-collaboration" style={styles.dropdownItem}>
                  Team Collaboration
                </Link>
                <Link to="/settings" style={styles.dropdownItem}>
                  Settings
                </Link>
              </div>
            )}
          </div>
          <button onClick={handleLogout} style={styles.logoutButton}>
            Logout
          </button>
        </div>
      </div>

      {/* Platform Selection */}
      <div style={styles.platformSelection}>
        <label>Select Platform:</label>
        <select
          value={selectedPlatform}
          onChange={(e) => setSelectedPlatform(e.target.value)}
          style={styles.select}
        >
          <option value="Instagram">Instagram</option>
          <option value="Facebook">Facebook</option>
          <option value="YouTube">YouTube</option>
          <option value="TikTok">TikTok</option>
          <option value="Snapchat">Snapchat</option>
          <option value="LinkedIn">LinkedIn</option>
        </select>
      </div>

      {/* Main Content */}
      <div style={styles.mainSection}>
        {/* Page Engagement */}
        <div style={styles.widget}>
          <h2>Page Engagement</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={pageEngagementData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="engagementRate" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Latest Post */}
        <div style={styles.widget}>
          <h2>Latest Post</h2>
          <div style={styles.latestPost}>
            <p>Post Content: "Happy New Year! #2024"</p>
            <p>Posted on: 2024-01-01</p>
            <p>Likes: 200</p>
            <p>Comments: 50</p>
          </div>
        </div>

        {/* Scheduled Posts */}
        <div style={styles.widget}>
          <h2>Scheduled Posts</h2>
          <div style={styles.scheduledPostsList}>
            {scheduledPosts.map((post, index) => (
              <div key={index} style={styles.postItem}>
                <h3>{post.platform}</h3>
                <p>{post.content}</p>
                <p>{post.time}</p>
                <p>
                  <strong>Status:</strong> {post.status}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Overall Performance */}
        <div style={styles.widget}>
          <h2>Overall Performance</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={overallPerformanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="metric" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Team Collaboration */}
        <div style={styles.widget}>
          <h2>Team Collaboration</h2>
          <div style={styles.teamCollaboration}>
            <p>Collaborate with your team to manage posts, track performance, and create campaigns.</p>
            <p><strong>Active Team Members:</strong> 5</p>
            <p><strong>Latest Activity:</strong> John Doe approved a new post.</p>
            <button style={styles.button}>View Team Dashboard</button>
          </div>
        </div>

        {/* Recent Activity */}
        <div style={styles.widget}>
          <h2>Recent Activity</h2>
          <div style={styles.recentActivityList}>
            {recentActivity.map((activity, index) => (
              <div key={index} style={styles.activityItem}>
                <p>{activity.activity}</p>
                <small>{activity.timestamp}</small>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div style={styles.footer}>
        <p>&copy; 2024 Social Media Dashboard. All rights reserved.</p>
      </div>
    </div>
  );
};

// Styles for the Dropdown and Dashboard
const styles = {
  dashboardContainer: {
    backgroundColor: "#171717",
    color: "#fff",
    fontFamily: "Arial, sans-serif",
    padding: "20px",
    minHeight: "100vh",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: "20px",
  },
  title: {
    fontSize: "28px",
    color: "#fff",
  },
  headerActions: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#3182ce",
    color: "#fff",
    padding: "10px 20px",
    textDecoration: "none",
    borderRadius: "5px",
    fontSize: "14px",
    transition: "background-color 0.2s",
  },
  logoutButton: {
    backgroundColor: "#e53e3e",
    color: "#fff",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    fontSize: "14px",
    cursor: "pointer",
  },
  dropdownContainer: {
    position: "relative",
  },
  dropdownButton: {
    backgroundColor: "#2c5282",
    color: "#fff",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    fontSize: "14px",
    cursor: "pointer",
  },
  dropdownMenu: {
    position: "absolute",
    top: "100%",
    right: "0",
    backgroundColor: "#1f2937",
    borderRadius: "5px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.4)",
    zIndex: 10,
    width: "150px",
  },
  dropdownItem: {
    display: "block",
    padding: "10px",
    color: "#fff",
    textDecoration: "none",
    fontSize: "14px",
    borderBottom: "1px solid #333",
  },
  platformSelection: {
    marginBottom: "20px",
  },
  select: {
    padding: "10px",
    borderRadius: "5px",
    fontSize: "14px",
  },
  mainSection: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "20px",
    marginTop: "30px",
  },
  widget: {
    backgroundColor: "#1f1f1f",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.4)",
  },
  footer: {
    textAlign: "center",
    marginTop: "30px",
    color: "#777",
  },
  teamCollaboration: {
    marginTop: "20px",
  },
};

export default Dashboard;
