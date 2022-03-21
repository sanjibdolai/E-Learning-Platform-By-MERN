const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const PORT = process.env.PORT || 5000;
require("./db/conn");
app.use(cors());
app.use(express.json());
app.use(require("./routes/auth"));


 
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
