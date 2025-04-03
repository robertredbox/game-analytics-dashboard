import React, { useState, useEffect } from 'react';
import { getActivityStats } from '../services/api';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ActivityStatsSection = ({ refreshInterval = 60000 }) => {
  const [activityStats, setActivityStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await getActivityStats();
      if (data && data.data) {
        setActivityStats(data.data);
        setLastUpdated(new Date());
      }
    } catch (err) {
      setError('Failed to fetch activity stats');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    
    // Set up interval for refreshing data
    const intervalId = setInterval(fetchData, refreshInterval);
    
    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, [refreshInterval]);

  // Convert data for chart visualization
  const getChartData = () => {
    return activityStats.slice(0, 10).map(stat => ({
      playerId: stat.playerId,
      gamesPlayed: stat.gamePlayedCount || 0,
      questionsPlayed: stat.questionPlayedCount || 0,
      skippedCount: stat.skippedCount || 0,
      prizeWon: stat.prizeWon || 0
    }));
  };

  if (loading && !activityStats.length) {
    return <div className="p-4 bg-white rounded-lg shadow-md">Loading activity stats...</div>;
  }

  if (error) {
    return <div className="p-4 bg-white rounded-lg shadow-md text-red-500">{error}</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-medium" style={{ fontFamily: '"Roboto Slab", serif', fontWeight: 500 }}>Game Activity Stats</h2>
        {lastUpdated && (
          <span className="text-sm text-gray-500" style={{ fontFamily: '"Roboto", sans-serif', fontWeight: 400 }}>
            Last updated: {lastUpdated.toLocaleTimeString()}
          </span>
        )}
      </div>
      
      <div className="mb-6" style={{ height: '300px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={getChartData()}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="playerId" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="gamesPlayed" name="Games Played" fill="#8884d8" />
            <Bar dataKey="questionsPlayed" name="Questions Played" fill="#82ca9d" />
            <Bar dataKey="skippedCount" name="Skipped" fill="#ffc658" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Player ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Games Played</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Questions Played</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Skipped Count</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Response Time (ms)</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Playtime</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prize Won</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200" style={{ fontFamily: '"Roboto", sans-serif', fontWeight: 400 }}>
            {activityStats.map((activity, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">{activity.playerId}</td>
                <td className="px-6 py-4 whitespace-nowrap">{activity.gamePlayedCount || 0}</td>
                <td className="px-6 py-4 whitespace-nowrap">{activity.questionPlayedCount || 0}</td>
                <td className="px-6 py-4 whitespace-nowrap">{activity.skippedCount || 0}</td>
                <td className="px-6 py-4 whitespace-nowrap">{activity.totalResponseTime || 0}ms</td>
                <td className="px-6 py-4 whitespace-nowrap">{activity.totalPlaytime || 0}s</td>
                <td className="px-6 py-4 whitespace-nowrap">{activity.prizeWon || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ActivityStatsSection;
