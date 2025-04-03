import React, { useState, useEffect } from 'react';
import { getAllPlayersData } from '../services/api';

const PlayersDataSection = ({ refreshInterval = 60000 }) => {
  const [playersData, setPlayersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await getAllPlayersData();
      if (data && data.data) {
        setPlayersData(data.data);
        setLastUpdated(new Date());
      }
    } catch (err) {
      setError('Failed to fetch players data');
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

  if (loading && !playersData.length) {
    return <div className="p-4 bg-white rounded-lg shadow-md">Loading players data...</div>;
  }

  if (error) {
    return <div className="p-4 bg-white rounded-lg shadow-md text-red-500">{error}</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-medium" style={{ fontFamily: '"Roboto Slab", serif', fontWeight: 500 }}>All Players Data</h2>
        {lastUpdated && (
          <span className="text-sm text-gray-500" style={{ fontFamily: '"Roboto", sans-serif', fontWeight: 400 }}>
            Last updated: {lastUpdated.toLocaleTimeString()}
          </span>
        )}
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Player ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Parent</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Device</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Signup On</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Games Played</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Games Won</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Questions Played</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Prize Won</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200" style={{ fontFamily: '"Roboto", sans-serif', fontWeight: 400 }}>
            {playersData.map((player, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">{player.playerId}</td>
                <td className="px-6 py-4 whitespace-nowrap">{player.parent || 'N/A'}</td>
                <td className="px-6 py-4 whitespace-nowrap">{player.device || 'N/A'}</td>
                <td className="px-6 py-4 whitespace-nowrap">{new Date(player.signupOn).toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap">{player.gamePlayedCount || 0}</td>
                <td className="px-6 py-4 whitespace-nowrap">{player.wonGameCount || 0}</td>
                <td className="px-6 py-4 whitespace-nowrap">{player.questionPlayedCount || 0}</td>
                <td className="px-6 py-4 whitespace-nowrap">{player.totalPrizeWon || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PlayersDataSection;
