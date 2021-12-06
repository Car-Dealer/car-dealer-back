const express = require("express");
const app = express();
const Pool = require('pg').Pool
const dotenv = require('dotenv').config()
const cors = require('cors')
app.use(cors())

const pool = new Pool({
  connectionString: process.env.HEROKU_DB_Link,
  ssl: {
    rejectUnauthorized: false
  }
})
app.use(express.json()); //=> req.body

const connect = async ()=>(
  await pool.connect()
  .then((m)=>console.log("db connected"))
  .catch(e=>console.error(e))
  )

const filterDefault = {
  make: '',
  model: '',
  city: '',
  year:{
      from: '',
      to: ''
  },
  fuel: '',
  price:{
      from: '',
      to:''
  }}

const port = process.env.PORT || 3001
connect()


// GET ALL CARS
app.post("/car", async(req,res) =>{
  const filter = req.body
  console.log(filter)
  let query = 'SELECT * from testing'
  if (JSON.stringify(filter) !== JSON.stringify(filterDefault)){
    query += " WHERE "
    filter.make !== ""? query+=`make= '${filter.make}' ` : ""
    filter.model !== ""? query+=` model= '${filter.model}' ` : ""
    filter.city !== ""? query+=` city= '${filter.city}' ` : ""
    filter.fuel !== ""? query+=` fuel= '${filter.fuel}' ` : ""
    filter.year.from !== ""? query+=` year > ${filter.year.from} ` : ""
    filter.year.to !== ""? query+=` year < ${filter.year.to} ` : ""
    filter.price.from !== ""? query+=` price > ${filter.price.from} ` : ""
    filter.price.to !== ""? query+=` price < ${filter.price.to} ` : ""
  }
  
  console.log(query)
  try{
  const cars = await pool.query(query+";");
  console.log(cars.rows)
  res.json(cars.rows);
 }catch(err){
  console.log(err.message);
  res.send(err.message);
 }
});

//GET A CAR BY ID
app.get("/car/:id", async(req,res) => {
 const {id} = req.params;
 try{
  const carById = await Pool.query(`SELECT * from testing WHERE id= ${id}`);
  console.log(req.body)
  res.json(carById.rows[0]);
 }catch(err){
  console.log(err.message);
  res.send(err).status(403);
 }
});

//CREATE A CAR
app.post("/car", async(req,res) => {
 try{
  const {price, gear, fuel, year, kilo, description, car} = req.body;
  const newcar = await pool.query(`INSERT INTO testing (price, gear, fuel, year, kilo, description, car) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,[price, gear, fuel, year, kilo, description, car]);
  console.log(req.body)
  res.json(newcar.rows[0]);
 }catch(err){
  console.log(err.message);
 }
});

//UPDATE A CAR BY ID
app.put("/car/:id", async (req,res) => {
 try{
  const{ id } = req.params;
  const {price, gear, fuel, year, kilo, description, car} = req.body;

  const updateCar = await pool.query(`UPDATE testing SET price = $1, gear = $2, fuel = $3, year = $4, kilo = $5, description = $6, car = $7 WHERE id = $8 `, [price, gear, fuel, year, kilo, description, car, id]
  );
  res.json(updateCar.rows[0]);
  console.log("CAR IS UPDATED!");
 } catch(err){
console.log(err.message);
  }
 });

//ADD AN ADMIN (Won't need this since we won't have time to develop admin functionalities)
app.post("/admin", async(req,res) => {
 try{
  const {username,passwords} = req.body;
  const newadmin = await pool.query(`INSERT INTO admins (username,passwords) VALUES ($1, $2)`,[username,passwords]);
  console.log(req.body)
  res.json(newcar.row[0]);
 }catch(err){
  console.log(err.message);
 }
});

app.listen(port,() =>{
 console.log(`server is listening on port ${port}`);
})
