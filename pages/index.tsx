import React, { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import SessionTimer from '../components/SessionTimer';
import SessionSetup from '../components/SessionSetup';
import styles from '../styles/Home.module.css';

interface Session {
  goal: string;
  duration: number;
  focusRating: number;
  penalties: number;
  startTime?: number;
  endTime?: number;
}

const Home: NextPage = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [sessionStarted, setSessionStarted] = useState(false);
  const [sessionHistory, setSessionHistory] = useState<Session[]>([]);
  const [inBreak, setInBreak] = useState(false);

  // Load session history from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('sessionHistory');
    if (saved) {
      setSessionHistory(JSON.parse(saved));
    }
  }, []);

  // Save session history to localStorage
  useEffect(() => {
    localStorage.setItem('sessionHistory', JSON.stringify(sessionHistory));
  }, [sessionHistory]);

  const handleSessionSetup = (goal: string, duration: number) => {
    setSession({
      goal,
      duration,
      focusRating: 5,
      penalties: 0,
    });
  };

  const handleSessionStart = () => {
    if (session) {
      setSession({
        ...session,
        startTime: Date.now(),
      });
      setSessionStarted(true);
    }
  };

  const handleSessionEnd = (focusRating: number, penalties: number) => {
    if (session) {
      const completedSession: Session = {
        ...session,
        focusRating,
        penalties,
        endTime: Date.now(),
      };
      setSessionHistory([...sessionHistory, completedSession]);
      setSession(null);
      setSessionStarted(false);
      setInBreak(false);
    }
  };

  const handleToggleBreak = () => {
    setInBreak(!inBreak);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Lock-In Accountability App</title>
        <meta name="description" content="Stay focused with AI-powered accountability" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Lock-In Accountability</h1>
        
        {!sessionStarted ? (
          <SessionSetup onSessionSetup={handleSessionSetup} onStart={handleSessionStart} session={session} />
        ) : (
          <SessionTimer
            session={session!}
            onSessionEnd={handleSessionEnd}
            onToggleBreak={handleToggleBreak}
            inBreak={inBreak}
          />
        )}

        <div className={styles.history}>
          <h2>Session History ({sessionHistory.length})</h2>
          {sessionHistory.length === 0 ? (
            <p>No sessions yet. Start your first focus session!</p>
          ) : (
            <ul>
              {sessionHistory.map((s, i) => (
                <li key={i}>
                  <strong>{s.goal}</strong> - {s.duration}min - Focus: {s.focusRating}/10 - Penalties: {s.penalties}
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;
