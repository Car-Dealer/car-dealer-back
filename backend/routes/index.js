const express = require("express");
const app = express();
const pool = require("./db");
app.use(express.json()); //=> req.body

// GET ALL CARS
app.get("/car", async(req,res) =>{
 try{
  const cars = await pool.query(`SELECT * from testing;`);
  console.log(req.body)
  res.json(cars.rows);
 }catch(err){
  console.log(err.message);
 }
});

//GET A CAR BY ID
app.get("/car/:id", async(req,res) => {
 const {id} = req.params;
 try{
  const carById = await pool.query(`SELECT * from testing WHERE id= $1`,[id]);
  console.log(req.body)
  res.json(carById.rows[0]);
 }catch(err){
  console.log(err.message);
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

app.listen(3000,() =>{
 console.log("server is listening on port 3000");
})
