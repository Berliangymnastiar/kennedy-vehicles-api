const db = require("../database/mysql");

const getAllVehicles = (query) => {
  return new Promise((resolve, reject) => {
    let queryString =
      `SELECT v.id, v.vehicle_name, v.price, v.location, v.picture, c.name AS 'category_name' FROM vehicles v JOIN categories c ON v.category_id = c.id WHERE vehicle_name LIKE ?` +
      (query?.filter ? ` AND c.name = '${query.filter}' ` : " ") +
      (query?.order_by && query?.sort
        ? ` ORDER BY ${query.order_by} ${query.sort} `
        : " ") +
      `LIMIT ? OFFSET ?`;

    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 3;
    const offset = limit * (page - 1);
    const countQs = 'SELECT count(*) AS "total_data" FROM vehicles';

    let inputValue = `%${query.vehicle_name || ""}%`;
    db.query(queryString, [inputValue, limit, offset], (err, resultGet) => {
      if (err) return reject(err);
      db.query(countQs, (err, resultCount) => {
        if (err) return reject(err);
        return resolve({
          data: resultGet,
          count: resultCount,
          limit,
          page,
        });
      });
    });
  });
};

const getVehicleById = (id) => {
  return new Promise((resolve, reject) => {
    const queryString =
      'SELECT v.id, v.vehicle_name, v.price, v.location, v.picture, c.name AS "category_name" FROM vehicles v JOIN categories c ON v.category_id = c.id WHERE v.id = ?';

    db.query(queryString, id, (err, results) => {
      if (err) return reject(err);
      return resolve(results);
    });
  });
};

const getPopularVehicle = () => {
  return new Promise((resolve, reject) => {
    const queryString =
      "SELECT t.id, v.vehicle_name, v.price, t.rating, t.date FROM vehicles v JOIN transactions t ON t.vehicle_id = v.id WHERE t.rating > 7 ORDER BY t.date ASC";

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
