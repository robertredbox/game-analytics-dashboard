import axios from 'axios';

const BASE_URL = 'https://quickdev2.super.one';
const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTc0Mjk3MjIxNiwiZXhwIjoxNzQ1NTY0MjE2fQ.D3orl0XMsf9gBNvmu5Dg5_oCA5U_PajYco4IcKDQq7U';

const headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Accept-Version': 'V1',
  'device-type': 'WEB',
  'token': TOKEN
};

// 1. All players data
export const getAllPlayersData = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/gamereaderapi/api/getAllPlayersData?startDate=1740045840574`,
      { headers }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching all players data:', error);
    return null;
  }
};

// 2. Game activities
export const getActivityStats = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/gamereaderapi/api/getActivityStats`,
      { headers }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching activity stats:', error);
    return null;
  }
};

// 3. Player game pass stats
export const getPlayerGamePassStats = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/gamereaderapi/api/getPlayerGamePassStats`,
      { headers }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching player game pass stats:', error);
    return null;
  }
};

// 4. Player sign up method
export const getSignupSourceCount = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/reader/user/signup-source-count`,
      { headers }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching signup source count:', error);
    return null;
  }
};
