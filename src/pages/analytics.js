import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Tooltip,
  Legend,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Cell,
} from "recharts";

const Analytics = () => {
  const [analyticsData, setAnalyticsData] = useState({
    engagementRate: 4.5,
    impressions: 120000,
    clicks: 15000,
    conversionRate: 3.2,
    reach: 80000,
  });
  const [platformMetrics, setPlatformMetrics] = useState({
    Instagram: { saves: 3000, profileVisits: 1200, storyReach: 15000 },
    Facebook: { pageLikes: 400, postShares: 200, videoViews: 10000 },
    LinkedIn: { postImpressions: 8000, profileViews: 500, followers: 2000 },
    Twitter: { retweets: 150, mentions: 300, hashtagPerformance: 1200 },
    TikTok: { videoViews: 25000, shares: 1000, followerGrowth: 200 },
  });
  const [selectedPlatform, setSelectedPlatform] = useState("Instagram");
  const [goalTracking, setGoalTracking] = useState({
    followerGrowth: 1000,
    impressions: 120000,
    reach: 80000,
  });
  const [selectedMetrics, setSelectedMetrics] = useState("Engagement Rate");
  
  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042"];

  // Simulating the fetching of data
  useEffect(() => {
    setAnalyticsData({
      engagementRate: 5.2,
      impressions: 150000,
      clicks: 20000,
      conversionRate: 4.1,
      reach: 100000,
    });
  }, []);

  const handlePlatformChange = (e) => {
    setSelectedPlatform(e.target.value);
  };

  const handleMetricsChange = (e) => {
    setSelectedMetrics(e.target.value);
  };

  const metricsData = [
    { name: "Engagement Rate", value: analyticsData.engagementRate },
    { name: "Impressions", value: analyticsData.impressions },
    { name: "Clicks", value: analyticsData.clicks },
    { name: "Conversion Rate", value: analyticsData.conversionRate },
    { name: "Reach", value: analyticsData.reach },
  ];

  const platformSpecificMetrics = Object.entries(platformMetrics[selectedPlatform] || {}).map(
    ([key, value]) => ({
      name: key,
      value,
    })
  );

  // Historical Data (Example)
  const historicalData = [
    { month: "Jan", metric: 50000 },
    { month: "Feb", metric: 60000 },
    { month: "Mar", metric: 70000 },
    { month: "Apr", metric: 80000 },
  ];

  // Trend Analysis Data (e.g., year over year or month-over-month)
  const trendData = [
    { month: "Jan", engagementRate: 4.5, impressions: 50000 },
    { month: "Feb", engagementRate: 4.8, impressions: 60000 },
    { month: "Mar", engagementRate: 5.0, impressions: 70000 },
    { month: "Apr", engagementRate: 5.2, impressions: 80000 },
  ];

  // Campaign Comparison Example
  const campaignData = [
    { name: "Campaign 1", engagement: 5000, reach: 3000, impressions: 7000 },
    { name: "Campaign 2", engagement: 4500, reach: 2500, impressions: 6000 },
    { name: "Campaign 3", engagement: 6000, reach: 3500, impressions: 8000 },
  ];

  // ROI & Budget Tracking Example
  const roiData = [
    { name: "Ad Spend", value: 5000 },
    { name: "Revenue", value: 15000 },
  ];

  // Function for Goal Tracking
  const handleGoalTracking = () => {
    alert("Goal Tracking Placeholder - Here you would track progress towards specific goals!");
  };

  return (
    <div style={styles.analyticsContainer}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>Analytics & Reporting</h1>
        <div>
          <Link to="/dashboard" style={styles.button}>
            Back to Dashboard
          </Link>
        </div>
      </div>

      {/* Platform Selector */}
      <div style={styles.platformSelector}>
        <label>Select Platform: </label>
        <select
          value={selectedPlatform}
          onChange={handlePlatformChange}
          style={styles.select}
        >
          {Object.keys(platformMetrics).map((platform) => (
            <option key={platform} value={platform}>
              {platform}
            </option>
          ))}
        </select>
      </div>

      {/* Metrics Selector */}
      <div style={styles.platformSelector}>
        <label>Select Metric: </label>
        <select
          value={selectedMetrics}
          onChange={handleMetricsChange}
          style={styles.select}
        >
          {metricsData.map((metric) => (
            <option key={metric.name} value={metric.name}>
              {metric.name}
            </option>
          ))}
        </select>
      </div>

      {/* Visualizations */}
      <div style={styles.visualizations}>
        {/* Core Metrics */}
        <div style={styles.chartContainer}>
          <h2>Core Metrics Overview</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                dataKey="value"
                isAnimationActive={false}
                data={metricsData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {metricsData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Platform-Specific Metrics */}
        <div style={styles.chartContainer}>
          <h2>{selectedPlatform} Specific Metrics</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={platformSpecificMetrics}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Trend Analysis */}
        <div style={styles.chartContainer}>
          <h2>Trend Analysis</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="engagementRate" stroke="#8884d8" />
              <Line type="monotone" dataKey="impressions" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Campaign Comparison */}
        <div style={styles.chartContainer}>
          <h2>Campaign Comparison</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={campaignData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="engagement" fill="#8884d8" />
              <Bar dataKey="reach" fill="#82ca9d" />
              <Bar dataKey="impressions" fill="#ffc658" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* ROI & Budget Tracking */}
        <div style={styles.chartContainer}>
          <h2>ROI & Budget Tracking</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                dataKey="value"
                data={roiData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#82ca9d"
                label
              >
                {roiData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Goal Tracking */}
      <div style={styles.chartContainer}>
        <h2>Goal Tracking</h2>
        <button onClick={handleGoalTracking} style={styles.button}>
          Track Goals
        </button>
      </div>
    </div>
  );
};

// Styles
const styles = {
  analyticsContainer: {
    backgroundColor: "#171717",
    color: "#fff",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
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
  button: {
    backgroundColor: "#3182ce",
    color: "#fff",
    padding: "10px 20px",
    textDecoration: "none",
    borderRadius: "5px",
    fontSize: "14px",
  },
  platformSelector: {
    marginBottom: "20px",
  },
  select: {
    padding: "10px",
    borderRadius: "5px",
    fontSize: "14px",
  },
  visualizations: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: "20px",
  },
  chartContainer: {
    backgroundColor: "#1f1f1f",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.4)",
  },
};

export default Analytics;
