import React, { useState, useEffect } from 'react';
import './StatsCard.css';

const StatsCard = ({ tasks }) => {
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    inProgress: 0,
    pending: 0,
  });

  useEffect(() => {
    setStats({
      total: tasks.length,
      completed: tasks.filter(t => t.completed || t.status === 'Completed').length,
      inProgress: tasks.filter(t => t.status === 'In Progress').length,
      pending: tasks.filter(t => t.status === 'Pending').length,
    });
  }, [tasks]);

  return (
    <div className="stats-container">
      <div className="stat-card stat-blue">
        <div className="stat-icon">📋</div>
        <div className="stat-content">
          <h3>{stats.total}</h3>
          <p>Total Tasks</p>
          <span>All tasks</span>
        </div>
      </div>

      <div className="stat-card stat-green">
        <div className="stat-icon">✅</div>
        <div className="stat-content">
          <h3>{stats.completed}</h3>
          <p>Completed</p>
          <span>This month</span>
        </div>
      </div>

      <div className="stat-card stat-orange">
        <div className="stat-icon">⏱️</div>
        <div className="stat-content">
          <h3>{stats.inProgress}</h3>
          <p>In Progress</p>
          <span>Keep it up!</span>
        </div>
      </div>

      <div className="stat-card stat-red">
        <div className="stat-icon">🚩</div>
        <div className="stat-content">
          <h3>{stats.pending}</h3>
          <p>Pending</p>
          <span>Don't stop now</span>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;