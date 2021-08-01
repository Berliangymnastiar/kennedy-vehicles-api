require("dotenv").config();
const express = require("express");
const logger = require("morgan");

const app = express();
const port = 8000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(logger("dev"));

app.listen(port, () => {
  console.log(`App started at port ${port}`);
});

// connect to db
const mysql = require("mysql");
const { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE } = process.env;
const db = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
});

// GET DATA VEHICLES
app.get("/vehicles", (req, res) => {
  const queryString =
    'SELECT v.id, v.vehicle_name, v.rating, v.price, c.name AS "category_name" FROM vehicles v JOIN categories c ON v.category_id = c.id';

  const queryPromise = new Promise((resolve, reject) => {
    db.query(queryString, (err, results) => {
      if (err) return reject(err);
      return resolve(results);
    });
  });
  queryPromise
    .then((data) => res.json(data))
    .catch((err) => res.status(500).json(err));
});

// CREATE DATA VEHICLE
app.post("/vehicles", (req, res) => {
  const { body } = req;

  const queryString = "INSERT INTO vehicles SET ?";
  const queryPromise = new Promise((resolve, reject) => {
    db.query(queryString, body, (err, results) => {
      if (err) return reject(err);
      return resolve(results);
    });
  });
  queryPromise
    .then((data) => res.json(data))
    .catch((err) => res.status(500).json(err));
});

// GET DATA VEHICLE BY HIGH RATING
app.get("/vehicles/rating", (req, res) => {
  const queryString = "SELECT * FROM vehicles ORDER BY rating DESC";
  const queryPromise = new Promise((resolve, reject) => {
    db.query(queryString, (err, results) => {
      if (err) return reject(err);
      return resolve(results);
    });
  });
  queryPromise
    .then((data) => res.json(data))
    .catch((err) => res.status(500).json(err));
});

// GET DATA VEHICLE BY ID
app.get("/vehicle/:id", (req, res) => {
  const { params } = req;

  const queryString =
    'SELECT v.id, v.vehicle_name, v.rating, v.price, c.name AS "category_name" FROM vehicles v JOIN categories c ON v.category_id = c.id WHERE v.id = ?;';
  const queryPromise = new Promise((resolve, reject) => {
    db.query(queryString, params.id, (err, results) => {
      if (err) return reject(err);
      return resolve(results);
    });
  });
  queryPromise
    .then((data) => res.json(data))
    .catch((err) => res.status(500).json(err));
});

// UPDATE VEHICLE
app.patch("/vehicle/:id", (req, res) => {
  const { body, params } = req;

  const queryString = "UPDATE vehicles SET ? WHERE id = ?";
  const queryPromise = new Promise((resolve, reject) => {
    db.query(queryString, [body, params.id], (err, results) => {
      if (err) return reject(err);
      return resolve(results);
    });
  });
  queryPromise
    .then((data) => res.json(data))
    .catch((err) => res.status(500).json(err));
});

// DELETE DATA VEHICLE
app.delete("/vehicle/:id", (req, res) => {
  const { params } = req;

  const queryString = "DELETE FROM vehicles WHERE id = ?";
  const queryPromise = new Promise((resolve, reject) => {
    db.query(queryString, [params.id], (err, results) => {
      if (err) return reject(err);
      return resolve(results);
    });
  });
  queryPromise
    .then((data) => res.json(data))
    .catch((err) => res.status(500).json(err));
});

// GET USERS
app.get("/users", (req, res) => {
  const queryString = "SELECT * FROM users";
  const queryPromise = new Promise((resolve, reject) => {
    db.query(queryString, (err, results) => {
      if (err) return reject(err);
      return resolve(results);
    });
  });
  queryPromise
    .then((data) => res.json(data))
    .catch((err) => res.status(500).json(err));
});

// GET DATA BY USER ID
app.get("/user/:id", (req, res) => {
  const { params } = req;

  const queryString = "SELECT * FROM users WHERE id = ?";
  const queryPromise = new Promise((resolve, reject) => {
    db.query(queryString, params.id, (err, results) => {
      if (err) return reject(err);
      return resolve(results);
    });
  });
  queryPromise
    .then((data) => res.json(data))
    .catch((err) => res.status(500).json(err));
});

// CREATE DATA USERS
app.post("/users", (req, res) => {
  const { body } = req;
  const queryString = "INSERT INTO users SET ?";
  const queryPromise = new Promise((resolve, reject) => {
    db.query(queryString, body, (err, results) => {
      if (err) return reject(err);
      return resolve(results);
    });
  });
  queryPromise
    .then((data) => res.json(data))
    .catch((err) => res.status(500).json(err));
});

// UPDATE USER BY ID
app.patch("/user/:id", (req, res) => {
  const { body, params } = req;

  const queryString = "UPDATE users SET ? WHERE id = ?";
  const queryPromise = new Promise((resolve, reject) => {
    db.query(queryString, [body, params.id], (err, results) => {
      if (err) return reject(err);
      return resolve(results);
    });
  });
  queryPromise
    .then((data) => res.json(data))
    .catch((err) => res.status(500).json(err));
});

