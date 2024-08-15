import express from "express"
import movieController from "../controllers/movie.controller.js";

const router = express.Router();
const { getTrendingMovie, getMovieTrailers,getMovieDetails,getSimilarMovies,getMoviesByCategory } = movieController;

router.get("/trending", getTrendingMovie);
router.get("/:id/trailers", getMovieTrailers);
router.get("/:id/details", getMovieDetails);
router.get("/:id/similar", getSimilarMovies);
router.get("/:category", getMoviesByCategory);

export default router;