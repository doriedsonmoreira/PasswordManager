import express, { Express, Request, Response } from "express";
import helmet from "helmet";
import dotenv from "dotenv";

dotenv.config();
const app: Express = express();
const port = process.env.PORT || 3000;

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("Password Manager Backend is running!");
});

app.get("/status", (req: Request, res: Response) => {
  res.send("status ok!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
