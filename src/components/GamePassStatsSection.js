import React, { useState, useEffect } from 'react';
import { getPlayerGamePassStats } from '../services/api';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const GamePassStatsSection = ({ refreshInterval = 60000 }) => {
  const [gamePassStats, setGamePassStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await getPlayerGamePassStats();
      if (data && data.data) {
        setGamePassStats(data.data);
        setLastUpdated(new Date());
      }
    } catch (err) {
      setError('Failed to fetch game pass stats');
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

  // Calculate totals for pie chart
  const getPieChartData = () => {
    let totalPurchased = 0;
    let totalFromReferral = 0;
    let totalUsed = 0;

    gamePassStats.forEach(stat => {
      totalPurchased += stat.gamePassPurchased || 0;
      totalFromReferral += stat.gamePassFromReferral || 0;
      totalUsed += stat.gamePassUsed || 0;
    });

    return [
      { name: 'Purchased', value: totalPurchased },
      { name: 'From Referral', value: totalFromReferral },
      { name: 'Used', value: totalUsed }
    ];
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  if (loading && !gamePassStats.length) {
    return <div className="p-4 bg-white rounded-lg shadow-md">Loading game pass stats...</div>;
  }

  if (error) {
    return <div className="p-4 bg-white rounded-lg shadow-md text-red-500">{error}</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-medium" style={{ fontFamily: '"Roboto Slab", serif', fontWeight: 500 }}>Game Pass Statistics</h2>
        {lastUpdated && (
          <span className="text-sm text-gray-500" style={{ fontFamily: '"Roboto", sans-serif', fontWeight: 400 }}>
            Last updated: {lastUpdated.toLocaleTimeString()}
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div style={{ height: '300px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={getPieChartData()}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {getPieChartData().map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value}`, 'Count']} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className="flex flex-col justify-center">
          <div className="stats-summary">
            <h3 className="text-lg mb-4" style={{ fontFamily: '"Roboto Slab", serif', fontWeight: 500 }}>Game Pass Summary</h3>
            <ul className="space-y-2" style={{ fontFamily: '"Roboto", sans-serif', fontWeight: 400 }}>
              {getPieChartData().map((item, index) => (
                <li key={index} className="flex justify-between">
                  <span className="font-medium">{item.name}:</span>
                  <span>{item.value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Player ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Game Pass Purchased</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Game Pass From Referral</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Game Pass Used</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200" style={{ fontFamily: '"Roboto", sans-serif', fontWeight: 400 }}>
            {gamePassStats.map((stat, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">{stat.playerId}</td>
                <td className="px-6 py-4 whitespace-nowrap">{stat.gamePassPurchased || 0}</td>
                <td className="px-6 py-4 whitespace-nowrap">{stat.gamePassFromReferral || 0}</td>
                <td className="px-6 py-4 whitespace-nowrap">{stat.gamePassUsed || 0}</td>
                <td className="px-6 py-4 whitespace-nowrap">{new Date(stat.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GamePassStatsSection;
