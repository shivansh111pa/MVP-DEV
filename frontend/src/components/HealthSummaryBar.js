/**
 * HealthSummaryBar.js
 * Shows a quick "health snapshot" row at the top of the dashboard.
 * Counts how many metrics are good / warning / bad.
 *
 * Props:
 *   metrics: array of metric objects (each with a .status field)
 */

import React from "react";

function HealthSummaryBar({ metrics }) {
  // Count each status type
  const counts = metrics.reduce(
    (acc, m) => {
      acc[m.status] = (acc[m.status] || 0) + 1;
      return acc;
    },
    { good: 0, warning: 0, bad: 0 }
  );

  // Determine overall health message
  let overallMessage;
  if (counts.bad >= 2) {
    overallMessage = "Several areas need attention. Focus on the red metrics first.";
  } else if (counts.warning >= 2) {
    overallMessage = "Looking mostly solid, with a few areas to improve.";
  } else {
    overallMessage = "Great job! Most metrics are healthy this month.";
  }

  return (
    <div className="health-bar">
      <div className="health-bar__counts">
        <span className="health-bar__chip health-bar__chip--good">🟢 {counts.good} On Track</span>
        <span className="health-bar__chip health-bar__chip--warning">🟡 {counts.warning} Needs Attention</span>
        <span className="health-bar__chip health-bar__chip--bad">🔴 {counts.bad} At Risk</span>
      </div>
      <p className="health-bar__message">{overallMessage}</p>
    </div>
  );
}

export default HealthSummaryBar;
