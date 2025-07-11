const express = require("express");
const cors = require("cors");
const rootRouter = require("./routes/index.js")

const app = express();

const allowedOrigins = [`${process.env.FRONTEND_URL}`, "http://localhost:5173"];

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true 
}));

app.use(express.json());

app.use(cors());

app.use("/api/arxiv", rootRouter);

app.listen(3000);
