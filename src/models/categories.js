const db = require("../database/mysql");

const getAllCategories = (inputValue) => {
  return new Promise((resolve, reject) => {
    const queryString = "SELECT * FROM categories WHERE name LIKE ?";
    db.query(queryString, inputValue, (err, results) => {
      if (err) return reject(err);
      return resolve(results);
    });
  });
};

// const getCategoryById = (id) => {
//   return new Promise((resolve, reject) => {
//     const queryString = "SELECT * FROM categories WHERE id = ?";
//     db.query(queryString, id, (err, results) => {
//       if (err) return reject(err);
//       return resolve(results);
//     });
//   });
// };

// const createCategory = (body) => {
//   return new Promise((resolve, reject) => {
//     const queryString = "INSERT INTO categories SET ?";
//     db.query(queryString, body, (err, results) => {
//       if (err) return reject(err);
//       return resolve(results);
//     });
//   });
// };

// const updateCategory = (body, id) => {
//   return new Promise((resolve, reject) => {
//     const queryString = "UPDATE categories SET ? WHERE id = ?";
//     db.query(queryString, [body, id], (err, results) => {
//       if (err) return reject(err);
//       return resolve(results);
//     });
//   });
// };

// const deleteCategory = (id) => {
//   return new Promise((resolve, reject) => {
//     const queryString = "DELETE FROM categories WHERE id = ?";
//     db.query(queryString, id, (err, results) => {
//       if (err) return reject(err);
//       return resolve(results);
//     });
//   });
// };

module.exports = {
  getAllCategories,
  // getCategoryById,
  // createCategory,
  // updateCategory,
  // deleteCategory,
};
