/**
 * server.js
 * Express backend for DevPulse MVP.
 * Exposes two endpoints:
 *   GET /api/developer  → developer profile + calculated metrics + interpretations
 *   GET /api/team       → lightweight manager summary
 *
 * No database needed — all data comes from mockData.js
 */

const express = require("express");
const cors = require("cors");
const path = require("path");
const serverless = require("serverless-http");

const { developerData, pullRequests, issues, deployments, bugs } = require("./data/mockData");
const {
  calculateLeadTime,
  calculateCycleTime,
  calculateBugRate,
  calculateDeploymentFrequency,
  calculatePRThroughput,
} = require("./utils/metricsCalculator");
const {
  interpretLeadTime,
  interpretCycleTime,
  interpretBugRate,
  interpretDeploymentFrequency,
  interpretPRThroughput,
} = require("./utils/interpretationEngine");

const app = express();
const PORT = process.env.PORT || 3001;

// Allow React dev server (port 3000) to call this backend
app.use(cors());
app.use(express.json());

const apiRouter = express.Router();

// Root route - health check/welcome
apiRouter.get("/", (req, res) => {
  res.send(`
    <div style="font-family: sans-serif; padding: 40px; line-height: 1.6;">
      <h1 style="color: #3b82f6;">⚡ DevPulse API is Running</h1>
      <p>The backend is active and serving data.</p>
      <ul style="list-style: none; padding: 0;">
        <li>?? <strong>Developer API:</strong> <a href="/api/developer">/api/developer</a></li>
        <li>?? <strong>Team API:</strong> <a href="/api/team">/api/team</a></li>
      </ul>
      <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
      <p style="font-size: 0.9em; color: #666;">Open your frontend to see the dashboard.</p>
    </div>
  `);
});

/**
 * GET /api/developer
 * Returns developer profile + all 5 metrics with values, status, interpretation, and suggestions
 */
apiRouter.get("/developer", (req, res) => {
  // Step 1: Calculate raw metric values
  const leadTime = calculateLeadTime(pullRequests);
  const cycleTime = calculateCycleTime(issues);
  const bugRate = calculateBugRate(bugs, issues);
  const deployFreq = calculateDeploymentFrequency(deployments);
  const prThroughput = calculatePRThroughput(pullRequests);

  // Step 2: Get interpretation + suggestions for each
  const leadTimeInterp = interpretLeadTime(leadTime);
  const cycleTimeInterp = interpretCycleTime(cycleTime);
  const bugRateInterp = interpretBugRate(bugRate);
  const deployFreqInterp = interpretDeploymentFrequency(deployFreq);
  const prThroughputInterp = interpretPRThroughput(prThroughput);

  // Step 3: Shape the response
  const response = {
    developer: developerData,
    metrics: [
      {
        id: "lead_time",
        label: "Lead Time",
        value: leadTime,
        unit: "days",
        icon: "⏱",
        description: "Avg time from PR opened to production deploy",
        ...leadTimeInterp,
      },
      {
        id: "cycle_time",
        label: "Cycle Time",
        value: cycleTime,
        unit: "days",
        icon: "🔄",
        description: "Avg time from issue started to issue done",
        ...cycleTimeInterp,
      },
      {
        id: "bug_rate",
        label: "Bug Rate",
        value: bugRate,
        unit: "%",
        icon: "🐛",
        description: "Escaped production bugs / completed issues",
        ...bugRateInterp,
      },
      {
        id: "deploy_freq",
        label: "Deploy Frequency",
        value: deployFreq,
        unit: "deploys",
        icon: "🚀",
        description: "Successful production deploys this month",
        ...deployFreqInterp,
      },
      {
        id: "pr_throughput",
        label: "PR Throughput",
        value: prThroughput,
        unit: "PRs",
        icon: "📦",
        description: "Merged pull requests this month",
        ...prThroughputInterp,
      },
    ],
    // Raw counts for transparency
    rawData: {
      totalPRs: pullRequests.length,
      totalIssues: issues.length,
      totalDeployments: deployments.length,
      totalBugs: bugs.length,
    },
  };

  res.json(response);
});

/**
 * GET /api/team
 * Bonus: lightweight manager summary with mock team data
 */
apiRouter.get("/team", (req, res) => {
  const teamSummary = {
    teamName: "Platform Engineering",
    month: "June 2025",
    teamSize: 5,
    members: [
      { name: "Arjun Sharma", leadTime: 3.1, cycleTime: 3.7, bugRate: 28.6, deployFreq: 8, prThroughput: 8, status: "warning" },
      { name: "Priya Nair", leadTime: 1.8, cycleTime: 2.5, bugRate: 8.0, deployFreq: 10, prThroughput: 10, status: "good" },
      { name: "Rahul Desai", leadTime: 6.2, cycleTime: 7.1, bugRate: 40.0, deployFreq: 4, prThroughput: 4, status: "bad" },
      { name: "Sneha Iyer", leadTime: 2.3, cycleTime: 3.0, bugRate: 12.0, deployFreq: 9, prThroughput: 7, status: "good" },
      { name: "Karan Mehta", leadTime: 4.5, cycleTime: 5.2, bugRate: 22.0, deployFreq: 6, prThroughput: 5, status: "warning" },
    ],
    teamHealth: "warning", // derived from aggregate
    insight: "2 of 5 developers have high bug rates. Consider a team-wide testing workshop.",
  };

  res.json(teamSummary);
});

// Mount router
app.use("/api", apiRouter);
app.use("/.netlify/functions/server/api", apiRouter);

// Serve static frontend in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
  });
}

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`✅ DevPulse backend running on port ${PORT}`);
  });
}

// Export for serverless environments (like Netlify)
module.exports.handler = serverless(app);

