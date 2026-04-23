/**
 * DeveloperHeader.js
 * Displays developer profile info at the top of the dashboard.
 * Shows name, role, team, and the reporting month.
 *
 * Props:
 *   developer: { name, role, team, avatar, month }
 */

import React from "react";

function DeveloperHeader({ developer }) {
  return (
    <div className="dev-header">
      {/* Avatar circle using initials */}
      <div className="dev-header__avatar" aria-label={`Avatar for ${developer.name}`}>
        {developer.avatar}
      </div>

      <div className="dev-header__info">
        <h1 className="dev-header__name">{developer.name}</h1>
        <p className="dev-header__meta">
          {developer.role} · <span className="dev-header__team">{developer.team} Team</span>
        </p>
      </div>

      <div className="dev-header__month-badge">
        📅 {developer.month}
      </div>
    </div>
  );
}

export default DeveloperHeader;
