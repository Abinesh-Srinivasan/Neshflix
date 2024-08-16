import express from "express";
import movieAndTvController from "../controllers/movieAndTv.controller.js";

const router = express.Router();
const { getTrending, getTrailers, getDetails, getSimilar, getByCategory } =
  movieAndTvController;
const type = "tv";

router.get("/trending", getTrending(type));
router.get("/:id/trailers", getTrailers(type));
router.get("/:id/details", getDetails(type));
router.get("/:id/similar", getSimilar(type));
router.get("/:category", getByCategory(type));

export default router;
