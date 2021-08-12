const vehicleModel = require("../models/vehicles");
const responseHelper = require("../helpers/response");

const getAllVehicles = (req, res) => {
  const { query } = req;

  vehicleModel
    .getAllVehicles(query)
    .then(({ data, count, limit, page }) => {
      const baseURL = "http://localhost:8000/vehicles";
      const totalData = count[0].total_data;
      const totalPage = Math.ceil(totalData / Number(limit));
      const currentPage = Number(page);
      const prevPage =
        currentPage > 1
          ? baseURL + `?page=${currentPage - 1}&limit=${limit}`
          : null;
      const nextPage =
        currentPage < totalPage
          ? baseURL + `?page=${currentPage + 1}&limit=${limit}`
          : null;
      const info = {
        totalData,
        currentPage,
        totalPage,
        nextPage,
        prevPage,
      };
      responseHelper.success(res, 200, data, info);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "some error occured while get data vehicles",
      });
    });
};

const getPopularVehicle = (req, res) => {
  vehicleModel
    .getPopularVehicle()
    .then((data) => responseHelper.success(res, 200, data))
    .catch((err) => {
      res.status(500).send({
        message: err.message || "some error occured while get popular vehicle",
      });
    });
};

const getVehicleById = (req, res) => {
  const { params } = req;

  vehicleModel
    .getVehicleById(params.id)
    .then((data) => responseHelper.success(res, 200, data))
    .catch((err) => {
      res.status(500).send({
        message: err.message || "some error occured while get the vehicle",
      });
    });
};

const createVehicle = (req, res) => {
  const { body } = req;

  vehicleModel
    .createVehicle(body)
    .then((data) => responseHelper.success(res, 200, data))
    .catch((err) => {
      res.status(500).send({
        message: err.message || "some error occured while creating vehicle",
      });
    });
};

const updateVehicle = (req, res) => {
  const { body, file, params } = req;

  let input = { ...body };
  if (file) {
    const host = "http://localhost:8000";
    const imageURL = `/images/${file.filename}`;
    input = {
      picture: host + imageURL,
      ...input,
    };
  }
  vehicleModel
    .updateVehicle(input, params)
    .then((data) => responseHelper.success(res, 201, data))
    .catch((err) => {
      res.status(500).send({
        message: err.message || "some error occured while update data vehicles",
      });
    });
};

const deleteVehicle = (req, res) => {
  const { params } = req;

  vehicleModel
    .deleteVehicle(params.id)
    .then((data) => responseHelper.success(res, 200, data))
    .catch((err) => {
      res.status(500).send({
        message: err.message || "some error occured while delete data",
      });
    });
};

// const editVehicle = (req, res) => {
//   res.json(req.file);
// };

module.exports = {
  getAllVehicles,
  getVehicleById,
  getPopularVehicle,
  // editVehicle,
  createVehicle,
  updateVehicle,
  deleteVehicle,
};
