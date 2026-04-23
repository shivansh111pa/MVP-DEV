/**
 * mockData.js
 * This simulates data that would come from Jira, GitHub, and CI/CD systems.
 * In a real app, this would be fetched from actual APIs or a database.
 */

const developerData = {
  id: "dev_001",
  name: "Arjun Sharma",
  role: "Senior Frontend Engineer",
  team: "Platform",
  avatar: "AS",
  month: "June 2025",
};

/**
 * Pull Request data (simulates GitHub/GitLab data)
 * Used to calculate: Lead Time, PR Throughput
 */
const pullRequests = [
  { id: "PR-101", opened: "2025-06-01", merged: "2025-06-02", deployed: "2025-06-03", merged: true },
  { id: "PR-102", opened: "2025-06-03", merged: "2025-06-05", deployed: "2025-06-06", merged: true },
  { id: "PR-103", opened: "2025-06-07", merged: "2025-06-12", deployed: "2025-06-14", merged: true },
  { id: "PR-104", opened: "2025-06-10", merged: "2025-06-11", deployed: "2025-06-12", merged: true },
  { id: "PR-105", opened: "2025-06-14", merged: "2025-06-16", deployed: "2025-06-18", merged: true },
  { id: "PR-106", opened: "2025-06-17", merged: "2025-06-19", deployed: "2025-06-20", merged: true },
  { id: "PR-107", opened: "2025-06-20", merged: "2025-06-22", deployed: "2025-06-23", merged: true },
  { id: "PR-108", opened: "2025-06-24", merged: "2025-06-25", deployed: "2025-06-26", merged: true },
];

/**
 * Issue/Task data (simulates Jira data)
 * Used to calculate: Cycle Time
 */
const issues = [
  { id: "ISSUE-201", startedAt: "2025-06-01", completedAt: "2025-06-04" },
  { id: "ISSUE-202", startedAt: "2025-06-03", completedAt: "2025-06-07" },
  { id: "ISSUE-203", startedAt: "2025-06-08", completedAt: "2025-06-10" },
  { id: "ISSUE-204", startedAt: "2025-06-11", completedAt: "2025-06-14" },
  { id: "ISSUE-205", startedAt: "2025-06-15", completedAt: "2025-06-18" },
  { id: "ISSUE-206", startedAt: "2025-06-19", completedAt: "2025-06-22" },
  { id: "ISSUE-207", startedAt: "2025-06-23", completedAt: "2025-06-26" },
];

/**
 * Deployment data (simulates CI/CD pipeline data)
 * Used to calculate: Deployment Frequency
 */
const deployments = [
  { id: "DEPLOY-301", date: "2025-06-03", status: "success" },
  { id: "DEPLOY-302", date: "2025-06-06", status: "success" },
  { id: "DEPLOY-303", date: "2025-06-12", status: "success" },
  { id: "DEPLOY-304", date: "2025-06-14", status: "success" },
  { id: "DEPLOY-305", date: "2025-06-18", status: "success" },
  { id: "DEPLOY-306", date: "2025-06-20", status: "success" },
  { id: "DEPLOY-307", date: "2025-06-23", status: "success" },
  { id: "DEPLOY-308", date: "2025-06-26", status: "success" },
];

/**
 * Bug data (simulates post-release bug reports)
 * Used to calculate: Bug Rate
 */
const bugs = [
  { id: "BUG-401", reportedAt: "2025-06-08", severity: "medium" },
  { id: "BUG-402", reportedAt: "2025-06-15", severity: "low" },
];

module.exports = {
  developerData,
  pullRequests,
  issues,
  deployments,
  bugs,
};
