const express = require("express");
const app = express();
const path = require("path");
const jobsRouter = require("./routes/jobs");
const PORT = 3000;

// Middleware
app.use(express.json());

// Routes
app.use("/api/jobs", jobsRouter);

// global error handling

app.use((err, req, res, next) => {
  const defaultErr = {
    log: "Express error handler caught unknown middleware error",
    status: 500,
    message: { err: "An error occurred" },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is listening on port http://localhost:${PORT}`);
});

module.exports = app;
