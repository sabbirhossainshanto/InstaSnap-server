import express, { type Application } from "express";
const app: Application = express();
import cors from "cors";
import router from "./app/routes";

//  parser
app.use(cors());
app.use(express.json());

/* Module routes */
app.use("/api/v1", router);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

export default app;
