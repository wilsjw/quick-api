import express, { json, urlencoded } from "express";
import cors from "cors";
import apiRoutes from "./routes/api.js";
import userRoutes from "./routes/user.js"
import authMiddleware from "./middleware/authRoute.js";
import authRoutes from "./routes/auth.js";

const app = express();

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/auth", authRoutes);
app.use("/api/users", authMiddleware, userRoutes);

app.listen(3000, () => {
  console.log("Server is listening on port 3000.");
});

export default app;