// DELETE DATA USER BY ID
app.delete("/user/:id", (req, res) => {
  const { params } = req;

  const queryString = "DELETE FROM users WHERE id = ?";
  const queryPromise = new Promise((resolve, reject) => {
    db.query(queryString, [params.id], (err, results) => {
      if (err) return reject(err);
      return resolve(results);
    });
  });
  queryPromise
    .then((data) => res.json(data))
    .catch((err) => res.status(500).json(err));
});

// GET DATA CATEGORIES
app.get("/categories", (req, res) => {
  const queryString = "SELECT * FROM categories";

  const queryPromise = new Promise((resolve, reject) => {
    db.query(queryString, (err, results) => {
      if (err) return reject(err);
      return resolve(results);
    });
  });
  queryPromise
    .then((data) => res.json(data))
    .catch((err) => res.status(500).json(err));
});

// GET CATEGORY BY ID
app.get("/category/:id", (req, res) => {
  const { params } = req;

  const queryString = "SELECT * FROM categories WHERE id = ?";
  const queryPromise = new Promise((resolve, reject) => {
    db.query(queryString, params.id, (err, results) => {
      if (err) return reject(err);
      return resolve(results);
    });
  });
  queryPromise
    .then((data) => res.json(data))
    .catch((err) => res.status(500).json(err));
});

// CREATE DATA CATEGORIES
app.post("/categories", (req, res) => {
  const { body } = req;

  const queryString = "INSERT INTO categories SET ?";
  const queryPromise = new Promise((resolve, reject) => {
    db.query(queryString, body, (err, results) => {
      if (err) return reject(err);
      return resolve(results);
    });
  });
  queryPromise
    .then((data) => res.json(data))
    .catch((err) => res.status(500).json(err));
});

// UPDATE CATEGORY BY ID
app.patch("/category/:id", (req, res) => {
  const { body, params } = req;

  const queryString = "UPDATE categories SET ? WHERE id = ?";
  const queryPromise = new Promise((resolve, reject) => {
    db.query(queryString, [body, params.id], (err, results) => {
      if (err) return reject(err);
      return resolve(results);
    });
  });
  queryPromise
    .then((data) => res.json(data))
    .catch((err) => res.status(500).json(err));
});

// DELETE CATEGORY BY ID
app.delete("/category/:id", (req, res) => {
  const { params } = req;

  const queryString = "DELETE FROM categories WHERE id = ?";
  const queryPromise = new Promise((resolve, reject) => {
    db.query(queryString, [params.id], (err, results) => {
      if (err) return reject(err);
      return resolve(results);
    });
  });
  queryPromise
    .then((data) => res.json(data))
    .catch((err) => res.status(500).json(err));
});

// GET DATA TRANSACTIONS / HISTORY
app.get("/transactions", (req, res) => {
  const queryString =
    "SELECT u.name, u.email, u.phonenumber, u.address, u.gender, v.vehicle_name, v.price, t.date FROM vehicles v JOIN transactions t ON t.vehicle_id = v.id JOIN users u ON t.user_id = u.id";

  const queryPromise = new Promise((resolve, reject) => {
    db.query(queryString, (err, results) => {
      if (err) return err;
      return resolve(results);
    });
  });
  queryPromise
    .then((data) => res.json(data))
    .catch((err) => res.status(500).json(err));
});

// GET TRANSACTION BY ID
app.get("/transaction/:id", (req, res) => {
  const { params } = req;

  const queryString =
    "SELECT u.name, u.email, u.phonenumber, u.address, u.gender, v.vehicle_name, v.price, t.date FROM vehicles v JOIN transactions t ON t.vehicle_id = v.id JOIN users u ON t.user_id = u.id WHERE t.id = ?";
  const queryPromise = new Promise((resolve, reject) => {
    db.query(queryString, params.id, (err, results) => {
      if (err) return reject(err);
      return resolve(results);
    });
  });
  queryPromise
    .then((data) => res.json(data))
    .catch((err) => res.status(500).json(err));
});

// CREATE TRANSACTIONS
app.post("/transactions", (req, res) => {
  const { body } = req;

  const queryString = "INSERT INTO transactions SET ?";
  const queryPromise = new Promise((resolve, reject) => {
    db.query(queryString, body, (err, results) => {
      if (err) return reject(err);
      return resolve(results);
    });
  });
  queryPromise
    .then((data) => res.json(data))
    .catch((err) => res.status(500).json(err));
});

// UPDATE TRANSACTION
app.patch("/transaction/:id", (req, res) => {
  const { body, params } = req;

  const queryString = "UPDATE transactions SET ? WHERE id = ?";
  const queryPromise = new Promise((resolve, reject) => {
    db.query(queryString, [body, params.id], (err, results) => {
      if (err) return reject(err);
      return resolve(results);
    });
  });
  queryPromise
    .then((data) => res.json(data))
    .catch((err) => res.status(500).json(err));
});

app.delete("/transaction/:id", (req, res) => {
  const { params } = req;

  const queryString = "DELETE FROM transactions WHERE id = ?";
  const queryPromise = new Promise((resolve, reject) => {
    db.query(queryString, [params.id], (err, results) => {
      if (err) return reject(err);
      return resolve(results);
    });
  });
  queryPromise
    .then((data) => res.json(data))
    .catch((err) => res.status(500).json(err));
});
