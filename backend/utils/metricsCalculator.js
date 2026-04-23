/**
 * metricsCalculator.js
 * Pure functions that calculate each of the 5 DORA/productivity metrics.
 * Each function takes raw data and returns a number.
 * This is the "brain" of the backend — isolated and easy to test.
 */

/**
 * Helper: calculates difference between two date strings in days
 */
function daysBetween(startStr, endStr) {
  const start = new Date(startStr);
  const end = new Date(endStr);
  const diffMs = end - start;
  return Math.round(diffMs / (1000 * 60 * 60 * 24));
}

/**
 * METRIC 1: Lead Time for Changes
 * Definition: Average time (days) from PR opened → successful production deployment
 * Formula: mean(deployedDate - openedDate) for all merged+deployed PRs
 */
function calculateLeadTime(pullRequests) {
  const merged = pullRequests.filter((pr) => pr.merged && pr.deployed);
  if (merged.length === 0) return 0;

  const totalDays = merged.reduce((sum, pr) => {
    return sum + daysBetween(pr.opened, pr.deployed);
  }, 0);

  return parseFloat((totalDays / merged.length).toFixed(1));
}

/**
 * METRIC 2: Cycle Time
 * Definition: Average time (days) from issue moved to "In Progress" → issue marked "Done"
 * Formula: mean(completedAt - startedAt) for all completed issues
 */
function calculateCycleTime(issues) {
  if (issues.length === 0) return 0;

  const totalDays = issues.reduce((sum, issue) => {
    return sum + daysBetween(issue.startedAt, issue.completedAt);
  }, 0);

  return parseFloat((totalDays / issues.length).toFixed(1));
}

/**
 * METRIC 3: Bug Rate
 * Definition: (escaped production bugs this month) / (issues completed this month)
 * Expressed as a percentage for readability
 */
function calculateBugRate(bugs, issues) {
  if (issues.length === 0) return 0;
  const rate = bugs.length / issues.length;
  return parseFloat((rate * 100).toFixed(1)); // return as %
}

/**
 * METRIC 4: Deployment Frequency
 * Definition: Count of successful production deployments in the month
 */
function calculateDeploymentFrequency(deployments) {
  return deployments.filter((d) => d.status === "success").length;
}

/**
 * METRIC 5: PR Throughput
 * Definition: Count of merged pull requests in the month
 */
function calculatePRThroughput(pullRequests) {
  return pullRequests.filter((pr) => pr.merged).length;
}

module.exports = {
  calculateLeadTime,
  calculateCycleTime,
  calculateBugRate,
  calculateDeploymentFrequency,
  calculatePRThroughput,
};
