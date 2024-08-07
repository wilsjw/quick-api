import express, { json, urlencoded } from "express";
import cors from "cors";
import apiRoutes from "./routes/api.js";

const app = express();

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api", apiRoutes);

app.listen(3000, () => {
  console.log("Server is listening on port 3000.");
});

export default app;
