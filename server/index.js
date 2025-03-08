const express = require("express");
const cors = require("cors");
const rootRouter = require("./routes/index.js")

const app = express();
app.use(express.json());

app.use(cors());

app.use("/api/arxiv", rootRouter);

app.listen(3000);
