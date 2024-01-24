
const express = require('express');
const { createCanvas } = require('canvas');
const Chart = require('chart.js');
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
  const chartData = req.body;

  // Create a canvas with a specified width and height
  const canvasWidth = 400;
  const canvasHeight = 400;
  const canvas = createCanvas(canvasWidth, canvasHeight);
  const ctx = canvas.getContext('2d');

  // Create a Chart.js chart
  const myChart = new Chart(ctx, {
    type: 'doughnut',
    data: chartData,
  });

  // Generate a data URL for the chart as an image
  const chartImage = canvas.toDataURL('image/png');

  // Send the image data as a response
  res.send(`<img src="${chartImage}" alt="Chart">`);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

























// const express = require('express');
// const { createCanvas, loadImage } = require('canvas');
// const Chart = require('chart.js');
// const fs = require('fs');

// const app = express();
// const port = 3000;

// app.get('/generate_chart', (req, res) => {
//   // Create a canvas with a specified width and height
//   const canvasWidth = 400;
//   const canvasHeight = 400;
//   const canvas = createCanvas(canvasWidth, canvasHeight);
//   const ctx = canvas.getContext('2d');

//   // Define your chart data
//   const chartData = {
//     labels: ['#1', '#2-5', '#5-10', '#11-20', '#21-100', '#101+'],
//     datasets: [
//       {
//         data: [0, 8, 5, 0, 1, 2],
//         backgroundColor: ['green', 'blue', 'purple', 'orange', 'red', 'gray'],
//       },
//     ],
//   };

//   // Create a Chart.js chart
//   const myChart = new Chart(ctx, {
//     type: 'doughnut',
//     data: chartData,
//   });

//   // Generate a data URL for the chart as an image
//   const chartImage = canvas.toDataURL('image/png');

//   // Send the image data as a response
//   res.send(`<img src="${chartImage}" alt="Chart">`);
// });

// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });
