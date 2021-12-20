const router = require("express").Router();
const { pool } = require("../controller/database")

const filterDefault = {
  make: "",
  model: "",
  city: "",
  year: {
    from: "",
    to: "",
  },
  fuel: "",
  price: {
    from: "",
    to: "",
  },
};

const filterQuery = (filter) => {
  let data = [];
  filter.make !== "" ? data.push(`make= '${filter.make}' `) : "";
  filter.model !== "" ? data.push(` model= '${filter.model}' `) : "";
  filter.city !== "" ? data.push(` location= '${filter.city}' `) : "";
  filter.fuel !== "" ? data.push(` fuel= '${filter.fuel}' `) : "";
  filter.year.from !== "" ? data.push(` year > ${filter.year.from} `) : "";
  filter.year.to !== "" ? data.push(` year < ${filter.year.to} `) : "";
  filter.price.from !== "" ? data.push(` price > ${filter.price.from} `) : "";
  filter.price.to !== "" ? data.push(` price < ${filter.price.to} `) : "";
  if (data.length <= 1) {
    return ` WHERE ${data[0]}`;
  } else {
    let query = " WHERE ";
    data.map((x, i) => {
      i > 0 ? (query += `AND ${x}`) : (query += ` ${x} `);
    });
    return query;
  }
};

// GET ALL CARS
router.post("/", async (req, res) => {
  const filter = req.body;
  console.log(filter);
  let query = "SELECT * from testing";
  if (JSON.stringify(filter) !== JSON.stringify(filterDefault)) {
    query += filterQuery(filter);
  }

  console.log(query);
  try {
    const cars = await pool.query(query + ";");
    console.log(cars.rows);
    res.json(cars.rows);
  } catch (err) {
    console.log(err.message);
    res.send(err.message);
  }
});

//GET JUST 4 CARS FOR ADS
router.get("/random", async (req, res) => {
  try {
    const carById = await pool.query(`SELECT * from testing limit 4;`);
    console.log(req.body);
    res.json(carById.rows);
  } catch (err) {
    console.log(err.message);
    res.send(err).status(403);
  }
});

//GET A CAR BY ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const carById = await pool.query(`SELECT * from testing WHERE id= ${id}`);
    console.log(req.body);
    res.json(carById.rows[0]);
  } catch (err) {
    console.log(err.message);
    res.send(err).status(403);
  }
});

//ADD CAR TO DB (MIDDLEWARE REQUIRED, SOME MODIFICATION IS REQUIRED)
router.post("/add", async (req, res) => {
  try {
    const data = req.body;
    const newcar = await pool.query(`INSERT INTO testing 
      (id,
       date,
       make,
       model,
       year,
       cylinder,
       gear,
       fuel,
       price,
       mileage,
       price_rate,
       description,
       img,
       location
       ) VALUES 
       (${data.id}, 
        '${data.date}', 
        '${data.make}', 
        '${data.model}', 
        ${data.year}, 
        ${data.cylinder}, 
        '${data.gear}', 
        '${data.fuel}', 
        ${data.price}, 
        ${data.mileage}, 
        '${data.price_rate}', 
        '${data.desc}', 
        '${data.img}', 
        '${data.location}')`);
    console.log(req.body);
    res.json(newcar.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});

//temp ==> to add array of sample data in the db
router.post("/temp", async (req, res) => {
  try {
    const result = req.body;
    result.map(async (data) => {
      console.log(data);
      const newcar = await pool.query(`INSERT INTO testing 
      (id,
       date,
       make,
       model,
       year,
       cylinder,
       gear,
       fuel,
       price,
       mileage,
       price_rate,
       description,
       img,
       location
       ) VALUES 
       (${data.id}, 
        '${data.date}', 
        '${data.make}', 
        '${data.model}', 
        ${data.year}, 
        ${data.cylinder}, 
        '${data.gear}', 
        '${data.fuel}', 
        ${data.price}, 
        ${data.mileage}, 
        '${data.price_rate}', 
        '${data.desc}', 
        '${data.img}', 
        '${data.location}')`);
      console.log(req.body);
      res.json(newcar.rows[0]);
    });
  } catch (err) {
    console.log(err.message);
  }
});

//UPDATE A CAR BY ID
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { price, gear, fuel, year, kilo, description, car } = req.body;

    const updateCar = await pool.query(
      `UPDATE testing SET price = $1, gear = $2, fuel = $3, year = $4, kilo = $5, description = $6, car = $7 WHERE id = $8 `,
      [price, gear, fuel, year, kilo, description, car, id]
    );
    res.json(updateCar.rows[0]);
    console.log("CAR IS UPDATED!");
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = router