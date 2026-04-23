/**
 * MetricCard.js
 * Displays a single metric with:
 *   - Icon, label, value
 *   - Color-coded status badge (good/warning/bad)
 *   - Expandable interpretation + suggestions
 *
 * Props:
 *   metric: { label, value, unit, icon, status, interpretation, suggestions, description }
 */

import React, { useState } from "react";

// Maps status string to CSS class (defined in App.css)
const STATUS_CONFIG = {
  good: { label: "On Track", className: "status-good", dot: "🟢" },
  warning: { label: "Needs Attention", className: "status-warning", dot: "🟡" },
  bad: { label: "At Risk", className: "status-bad", dot: "🔴" },
};

function MetricCard({ metric }) {
  // Toggle to show/hide interpretation details
  const [expanded, setExpanded] = useState(false);

  const statusConfig = STATUS_CONFIG[metric.status] || STATUS_CONFIG.warning;

  return (
    <div className={`metric-card metric-card--${metric.status}`}>
      {/* Header Row */}
      <div className="metric-card__header">
        <span className="metric-card__icon">{metric.icon}</span>
        <div className="metric-card__title-group">
          <h3 className="metric-card__label">{metric.label}</h3>
          <p className="metric-card__description">{metric.description}</p>
        </div>
        <span className={`metric-card__badge ${statusConfig.className}`}>
          {statusConfig.dot} {statusConfig.label}
        </span>
      </div>

      {/* Big Number */}
      <div className="metric-card__value-row">
        <span className="metric-card__value">{metric.value}</span>
        <span className="metric-card__unit">{metric.unit}</span>
      </div>

      {/* Toggle Button */}
      <button
        className="metric-card__toggle"
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
      >
        {expanded ? "▲ Hide details" : "▼ See interpretation & suggestions"}
      </button>

      {/* Expandable Details */}
      {expanded && (
        <div className="metric-card__details">
          {/* Interpretation */}
          <div className="metric-card__interpretation">
            <h4>💡 What this means</h4>
            <p>{metric.interpretation}</p>
          </div>

          {/* Suggestions */}
          <div className="metric-card__suggestions">
            <h4>✅ Suggested Actions</h4>
            <ul>
              {metric.suggestions.map((suggestion, idx) => (
                <li key={idx}>{suggestion}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default MetricCard;
