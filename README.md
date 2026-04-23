# ⚡ DevPulse — Developer Productivity MVP

A simple full-stack app that helps individual contributors understand their 5 key productivity metrics and get actionable suggestions.

---

## 📁 Project Structure

```
devpulse/
├── backend/
│   ├── data/
│   │   └── mockData.js          ← Simulated GitHub, Jira, CI/CD data
│   ├── utils/
│   │   ├── metricsCalculator.js ← Pure functions to calculate each metric
│   │   └── interpretationEngine.js ← Thresholds + suggestions per metric
│   ├── server.js                ← Express API server (2 endpoints)
│   └── package.json
│
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   ├── DeveloperHeader.js   ← Profile bar at top
    │   │   ├── HealthSummaryBar.js  ← Green/yellow/red count summary
    │   │   ├── MetricCard.js        ← One card per metric (expandable)
    │   │   └── ManagerSummary.js   ← Bonus: team overview table
    │   ├── hooks/
    │   │   └── useDeveloperData.js  ← Custom hooks for data fetching
    │   ├── App.js                   ← Root component
    │   ├── App.css                  ← All styles (dark theme)
    │   └── index.js                 ← React entry point
    └── package.json
```

---

## 🚀 How to Run

### 1. Start the Backend
```bash
cd backend
npm install
npm start
# → Runs on http://localhost:3001
```

### 2. Start the Frontend
```bash
cd frontend
npm install
npm start
# → Runs on http://localhost:3000
```

Open **http://localhost:3000** in your browser.

---

## 🔌 API Endpoints

| Endpoint | What it returns |
|----------|----------------|
| `GET /api/developer` | Developer profile + all 5 metrics with values, status, interpretation, suggestions |
| `GET /api/team` | Manager summary with all team members |

---

## 📊 The 5 Metrics

| Metric | Definition |
|--------|-----------|
| **Lead Time** | Avg days from PR opened → production deployment |
| **Cycle Time** | Avg days from issue started → issue done |
| **Bug Rate** | (escaped bugs / completed issues) × 100 |
| **Deploy Frequency** | Count of successful production deploys this month |
| **PR Throughput** | Count of merged PRs this month |

---

## 🎯 Design Decisions

1. **Backend is the calculation layer** — React never calculates metrics. All logic lives in `metricsCalculator.js` so it can be tested and reused independently.

2. **Interpretation is separated from calculation** — `interpretationEngine.js` only takes a number and returns a human decision. This separation makes thresholds easy to adjust.

3. **Mock data over real DB** — For an MVP, mock data is the right call. It lets us demonstrate the full product flow without infrastructure complexity.

4. **Custom React hook** — `useDeveloperData` isolates API-fetching so components stay clean and focused on rendering.

5. **Expandable cards** — Showing metrics + interpretation in a single expandable card reduces cognitive load. The user sees numbers first, then digs in.
