import React, { useState } from 'react';
import styles from '../styles/Home.module.css';

interface SessionSetupProps {
  onSessionSetup: (goal: string, duration: number) => void;
  onStart: () => void;
  session: { goal: string; duration: number } | null;
}

const SessionSetup: React.FC<SessionSetupProps> = ({ onSessionSetup, onStart, session }) => {
  const [goal, setGoal] = useState('');
  const [duration, setDuration] = useState(25);

  const handleSetup = () => {
    if (goal.trim()) {
      onSessionSetup(goal, duration);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && goal.trim()) {
      handleSetup();
    }
  };

  return (
    <div className={styles.setupContainer}>
      <div className={styles.setupCard}>
        <h2>Set Your Focus Goal</h2>
        
        <div className={styles.inputGroup}>
          <label htmlFor="goal">What will you focus on?</label>
          <input
            id="goal"
            type="text"
            placeholder="e.g., Complete project report..."
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            onKeyPress={handleKeyPress}
            className={styles.input}
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="duration">Session Duration (minutes)</label>
          <input
            id="duration"
            type="number"
            min="1"
            max="180"
            value={duration}
            onChange={(e) => setDuration(Math.max(1, parseInt(e.target.value) || 1))}
            className={styles.input}
          />
        </div>

        {session ? (
          <div className={styles.sessionPreview}>
            <p><strong>Goal:</strong> {session.goal}</p>
            <p><strong>Duration:</strong> {session.duration} minutes</p>
            <button onClick={onStart} className={styles.buttonPrimary}>
              START (Press B to confirm)
            </button>
          </div>
        ) : (
          <button onClick={handleSetup} className={styles.buttonPrimary} disabled={!goal.trim()}>
            BIND Commitment (Press B)
          </button>
        )}
      </div>
    </div>
  );
};

export default SessionSetup;
