const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// User information (hardcoded for this example)
const userId = "john_doe_17091999";
const email = "john@xyz.com";
const rollNumber = "ABCD123";

// POST method endpoint
app.post("/bfhl", (req, res) => {
  const inputData = req.body.data;

  if (!Array.isArray(inputData)) {
    return res
      .status(400)
      .json({ is_success: false, message: "Invalid input" });
  }

  const numbers = inputData.filter((item) => !isNaN(item));
  const alphabets = inputData.filter((item) => /^[a-zA-Z]$/.test(item));

  const lowestLowercase = alphabets.filter(
    (char) => char === char.toLowerCase()
  );
  const highestLowercase =
    lowestLowercase.length > 0
      ? [lowestLowercase.reduce((a, b) => (a > b ? a : b))]
      : [];

  const response = {
    is_success: true,
    user_id: userId,
    email: email,
    roll_number: rollNumber,
    numbers: numbers,
    alphabets: alphabets,
    highest_lowercase_alphabet: highestLowercase,
  };

  res.json(response);
});

// GET method endpoint
app.get("/bfhl", (req, res) => {
  res.status(200).json({ operation_code: 1 });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
