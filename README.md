# Game Analytics Dashboard

A real-time dashboard for game analytics data. This dashboard refreshes data from multiple API endpoints every 60 seconds to provide up-to-date analytics for game performance.

## Features

- **Real-time Data**: Refreshes automatically every 60 seconds (configurable)
- **Player Data Analytics**: Track player signups, game plays, prizes won, and more
- **Game Activity Statistics**: Monitor response times, playtime, and questions played
- **Game Pass Tracking**: Track purchased passes, referral passes, and usage
- **Signup Source Analysis**: See which platforms are driving user acquisition

## Data Sources

The dashboard connects to the following API endpoints:

1. **Players Data**: Comprehensive player statistics including signup info, game plays, and prizes won
2. **Game Activities**: Detailed stats on game engagement, response times, and playtime
3. **Game Pass Stats**: Tracking of game pass purchases, referrals, and usage
4. **Signup Sources**: Analysis of user acquisition channels

## Technology Stack

- React.js
- Tailwind CSS for styling
- Recharts for data visualization
- Axios for API requests

## Getting Started

1. Clone the repository
   ```
   git clone https://github.com/robertredbox/game-analytics-dashboard.git
   ```

2. Install dependencies
   ```
   cd game-analytics-dashboard
   npm install
   ```

3. Start the development server
   ```
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view the dashboard

## Customization

- **Refresh Interval**: Change the refresh interval via the dropdown in the header
- **Data Visualization**: Modify chart types in the component files
- **API Endpoints**: Update API URLs in the `src/services/api.js` file

## Production Deployment

To build the app for production:

```
npm run build
```

This creates an optimized production build in the `build` folder, ready for deployment.

## License

MIT
