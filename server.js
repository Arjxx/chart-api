const express = require('express');
const { createCanvas } = require('canvas');
const Chart = require('chart.js/auto'); // Updated to include the 'auto' import
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Use bodyParser middleware to parse JSON data
app.use(bodyParser.json());

// Enable CORS for all routes
app.use(cors());

app.post('/generate_chart', (req, res) => {
  // Get chart data from the request
  const { chartData, chartType } = req.body;

  // Create a canvas with a specified width and height
  const canvasWidth = 400;
  const canvasHeight = 400;
  const canvas = createCanvas(canvasWidth, canvasHeight);
  const ctx = canvas.getContext('2d');

  // Register the canvas as a Chart.js chart rendering backend
  Chart.defaults.platform = {
    acquireContext: () => ctx
  };

  // Create a Chart.js chart
  new Chart(ctx, {
    type: chartType,
    data: chartData,
    options: {
      animation: false // Disable animation to render the chart immediately
    }
  });

  // Generate a data URL for the chart as an image
  const chartImage = canvas.toDataURL('image/png');

  // Send the image data as a response
  res.send(`<img src="${chartImage}" alt="Chart">`);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
