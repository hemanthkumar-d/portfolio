import { useState, useEffect, useCallback, useRef } from 'react';

export default function useFetch(fetchFn, deps = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [wakingUp, setWakingUp] = useState(false);
  const [timedOut, setTimedOut] = useState(false);
  const timerRef = useRef(null);

  const execute = useCallback(async () => {
    setLoading(true);
    setError(null);
    setWakingUp(false);
    setTimedOut(false);

    const start = Date.now();

    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      const elapsed = Date.now() - start;
      if (elapsed >= 5000 && elapsed < 30000) setWakingUp(true);
      if (elapsed >= 30000) {
        setTimedOut(true);
        setLoading(false);
        clearInterval(timerRef.current);
      }
    }, 1000);

    try {
      const res = await fetchFn();
      setData(res.data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setWakingUp(false);
      if (timerRef.current) clearInterval(timerRef.current);
    }
  }, deps);

  useEffect(() => {
    execute();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [execute]);

  return { data, loading, error, wakingUp, timedOut, refetch: execute };
}
