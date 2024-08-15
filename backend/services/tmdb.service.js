import axios from "axios";
import { ENV_VARS } from "../config/envVars.js";

const { TMDB_API_KEY } = ENV_VARS;
const fetchDataFromTMDB = async (url) => {
  const options = {
    headers: {
      accept: "application/json",
      Authorization: "Bearer " + TMDB_API_KEY,
    },
  };
  const response = await axios.get(url, options);
  if (response.status !== 200) {
    throw new error("Failed to fetch data from TMDB " + response.statusText);
  }
  return response.data;
};

export default fetchDataFromTMDB;
