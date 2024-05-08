import express from "express";

const app = express();
const port = 3000;

// 1. **Basic GET Route**
app.get("/", (req, res) => {
  res.send("Welcome to the Advanced Express.js App");
});

// 2. **GET with Query Parameters**
// Example: http://localhost:3000/search?term=express
app.get("/search", (req, res) => {
  const { term } = req.query;
  res.send(`You searched for: ${term}`);
});

// 3. **GET with Route Parameters**
// Example: http://localhost:3000/users/123
app.get("/users/:userId", (req, res) => {
  const { userId } = req.params;
  res.send(`User ID: ${userId}`);
});

// 4. **GET with Middleware**
const logger = (req, res, next) => {
  console.log(`${req.method} request for ${req.url}`);
  next(); // Proceed to the next middleware or route handler
};

// Applying middleware to a specific route
app.get("/middleware", logger, (req, res) => {
  res.send("This route has middleware logging.");
});

// 5. **GET with Conditional Response**
app.get("/status", (req, res) => {
  const { state } = req.query;
  if (state === "good") {
    res.status(200).send("All systems are operational.");
  } else {
    res.status(503).send("Service unavailable. Please try again later.");
  }
});

// Middleware to handle 404 - Not Found
app.use((req, res, next) => {
  res.status(404).send("Sorry, we couldn't find what you're looking for.");
  next();
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

// Test the Advanced Routes
// Open a browser or a tool like Postman to test the following routes:
// http://localhost:3000/: A basic GET route.
// http://localhost:3000/search?term=express: GET with a query parameter.
// http://localhost:3000/users/123: GET with a route parameter.
// http://localhost:3000/middleware: GET with custom middleware logging.
// http://localhost:3000/status?state=good: GET with a conditional response.
// http://localhost:3000/status?state=bad: GET with another conditional response.
