const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'test',
  password: 'Medtech2020$',
  port: 5432,
})

// GET ALL CARS
const getCars = (request, response) => {
 let res =  pool.query('SELECT * FROM testing', (error, results) => {
   console.log(res);
    if (error) {
      throw error
    }
  })
}

// GET CAR BY ID
const getCarById = (request, response) => {
 let res = pool.query(`SELECT * FROM testing WHERE id = 1`, (error, results) => {
    console.log(res);
    if (error) {
      throw error
    }
  })
}

// CREATE CAR (NOT A CAR POST, DOESN'T INCLUDE IMAGE!!)
const createCar = (request, response) => {
 let res = pool.query(`INSERT INTO testing (price, gear, fuel, year, kilo, description, car) VALUES ('20000 DT','MANUAL', 'ESSENCE', '2011', '20000 KM', 'VERY GOOD', 'FORD FOCUS 2007')`, (error, results) => {
   console.log(res);
    if (error) {
      throw error
    }
  })
}

// UPDATE CARS BY ID
const updateCar = (request, response) => {
  let res = pool.query(
    `UPDATE testing SET car = 'MERECEDES G WAGON', price ='300000 DT' id= 1200`,
    (error, results) => {
      console.log(res);
      if (error) {
        throw error
      }
    }
  )
}

//DELETE CAR BY ID
const deleteCar = (request, response) => {
 let res = pool.query(`DELETE FROM testing WHERE id = 2`, (error, results) => {
   console.log(res);
   console.log("done");
    if (error) {
      throw error
    }
  })
}

module.exports = {
  getCars,
  getCarById,
  createCar,
  updateCar,
  deleteCar,
}