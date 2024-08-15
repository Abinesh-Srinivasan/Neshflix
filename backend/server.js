import express from "express";
import authRoutes from "./routes/auth.route.js";
import { ENV_VARS } from "./config/envVars.js";
import connectDb from "./config/dataBase.js";

const app = express();
const { PORT } = ENV_VARS;

app.use(express.json()) // to parse req.body
app.use("/api/v1/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server listening to the port ${PORT}...`);
  connectDb();
});
