import fetchDataFromTMDB from "../services/tmdb.service.js";

const getTrendingMovie = async (req, res) => {
  try {
    const data = await fetchDataFromTMDB(
      "https://api.themoviedb.org/3/trending/movie/day?language=en-US"
    );
    const randomMovie =
      data.results[Math.floor(Math.random() * data.results?.length)];
    res.status(200).json({ Success: true, Content: randomMovie });
  } catch (error) {
    res.status(500).json({ Success: false, Message: "Internal server error" });
  }
};

const getMovieTrailers = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await fetchDataFromTMDB(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`
    );
    res.status(200).json({ Success: true, Trailers: data.results });
  } catch (error) {
    if (error.message.includes("404")) {
      return res.status(404).send(null);
    }
    res.status(500).json({ Success: false, Message: "Internal server error" });
  }
};

const getMovieDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await fetchDataFromTMDB(
      `https://api.themoviedb.org/3/movie/${id}?language=en-US`
    );
    res.status(200).json({ Success: true, Content: data });
  } catch (error) {
    if (error.message.includes("404")) {
      return res.status(404).send(null);
    }
    res.status(500).json({ Success: false, Message: "Internal server error" });
  }
}

const getSimilarMovies = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await fetchDataFromTMDB(
      `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`
    );
    res.status(200).json({ Success: true, Similar: data.results });
  } catch (error) {
    res.status(500).json({ Success: false, Message: "Internal server error" });
  }
}

const getMoviesByCategory = async (req, res) => {
  const { category } = req.params;
  try {
    const data = await fetchDataFromTMDB(
      `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`
    );
    res.status(200).json({ Success: true, Content: data.results });
  } catch (error) {
    res.status(500).json({ Success: false, Message: "Internal server error" });
  }
}

export default { getTrendingMovie, getMovieTrailers,getMovieDetails,getSimilarMovies,getMoviesByCategory };
