import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

export default function InfluencerEarningChart() {
  return (
    <LineChart
      xAxis={[{ data: [1, 2, 3, 5, 8, 10, 11, 12], colorMap: {
        type: 'piecewise',
        thresholds: [0, 12],
        colors: ["", 'white'],
      } }]}
      series={[
        {
          data: [2, 5.5, 2, 0.5, 1.5, 5, 4, 6],
          color:"red"
        },
      ]}
      width={500}
      
        grid={{ vertical: true, horizontal: true }}
      height={250}
    />
  );
}