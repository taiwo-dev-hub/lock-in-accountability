import React, { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css';

interface Session {
  goal: string;
  duration: number;
  focusRating?: number;
  penalties?: number;
  startTime?: number;
}

interface SessionTimerProps {
  session: Session;
  onSessionEnd: (focusRating: number, penalties: number) => void;
  onToggleBreak: () => void;
  inBreak: boolean;
}

const SessionTimer: React.FC<SessionTimerProps> = ({
  session,
  onSessionEnd,
  onToggleBreak,
  inBreak,
}) => {
  const [timeLeft, setTimeLeft] = useState(session.duration * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [focusRating, setFocusRating] = useState(5);

  const totalTime = session.duration * 60;
  const progress = ((totalTime - timeLeft) / totalTime) * 100;
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      handleSessionEnd();
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const handleSessionEnd = () => {
    setIsRunning(false);
    onSessionEnd(focusRating, 0);
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.code === 'Space') {
      e.preventDefault();
      setIsRunning(!isRunning);
    }
    if (e.key === 'b' || e.key === 'B') {
      onToggleBreak();
    }
    if (e.key === 'f' || e.key === 'F') {
      handleSessionEnd();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isRunning]);

  return (
    <div className={styles.timerContainer}>
      <div className={styles.timerCard}>
        <h2>{inBreak ? '☕ Break Time' : '⏱️ Focus Time'}</h2>
        <p className={styles.goal}>{session.goal}</p>

        <div className={styles.progressBar}>
          <div className={styles.progress} style={{ width: `${progress}%` }}></div>
        </div>

        <div className={styles.timerDisplay}>
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </div>

        <div className={styles.controls}>
          <button
            onClick={() => setIsRunning(!isRunning)}
            className={styles.buttonPrimary}
          >
            {isRunning ? 'PAUSE' : 'START'} (Press SPACE)
          </button>
          <button
            onClick={onToggleBreak}
            className={styles.buttonSecondary}
          >
            BREAK (Press B)
          </button>
          <button
            onClick={handleSessionEnd}
            className={styles.buttonDanger}
          >
            FORFEIT (Press F)
          </button>
        </div>

        <div className={styles.focusRating}>
          <label>Focus Rating: {focusRating}/10</label>
          <input
            type="range"
            min="1"
            max="10"
            value={focusRating}
            onChange={(e) => setFocusRating(parseInt(e.target.value))}
            className={styles.slider}
          />
        </div>
      </div>
    </div>
  );
};

export default SessionTimer;
