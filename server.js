const express = require("express");
const client = require("prom-client");
const app = express();

// Create a Registry which registers the metrics
const register = new client.Registry();

// Add a default label which is added to all metrics
register.setDefaultLabels({
  app: "example-nodejs-app",
});

// Enable the collection of default metrics
client.collectDefaultMetrics({ register });

app.get("/metrics", (req, res) => {
  res.setHeader("Content-Type", register.contentType);
  res.send(register.metrics());
});

// Start the HTTP server which exposes the metrics on http://localhost:8080/metrics
app.listen(8080, () => console.log("server has been started"));
