const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv").config();
const {connect} = require("./controller/database")
const carRoute = require("./routes/car.route")

const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json()); //=> req.body

//router
app.use("/car", carRoute)

connect();

app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
