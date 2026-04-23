/**
 * interpretationEngine.js
 * Takes calculated metric values and returns:
 *   - status: "good" | "warning" | "bad"
 *   - interpretation: a human-readable explanation of what the number means
 *   - suggestions: 1-2 actionable next steps
 *
 * Thresholds are simplified for this assignment (not industry-standard).
 */

function interpretLeadTime(days) {
  let status, interpretation, suggestions;

  if (days <= 2) {
    status = "good";
    interpretation = "Your changes are reaching production quickly. This reflects a smooth review and deploy process.";
    suggestions = [
      "Keep PRs small and focused — this is what makes your lead time fast.",
      "Document this workflow so teammates can replicate it.",
    ];
  } else if (days <= 5) {
    status = "warning";
    interpretation = "Moderate lead time. There may be review delays or deployment pipeline wait time adding friction.";
    suggestions = [
      "Break large PRs into smaller, reviewable chunks to reduce wait time.",
      "Check if PRs are waiting on reviewers — a nudge or rotation policy can help.",
    ];
  } else {
    status = "bad";
    interpretation = "High lead time means changes are taking too long to reach users. This can slow down feedback and increase risk.";
    suggestions = [
      "Aim for PRs under 200 lines — smaller PRs get reviewed faster.",
      "Set up async review reminders so PRs don't sit idle for days.",
    ];
  }

  return { status, interpretation, suggestions };
}

function interpretCycleTime(days) {
  let status, interpretation, suggestions;

  if (days <= 3) {
    status = "good";
    interpretation = "You're completing tasks efficiently. Issues move quickly from started to done.";
    suggestions = [
      "Continue scoping tasks tightly so each one can be completed in a short sprint.",
      "Share your task-breaking strategy with the team.",
    ];
  } else if (days <= 6) {
    status = "warning";
    interpretation = "Some tasks are taking longer than expected. This could be due to unclear scope or blockers.";
    suggestions = [
      "Before starting an issue, clarify acceptance criteria to avoid mid-task scope creep.",
      "Flag blockers in standups early instead of waiting until they pile up.",
    ];
  } else {
    status = "bad";
    interpretation = "Long cycle time suggests tasks may be too large, have unclear requirements, or face repeated blockers.";
    suggestions = [
      "Split large issues into sub-tasks of 1–2 day scope each.",
      "Run a quick retrospective on why tasks are taking so long — is it scope, reviews, or dependencies?",
    ];
  }

  return { status, interpretation, suggestions };
}

function interpretBugRate(rate) {
  let status, interpretation, suggestions;

  if (rate <= 10) {
    status = "good";
    interpretation = "Low bug rate — your code is shipping with high quality. Testing and reviews are working well.";
    suggestions = [
      "Maintain your testing discipline. Consider adding edge-case tests for new features.",
      "Document patterns that are working so the team can adopt them.",
    ];
  } else if (rate <= 25) {
    status = "warning";
    interpretation = "Some bugs are escaping to production. A few tests or review steps may be missing.";
    suggestions = [
      "Add unit tests for any bug that escapes — this prevents regressions.",
      "Review PRs with a bug-detection mindset, not just a style mindset.",
    ];
  } else {
    status = "bad";
    interpretation = "High bug rate means quality gates before production aren't catching enough issues. This erodes user trust.";
    suggestions = [
      "Introduce or improve pre-merge test coverage, especially for critical paths.",
      "Consider a staging environment checklist before every production deploy.",
    ];
  }

  return { status, interpretation, suggestions };
}

function interpretDeploymentFrequency(count) {
  let status, interpretation, suggestions;

  if (count >= 8) {
    status = "good";
    interpretation = "Frequent deployments mean you're delivering value consistently and getting fast feedback from production.";
    suggestions = [
      "Keep deployments small so each one is low-risk and easy to roll back.",
      "Monitor post-deploy alerts so high frequency doesn't introduce instability.",
    ];
  } else if (count >= 4) {
    status = "warning";
    interpretation = "Moderate deployment frequency. There may be manual gates or batch releases slowing things down.";
    suggestions = [
      "Look for manual approval steps that could be automated with confidence.",
      "Aim to decouple features using feature flags so deploys aren't tied to feature readiness.",
    ];
  } else {
    status = "bad";
    interpretation = "Low deployment frequency suggests deployments are large, risky, or infrequent — making each one stressful.";
    suggestions = [
      "Break releases into smaller batches. 'Deploy early, deploy often' reduces risk per deploy.",
      "Invest in automated CI/CD pipeline improvements to lower the cost of each deploy.",
    ];
  }

  return { status, interpretation, suggestions };
}

function interpretPRThroughput(count) {
  let status, interpretation, suggestions;

  if (count >= 7) {
    status = "good";
    interpretation = "High PR throughput means you're shipping consistently throughout the month.";
    suggestions = [
      "Ensure throughput reflects quality, not just quantity — balance speed with review depth.",
      "Consider code pairing on complex PRs so throughput doesn't sacrifice understanding.",
    ];
  } else if (count >= 4) {
    status = "warning";
    interpretation = "Moderate throughput. Some work may be stalling in review or in large branches.";
    suggestions = [
      "Avoid long-lived branches — merge incrementally even if the feature isn't fully complete.",
      "Use draft PRs to share work early and get directional feedback sooner.",
    ];
  } else {
    status = "bad";
    interpretation = "Low PR throughput could mean work is batched into large PRs, or progress is getting blocked.";
    suggestions = [
      "Aim for 1–2 merged PRs per week as a baseline habit.",
      "Review your in-progress work — is anything stuck waiting for review or decisions?",
    ];
  }

  return { status, interpretation, suggestions };
}

module.exports = {
  interpretLeadTime,
  interpretCycleTime,
  interpretBugRate,
  interpretDeploymentFrequency,
  interpretPRThroughput,
};
