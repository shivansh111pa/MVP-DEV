/**
 * App.js
 * Root component — orchestrates all sections of the DevPulse dashboard.
 *
 * Structure:
 *   <App>
 *     <DeveloperHeader />       ← who is this dashboard for
 *     <HealthSummaryBar />      ← quick at-a-glance status counts
 *     <MetricCard /> × 5        ← one card per metric
 *     <ManagerSummary />        ← bonus manager view
 *   </App>
 */

import React from "react";
import { useDeveloperData } from "./hooks/useDeveloperData";
import DeveloperHeader from "./components/DeveloperHeader";
import HealthSummaryBar from "./components/HealthSummaryBar";
import MetricCard from "./components/MetricCard";
import ManagerSummary from "./components/ManagerSummary";
import "./App.css";

function App() {
  // Fetch all data from backend
  const { data, loading, error } = useDeveloperData();

  // Loading state
  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-screen__spinner" />
        <p>Loading your productivity metrics…</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="error-screen">
        <p>⚠️ Could not load data. Make sure the backend is running on port 3001.</p>
        <code>{error}</code>
      </div>
    );
  }

  return (
    <div className="app">
      {/* Top nav bar */}
      <header className="app-nav">
        <span className="app-nav__logo">⚡ DevPulse</span>
        <span className="app-nav__tagline">Developer Productivity Dashboard</span>
      </header>

      <main className="app-main">
        {/* Developer profile */}
        <DeveloperHeader developer={data.developer} />

        {/* Health summary row */}
        <HealthSummaryBar metrics={data.metrics} />

        {/* Section title */}
        <div className="section-title">
          <h2>📊 Your Metrics This Month</h2>
          <p className="section-title__sub">Click any card to see what the number means and what to do next.</p>
        </div>

        {/* Metric cards grid */}
        <div className="metrics-grid">
          {data.metrics.map((metric) => (
            <MetricCard key={metric.id} metric={metric} />
          ))}
        </div>

        {/* Raw data transparency box */}
        <div className="raw-data-box">
          <h3>🔢 Data Source Summary</h3>
          <p>
            This month: <strong>{data.rawData.totalPRs}</strong> pull requests ·{" "}
            <strong>{data.rawData.totalIssues}</strong> issues completed ·{" "}
            <strong>{data.rawData.totalDeployments}</strong> deployments ·{" "}
            <strong>{data.rawData.totalBugs}</strong> escaped bugs
          </p>
        </div>

        {/* Bonus: manager view */}
        <ManagerSummary />
      </main>

      <footer className="app-footer">
        DevPulse MVP · Built with React + Express · Data is mocked for demonstration
      </footer>
    </div>
  );
}

export default App;
