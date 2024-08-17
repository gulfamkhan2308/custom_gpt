import dotenv from "dotenv";
import OpenAI from "openai";
import express from "express";
import bodyParser from "body-parser";
import ejs from "ejs";

// Load environment variables from .env file
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const app = express();
const port = 3000 || process.env.PORT;

app.use(express.static("public"));
app.use(bodyParser.json());
app.set("view engine", "ejs");

// Routes for rendering pages
app.get('/home', (req, res) => res.render('pages/home'));
app.get('/about', (req, res) => res.render('pages/about'));
app.get('/contact', (req, res) => res.render('pages/contact'));

// Route to handle incoming chat messages
app.post('/send-message', async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: userMessage }
      ],
    });

    const botResponse = response.choices[0].message.content;

    // Send the response back to the client
    res.json({ reply: botResponse });
  } catch (error) {
    console.error(`Error communicating with OpenAI: ${error.message}`);
    res.status(500).json({ error: "Failed to get a response from the assistant." });
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
