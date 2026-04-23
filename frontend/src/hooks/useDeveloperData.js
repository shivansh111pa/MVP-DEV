/**
 * useDeveloperData.js
 * Custom React hook that fetches developer metrics from the backend.
 * Separates data-fetching logic from UI components — good practice.
 *
 * Returns: { data, loading, error }
 */

import { useState, useEffect } from "react";

export function useDeveloperData() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch from our Express backend (proxied via package.json "proxy" field)
    fetch("/api/developer")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch developer data");
        return res.json();
      })
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return { data, loading, error };
}

export function useTeamData() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/team")
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return { data, loading, error };
}
