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
      if (err === 404) {
        return responseHelper.error(res, 404, "Data not found!");
      }
      responseHelper.error(res, 500, err);
    });
};

const getPopularVehicle = (req, res) => {
  vehicleModel
    .getPopularVehicle()
    .then((data) => responseHelper.success(res, 200, data))
    .catch((err) => {
      responseHelper.error(res, 500, err);
    });
};

const getVehicleById = (req, res) => {
  const { params } = req;

  vehicleModel
    .getVehicleById(params.id)
    .then((data) => responseHelper.success(res, 200, data))
    .catch((err) => {
      responseHelper.error(res, 500, err);
    });
};

const createVehicle = (req, res) => {
  const { body, file } = req;

  let input = { ...body };
  if (file) {
    // const host = "http://localhost:8000";
    const imageURL = `/images/${file.filename}`;
    input = {
      picture: imageURL,
      ...input,
    };
  }

  vehicleModel
    .createVehicle(input)
    .then((data) => responseHelper.success(res, 200, data))
    .catch((err) => {
      responseHelper.error(res, 500, err);
    });
};

const updateVehicle = (req, res) => {
  vehicleModel
    .updateVehicle(req)
    .then((data) => responseHelper.success(res, 200, data))
    .catch((err) => {
      responseHelper.error(res, 500, err);
    });
};

const deleteVehicle = (req, res) => {
  const { params } = req;

  vehicleModel
    .deleteVehicle(params.id)
    .then((data) => responseHelper.success(res, 200, data))
    .catch((err) => {
      responseHelper.error(res, 500, err);
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
