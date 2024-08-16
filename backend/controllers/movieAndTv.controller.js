import fetchDataFromTMDB from "../services/tmdb.service.js";

const getTrending = (type) => async (req, res) => {
  try {
    const data = await fetchDataFromTMDB(
      `https://api.themoviedb.org/3/trending/${type}/day?language=en-US`
    );
    const randomMovie =
      data.results[Math.floor(Math.random() * data.results?.length)];
    res.status(200).json({ Success: true, Content: randomMovie });
  } catch (error) {
    res.status(500).json({ Success: false, Message: "Internal server error" });
  }
};

const getTrailers = (type) => async (req, res) => {
  const { id } = req.params;
  try {
    const data = await fetchDataFromTMDB(
      `https://api.themoviedb.org/3/${type}/${id}/videos?language=en-US`
    );
    res.status(200).json({ Success: true, Trailers: data.results });
  } catch (error) {
    if (error.message.includes("404")) {
      return res.status(404).send(null);
    }
    res.status(500).json({ Success: false, Message: "Internal server error" });
  }
};

const getDetails = (type) => async (req, res) => {
  const { id } = req.params;
  try {
    const data = await fetchDataFromTMDB(
      `https://api.themoviedb.org/3/${type}/${id}?language=en-US`
    );
    res.status(200).json({ Success: true, Content: data });
  } catch (error) {
    if (error.message.includes("404")) {
      return res.status(404).send(null);
    }
    res.status(500).json({ Success: false, Message: "Internal server error" });
  }
};

const getSimilar = (type) => async (req, res) => {
  const { id } = req.params;
  try {
    const data = await fetchDataFromTMDB(
      `https://api.themoviedb.org/3/${type}/${id}/similar?language=en-US&page=1`
    );
    res.status(200).json({ Success: true, Similar: data.results });
  } catch (error) {
    res.status(500).json({ Success: false, Message: "Internal server error" });
  }
};

const getByCategory = (type) => async (req, res) => {
  const { category } = req.params;
  try {
    const data = await fetchDataFromTMDB(
      `https://api.themoviedb.org/3/${type}/${category}?language=en-US&page=1`
    );
    res.status(200).json({ Success: true, Content: data.results });
  } catch (error) {
    res.status(500).json({ Success: false, Message: "Internal server error" });
  }
};

export default {
  getTrending,
  getTrailers,
  getDetails,
  getSimilar,
  getByCategory,
};
