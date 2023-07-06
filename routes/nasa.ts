import { Router } from "express";

const router: Router = Router();

// Route to fetch data from NASA API
router.get("/nasaImageOfTheDay", async (req, res) => {
  try {
    // Retrieve the NASA API key
    const apiKey = process.env.NASA_API_KEY;

    // Make the API request to NASA
    const response = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`
    );

    // Extract the data from the response
    const data = response.json();

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data from NASA API" });
  }
});

export default router;
