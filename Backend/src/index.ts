import express, { Express, Request, Response } from "express";
import helmet from "helmet";
import dotenv from "dotenv";

dotenv.config();

import { errorMiddleware } from "./middlewares/error";
import router from "./routes/routes";

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);
app.use(errorMiddleware);

app.get("/", (req: Request, res: Response) => {
  res.send("Password Manager Backend is running!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
