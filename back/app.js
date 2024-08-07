import express, { json, urlencoded } from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: false }));

app.get((req, res) => {
    res.send("Hello World!");
});

app.listen(3000, () => {
    console.log("Server is listening on port 3000.");
});

export default app;