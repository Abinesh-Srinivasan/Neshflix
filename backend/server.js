import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

import authRoutes from "./routes/auth.route.js";
import movieRoutes from "./routes/movie.route.js";
import tvRoutes from "./routes/tv.route.js";
import searchRoutes from "./routes/search.route.js";
import protectRoute from "./middleware/protectRoute.js";
import { ENV_VARS } from "./config/envVars.js";
import connectDb from "./config/dataBase.js";

const app = express();
const { PORT } = ENV_VARS;
const __dirname = path.resolve();

app.use(express.json()); // to parse req.body
app.use(cookieParser());
app.use(cors());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/movie", protectRoute, movieRoutes);
app.use("/api/v1/tv", protectRoute, tvRoutes);
app.use("/api/v1/search", protectRoute, searchRoutes);

if (ENV_VARS.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")))
  
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname,"frontend","dist","index.html"))
  })
}

app.listen(PORT, () => {
  console.log(`Server listening to the port ${PORT}...`);
  connectDb();
});
