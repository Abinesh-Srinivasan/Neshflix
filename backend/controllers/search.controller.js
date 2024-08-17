import { User } from "../models/user.model.js";
import fetchDataFromTMDB from "../services/tmdb.service.js";

const searchPerson = async (req, res) => {
  const { query } = req.params;
  try {
    const response = await fetchDataFromTMDB(
      `https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`
    );
    if (response.results.length === 0) {
      return res.status(404).send(null);
    }
    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        searchHistory: {
          id: response.results[0].id,
          image: response.results[0].profile_path,
          title: response.results[0].name,
          searchType: "person",
          createdAt: new Date(),
        },
      },
    });
    res.status(200).json({ Success: true, Content: response.results });
  } catch (error) {
    console.log(`Error in searchPerson controller: ${error.message}`);
    res.status(500).json({ Success: false, Message: "Internal server error-" });
  }
};

const searchMovie = async (req, res) => {
  const { query } = req.params;
  try {
    const response = await fetchDataFromTMDB(
      `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`
    );
    if (response.results.length === 0) {
      return res.status(404).send(null);
    }
    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        searchHistory: {
          id: response.results[0].id,
          image: response.results[0].poster_path,
          title: response.results[0].name,
          searchType: "movie",
          createdAt: new Date(),
        },
      },
    });
    res.status(200).json({ Success: true, Content: response.results });
  } catch (error) {
    console.log(`Error in searchPerson controller: ${error.message}`);
    res.status(500).json({ Success: false, Message: "Internal server error-" });
  }
};

const searchTv = async (req, res) => {
  const { query } = req.params;
  try {
    const response = await fetchDataFromTMDB(
      `https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`
    );
    if (response.results.length === 0) {
      return res.status(404).send(null);
    }
    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        searchHistory: {
          id: response.results[0].id,
          image: response.results[0].profile_path,
          title: response.results[0].name,
          searchType: "tv",
          createdAt: new Date(),
        },
      },
    });
    res.status(200).json({ Success: true, Content: response.results });
  } catch (error) {
    console.log(`Error in searchPerson controller: ${error.message}`);
    res.status(500).json({ Success: false, Message: "Internal server error-" });
  }
};

const getSearchHistory = async (req, res) => {
  try {
    res.status(200).json({ Success: true, Content: req.user.searchHistory });
  } catch (error) {
    res.status(500).json({ Success: false, Message: "Internal server error" });
  }
};

const removeItemFromSearchHistory = async (req, res) => {
  let { id } = req.params;
  id = parseInt(id);
  try {
    await User.findByIdAndUpdate(req.user._id, {
      $pull: {
        searchHistory: { id: id },
      },
    });
    res
      .status(200)
      .json({ Success: true, Message: "Item removed from the search history" });
  } catch (error) {
    console.log(
      `Error in removeFromSearchHistory controller: ${error.message}`
    );
    res.status(500).json({ Success: false, Message: "Internal server error" });
  }
};

export default {
  searchMovie,
  searchPerson,
  searchTv,
  getSearchHistory,
  removeItemFromSearchHistory,
};
