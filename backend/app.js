const express = require("express");
const app = express();
const connectDB = require("./config/db");
const authroutes = require("./routes/authRoutes")
const circulationRoute = require("./routes/circulationRoutes");
const dotenv = require("dotenv")
dotenv.config();

app.use(express.json());

app.use("/api/auth",authroutes);
app.use("/api/circulation", circulationRoute);

connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
  console.log(`Server is running on port ${PORT}`);
});