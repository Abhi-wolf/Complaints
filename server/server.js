const express = require("express");
const app = express();

//dotenv configuration:
const dotenv = require("dotenv");
dotenv.config();

//connection database:
const connectDb = require("./db/config");
connectDb();

//middlewares:
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const cookieparser = require("cookie-parser");
app.use(cookieparser());

const complaint = require("./route/complaintRoute");
const admin = require("./route/adminRoute");
app.use("/api/v1/admin", admin);
app.use("/api/v1/user", require("./route/userRoutes"));
app.use("/api/v1/complaint", complaint);

//files upload
app.listen(process.env.PORT, () => {
  console.log(`server is listening ${process.env.PORT}`);
});
