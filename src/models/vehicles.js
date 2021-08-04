const db = require("../database/mysql");

const getAllVehicles = (inputValue) => {
  return new Promise((resolve, reject) => {
    let queryString =
      "SELECT v.id, v.vehicle_name, v.rating, v.price, v.location, v.picture, c.name AS 'category_name' FROM vehicles v JOIN categories c ON v.category_id = c.id WHERE vehicle_name LIKE ?";

    db.query(queryString, inputValue, (err, results) => {
      if (err) return reject(err);
      return resolve(results);
    });
  });
};

const getVehicleById = (id) => {
  return new Promise((resolve, reject) => {
    const queryString =
      'SELECT v.id, v.vehicle_name, v.rating, v.price, v.location, v.picture, c.name AS "category_name" FROM vehicles v JOIN categories c ON v.category_id = c.id WHERE v.id = ?';

    db.query(queryString, id, (err, results) => {
      if (err) return reject(err);
      return resolve(results);
    });
  });
};

const getPopularVehicle = () => {
  return new Promise((resolve, reject) => {
    const queryString =
      "SELECT v.id, v.vehicle_name, v.rating, v.price, v.location, v.picture, c.name AS 'category_name' FROM vehicles v JOIN categories c ON v.category_id = c.id WHERE v.rating >= 7";

    db.query(queryString, (err, results) => {
      if (err) return reject(err);
      return resolve(results);
    });
  });
};

const createVehicle = (body) => {
  return new Promise((resolve, reject) => {
    const queryString = "INSERT INTO vehicles SET ?";

    db.query(queryString, body, (err, results) => {
      if (err) return reject(err);
      return resolve(results);
    });
  });
};

const updateVehicle = (body, params) => {
  return new Promise((resolve, reject) => {
    const queryString = "UPDATE vehicles SET ? WHERE id = ?";

    db.query(queryString, [body, params.id], (err, results) => {
      if (err) return reject(err);
      return resolve(results);
    });
  });
};

const deleteVehicle = (id) => {
  return new Promise((resolve, reject) => {
    const queryString = "DELETE FROM vehicles WHERE id = ?";

    db.query(queryString, id, (err, results) => {
      if (err) return reject(err);
      return resolve(results);
    });
  });
};

module.exports = {
  getAllVehicles,
  getVehicleById,
  getPopularVehicle,
  createVehicle,
  updateVehicle,
  deleteVehicle,
};
