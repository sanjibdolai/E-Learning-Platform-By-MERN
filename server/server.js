const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser');


require("dotenv").config({ path: "./config.env" });

const PORT = process.env.PORT || 5000;

require("./db/conn");

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(require("./routes/userAuth"));
app.use(require("./routes/api"));

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
