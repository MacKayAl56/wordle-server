//Define a GET endpoint to return a random word each time you issue an HTTP request to that endpoint.
//Keep an array of 5 - letter words in your server
//Return the HTTP response in a JSON format

import express, { Application, Request, Response } from "express";
import words from "./wordles.txt";

const app:Application = express();
const PORT = process.env.PORT ?? 8000; ''

let wordList: Array<string> = []
fetch(words)
    .then(response => response.text())
    .then(text => {
        const words = text.split("\n")
        wordList.push(...words)
    })

const randomIndex = Math.floor(Math.random() * wordList.length)
const randomWord = wordList[randomIndex];
console.log("The Wordle is " + randomWord)


// Define GET endpoint(s)
app.get("/", (req: Request, res: Response) => {
    const secretWord = { secret: randomWord };
    res.json(secretWord);
});

app.listen(PORT, () => {
 console.log(`Server is listening to port ${PORT}`);
});