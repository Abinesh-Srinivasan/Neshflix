import express from "express";
import authRoutes from "./routes/auth.route.js";
import movieRoutes from "./routes/movie.route.js";
import tvRoutes from "./routes/tv.route.js";
import { ENV_VARS } from "./config/envVars.js";
import connectDb from "./config/dataBase.js";

const app = express();
const { PORT } = ENV_VARS;

app.use(express.json()); // to parse req.body
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/movie", movieRoutes);
app.use("/api/v1/tv", tvRoutes);

app.listen(PORT, () => {
  console.log(`Server listening to the port ${PORT}...`);
  connectDb();
});
