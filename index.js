const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  // route en GET dont le chemin est /
  res.json({ message: "Hi" }); // réponse du serveur : {message : "Hi"}
});

// API SportRadar

// EndPoint for Teams
app.get("/teams", async (req, res) => {
  try {
    const apiKey = process.env.SPORTRADAR_API_KEY;
    console.log("Using API Key:", apiKey); // Log the API key

    const response = await axios.get(
      "https://api.sportradar.com/wnba/trial/v8/en/league/teams.json",
      {
        headers: {
          Accept: "application/json",
          api_key: apiKey, // Correct the API key header format
        },
      }
    );
    console.log("API response:", response.data); // Log the response
    res.json(response.data);
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des équipes WNBA depuis Sportradar:",
      error.response ? error.response.data : error.message
    );
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des équipes" });
  }
});

// Endpoint for Seasons
app.get("/seasons", async (req, res) => {
  try {
    const apiKey = process.env.SPORTRADAR_API_KEY;
    console.log("Using API Key:", apiKey); // Log the API key

    const response = await axios.get(
      "https://api.sportradar.com/wnba/trial/v8/en/league/seasons.json",
      {
        headers: {
          Accept: "application/json",
          api_key: apiKey, // Correct the API key header format
        },
      }
    );
    console.log("API response:", response.data); // Log the response
    res.json(response.data);
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des saisons WNBA depuis Sportradar:",
      error.response ? error.response.data : error.message
    );
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des saisons" });
  }
});

// Endpoint for Schedule
app.get("/schedule", async (req, res) => {
  try {
    const apiKey = process.env.SPORTRADAR_API_KEY;
    console.log("Using API Key:", apiKey); // Log the API key

    const response = await axios.get(
      "https://api.sportradar.com/wnba/trial/v8/en/games/2024/REG/schedule.json",
      {
        headers: {
          Accept: "application/json",
          api_key: apiKey, // Correct the API key header format
        },
      }
    );
    console.log("API response:", response.data); // Log the response
    res.json(response.data);
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des saisons WNBA depuis Sportradar:",
      error.response ? error.response.data : error.message
    );
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des saisons" });
  }
});

app.all("*", (req, res) => {
  res.status(404).json({ message: "Page not found" });
});

// Northflank va nous fournir une variable process.env.PORT
const PORT = process.env.PORT || 3200;
app.listen(PORT, () => {
  console.log(`Server started 🦊 on port: ${PORT}`);
});
