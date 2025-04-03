import React, { useState, useEffect } from 'react';
import { getSignupSourceCount } from '../services/api';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const SignupSourceSection = ({ refreshInterval = 60000 }) => {
  const [signupSources, setSignupSources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await getSignupSourceCount();
      if (data && data.data) {
        setSignupSources(data.data);
        setLastUpdated(new Date());
      }
    } catch (err) {
      setError('Failed to fetch signup source data');
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

  // Format data for pie chart
  const getPieChartData = () => {
    if (!signupSources || !Array.isArray(signupSources)) return [];
    
    return signupSources.map(source => ({
      name: source.source || 'Unknown',
      value: source.count || 0
    }));
  };

  // Calculate total signups
  const getTotalSignups = () => {
    if (!signupSources || !Array.isArray(signupSources)) return 0;
    
    return signupSources.reduce((total, source) => total + (source.count || 0), 0);
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

  if (loading && !signupSources.length) {
    return <div className="p-4 bg-white rounded-lg shadow-md">Loading signup source data...</div>;
  }

  if (error) {
    return <div className="p-4 bg-white rounded-lg shadow-md text-red-500">{error}</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-medium" style={{ fontFamily: '"Roboto Slab", serif', fontWeight: 500 }}>Signup Sources</h2>
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
            <h3 className="text-lg mb-4" style={{ fontFamily: '"Roboto Slab", serif', fontWeight: 500 }}>Signup Summary</h3>
            <ul className="space-y-2" style={{ fontFamily: '"Roboto", sans-serif', fontWeight: 400 }}>
              <li className="flex justify-between font-bold">
                <span>Total Signups:</span>
                <span>{getTotalSignups()}</span>
              </li>
              {getPieChartData().map((source, index) => (
                <li key={index} className="flex justify-between">
                  <span>{source.name}:</span>
                  <span>{source.value} ({((source.value / getTotalSignups()) * 100).toFixed(1)}%)</span>
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Count</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Percentage</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200" style={{ fontFamily: '"Roboto", sans-serif', fontWeight: 400 }}>
            {getPieChartData().map((source, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">{source.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{source.value}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {((source.value / getTotalSignups()) * 100).toFixed(1)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SignupSourceSection;
