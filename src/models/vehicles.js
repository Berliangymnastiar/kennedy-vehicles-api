const db = require("../database/mysql");

const getAllVehicles = (query) => {
  return new Promise((resolve, reject) => {
    let location = query?.location ? query?.location : "";
    let filter = query?.filter ? query?.filter : "";
    let queryString =
      `SELECT v.id, v.name, v.price, v.location, v.capacity, v.picture, v.available_item, v.description, c.name AS 'category_name' 
      FROM vehicles v JOIN categories c ON v.category_id = c.id  WHERE v.name LIKE ?` +
      ` AND c.name LIKE '%${filter}%' ` +
      ` AND v.location LIKE '%${location}%' ` +
      (query?.order_by && query?.sort
        ? ` ORDER BY ${query.order_by} ${query.sort} `
        : " ") +
      `LIMIT ? OFFSET ?`;

    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const offset = limit * (page - 1);
    const countQs = 'SELECT count(*) AS "total_data" FROM vehicles';

    let inputValue = `%${query.name || ""}%`;
    db.query(queryString, [inputValue, limit, offset], (err, resultGet) => {
      if (err) return reject(err);
      if (!resultGet.length) return reject(404);
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
    const queryString = `SELECT v.id, v.name, v.price, v.location, v.capacity, v.picture, v.available_item, v.description, c.name AS 'category_name' FROM vehicles v JOIN categories c ON v.category_id = c.id WHERE v.id = ?`;

    db.query(queryString, id, (err, results) => {
      if (err) return reject(err);
      return resolve(results);
    });
  });
};

const getPopularVehicle = () => {
  return new Promise((resolve, reject) => {
    const queryString =
      "SELECT t.id, v.name, v.price, v.capacity, t.rating, t.date, v.available_item FROM vehicles v JOIN transactions t ON t.vehicle_id = v.id WHERE t.rating > 7 ORDER BY t.date ASC";

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

const updateVehicle = (req) => {
  const { body, params, file } = req;
  let id = params.id;
  let picture = "";
  let input;
  // const host = "http://localhost:8000";
  // // const imageURL = `/images/${file.filename}`;
  if (file) {
    picture += `/images/${file.filename}`;
    input = {
      picture,
    };
  }

  console.log(file);

  console.log(body);
  const inputWithoutPicture = { ...body };
  const inputWithPicture = { ...body, ...input };
  let newInput = {};
  if (!picture) {
    newInput = inputWithoutPicture;
  } else {
    newInput = inputWithPicture;
  }

  console.log(newInput);
  return new Promise((resolve, reject) => {
    const queryString = "UPDATE vehicles SET ? WHERE id = ?";
    db.query(queryString, [newInput, id], (err, results) => {
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
