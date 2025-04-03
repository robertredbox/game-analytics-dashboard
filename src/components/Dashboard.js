import React, { useState } from 'react';
import PlayersDataSection from './PlayersDataSection';
import ActivityStatsSection from './ActivityStatsSection';
import GamePassStatsSection from './GamePassStatsSection';
import SignupSourceSection from './SignupSourceSection';

const Dashboard = () => {
  const [refreshInterval, setRefreshInterval] = useState(60000); // 60 seconds default

  const handleRefreshIntervalChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setRefreshInterval(value);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&family=Roboto+Slab:wght@500&display=swap" rel="stylesheet" />
      
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900" style={{ fontFamily: '"Roboto Slab", serif', fontWeight: 500 }}>
            Game Analytics Dashboard
          </h1>
          
          <div className="flex items-center space-x-4">
            <span className="text-gray-600" style={{ fontFamily: '"Roboto", sans-serif', fontWeight: 400 }}>
              Refresh Interval:
            </span>
            <select 
              className="bg-white border border-gray-300 rounded-md p-2"
              value={refreshInterval}
              onChange={handleRefreshIntervalChange}
              style={{ fontFamily: '"Roboto", sans-serif', fontWeight: 400 }}
            >
              <option value={30000}>30 seconds</option>
              <option value={60000}>1 minute</option>
              <option value={300000}>5 minutes</option>
            </select>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 space-y-6">
        <PlayersDataSection refreshInterval={refreshInterval} />
        <ActivityStatsSection refreshInterval={refreshInterval} />
        <GamePassStatsSection refreshInterval={refreshInterval} />
        <SignupSourceSection refreshInterval={refreshInterval} />
      </main>
      
      <footer className="bg-white shadow-md mt-8">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 text-center text-gray-500" style={{ fontFamily: '"Roboto", sans-serif', fontWeight: 400 }}>
          <p>Game Analytics Dashboard © {new Date().getFullYear()} - Data refreshes every {refreshInterval / 1000} seconds</p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
