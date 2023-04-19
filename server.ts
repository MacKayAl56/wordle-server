import express, { Application, Request, Response } from "express";
import fs from "fs";
import path from "path";
import cors from "cors";

const app: Application = express();
const PORT = process.env.PORT ?? 8000;

// Configure CORS options
const corsOptions = {
    origin: "*", 
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    optionsSuccessStatus: 200,
    credentials: true,
  };

// Enable CORS for all routes using the configured options
app.use(cors(corsOptions));

let wordList: Array<string> = [];
const wordsFilePath = path.join(__dirname, "./wordles.txt");

fs.readFile(wordsFilePath, "utf-8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  wordList = data.split("\n");
});

// Define GET endpoint(s)
app.get("/", (req: Request, res: Response) => {
  const randomIndex = Math.floor(Math.random() * wordList.length);
  const randomWord = wordList[randomIndex];
  const secretWord = { secret: randomWord };
  res.json(secretWord);
});

app.listen(PORT, () => {
  console.log(`Server is listening to port ${PORT}`);
});
