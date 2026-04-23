/**
 * ManagerSummary.js
 * Bonus: lightweight manager view showing all team members' metric status.
 * Uses the /api/team endpoint.
 *
 * Props: none (fetches its own data internally via useTeamData hook)
 */

import React, { useState } from "react";
import { useTeamData } from "../hooks/useDeveloperData";

// Maps overall status to color/label
const STATUS_DISPLAY = {
  good: { label: "✅ Healthy", className: "team-status--good" },
  warning: { label: "⚠️ Watch", className: "team-status--warning" },
  bad: { label: "🔴 At Risk", className: "team-status--bad" },
};

function ManagerSummary() {
  const { data, loading, error } = useTeamData();
  const [visible, setVisible] = useState(false);

  if (!visible) {
    return (
      <div className="manager-toggle">
        <button className="manager-toggle__btn" onClick={() => setVisible(true)}>
          👔 View Manager Summary
        </button>
      </div>
    );
  }

  if (loading) return <p className="loading-text">Loading team data...</p>;
  if (error) return <p className="error-text">Could not load team data.</p>;

  return (
    <section className="manager-section">
      <div className="manager-section__header">
        <h2>👔 Manager Summary — {data.teamName}</h2>
        <button className="manager-toggle__btn manager-toggle__btn--close" onClick={() => setVisible(false)}>
          ✕ Close
        </button>
      </div>

      {/* Team insight callout */}
      <div className="manager-section__insight">
        💬 <strong>Team Insight:</strong> {data.insight}
      </div>

      {/* Team members table */}
      <div className="team-table-wrapper">
        <table className="team-table">
          <thead>
            <tr>
              <th>Developer</th>
              <th>Lead Time</th>
              <th>Cycle Time</th>
              <th>Bug Rate</th>
              <th>Deploy Freq</th>
              <th>PR Throughput</th>
              <th>Overall</th>
            </tr>
          </thead>
          <tbody>
            {data.members.map((member) => {
              const statusDisplay = STATUS_DISPLAY[member.status] || STATUS_DISPLAY.warning;
              return (
                <tr key={member.name}>
                  <td className="team-table__name">{member.name}</td>
                  <td>{member.leadTime}d</td>
                  <td>{member.cycleTime}d</td>
                  <td>{member.bugRate}%</td>
                  <td>{member.deployFreq}</td>
                  <td>{member.prThroughput}</td>
                  <td>
                    <span className={`team-status ${statusDisplay.className}`}>
                      {statusDisplay.label}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default ManagerSummary;
