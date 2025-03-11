import express, { type Application } from "express";
const app: Application = express();
import cors from "cors";
import router from "./app/routes";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";

//  parser
app.use(cors());
app.use(express.json());

/* Module routes */
app.use("/api/v1", router);

app.get("/", (req, res) => {
  res.send({ message: "Hello from instaSnap" });
});
app.use(globalErrorHandler);
app.use(notFound);

export default app;
