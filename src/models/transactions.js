const db = require("../database/mysql");

const getAllTransactions = (query) => {
  return new Promise((resolve, reject) => {
    let queryString =
      `SELECT t.id, u.name, u.email, u.phonenumber, u.address, u.gender, v.name, v.price, t.rating, v.category_id, t.date FROM vehicles v JOIN transactions t ON t.vehicle_id = v.id JOIN users u ON t.user_id = u.id WHERE vehicle_name LIKE ?` +
      (query?.filter ? ` AND u.name LIKE '%${query.filter}%' ` : " ") +
      (query?.order_by && query?.sort
        ? ` ORDER BY ${query.order_by} ${query.sort} `
        : " ") +
      `LIMIT ? OFFSET ?`;

    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 3;
    const offset = limit * (page - 1);
    const countQs = 'SELECT count(*) AS "total_data" FROM transactions';

    let inputValue = `%${query.vehicle_name || ""}%`;
    db.query(queryString, [inputValue, limit, offset], (err, resultGet) => {
      if (err) return err;
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

const createTransaction = (body) => {
  return new Promise((resolve, reject) => {
    const queryString = "INSERT INTO transactions SET ?";
    db.query(queryString, body, (err, results) => {
      if (err) return reject(err);
      return resolve(results);
    });
  });
};

const updateTransaction = (body, id) => {
  return new Promise((resolve, reject) => {
    const queryString = "UPDATE transactions SET ? WHERE id = ?";
    db.query(queryString, [body, id], (err, results) => {
      if (err) return reject(err);
      return resolve(results);
    });
  });
};

const deleteTransaction = (id) => {
  return new Promise((resolve, reject) => {
    const queryString = "DELETE FROM transactions WHERE id = ?";
    db.query(queryString, id, (err, results) => {
      if (err) return reject(err);
      return resolve(results);
    });
  });
};

module.exports = {
  getAllTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
};
