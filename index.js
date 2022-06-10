const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const postrouting = require("./crudApi/posts");
const mongoose = require("mongoose");

require("dotenv").config();

//middleware
app.use(cors());
app.use(express.json());
app.use("/api", postrouting);

mongoose.connect(
  process.env.MONGODB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true, autoIndex: true },
  () => console.log("Connected to database")
);

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
