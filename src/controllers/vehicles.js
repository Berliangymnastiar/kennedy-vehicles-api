const vehicleModel = require("../models/vehicles");
const responseHelper = require("../helpers/response");

const getAllVehicles = (req, res) => {
  const { query } = req;

  let inputValue = `%${query.vehicle_name || ""}%`;
  vehicleModel
    .getAllVehicles(inputValue)
    .then((data) => responseHelper.success(res, 200, data))
    .catch((err) => responseHelper.error(res, 500, err));
};

const getPopularVehicle = (req, res) => {
  vehicleModel
    .getPopularVehicle()
    .then((data) => responseHelper.success(res, 200, data))
    .catch((err) => responseHelper.error(res, 500, err));
};

const getVehicleById = (req, res) => {
  const { params } = req;

  vehicleModel
    .getVehicleById(params.id)
    .then((data) => responseHelper.success(res, 200, data))
    .catch((err) => responseHelper.error(res, 500, err));
};

const createVehicle = (req, res) => {
  const { body } = req;

  vehicleModel
    .createVehicle(body)
    .then((data) => responseHelper.success(res, 200, data))
    .catch((err) => responseHelper.error(res, 500, err));
};

const updateVehicle = (req, res) => {
  const { body, params } = req;

  vehicleModel
    .updateVehicle(body, params)
    .then((data) => responseHelper.success(res, 200, data))
    .catch((err) => responseHelper.error(res, 500, err));
};

const deleteVehicle = (req, res) => {
  const { params } = req;

  vehicleModel
    .deleteVehicle(params.id)
    .then((data) => responseHelper.success(res, 200, data))
    .catch((err) => responseHelper.error(res, 500, err));
};

module.exports = {
  getAllVehicles,
  getVehicleById,
  getPopularVehicle,
  createVehicle,
  updateVehicle,
  deleteVehicle,
};
