import express from "express";
import searchController from "../controllers/search.controller.js";

const router = express.Router();
const {
  searchMovie,
  searchPerson,
  searchTv,
  getSearchHistory,
  removeItemFromSearchHistory,
} = searchController;

router.get("/person/:query", searchPerson);
router.get("/movie/:query", searchMovie);
router.get("/tv/:query", searchTv);
router.get("/history", getSearchHistory);
router.get("/history/:id", removeItemFromSearchHistory);

export default router;
