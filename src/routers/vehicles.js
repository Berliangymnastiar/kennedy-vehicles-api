// sub-router menuju tabel vehicles
const vehicleRouter = require("express").Router();

const vehicleController = require("../controllers/vehicles");

vehicleRouter.get("/", vehicleController.getAllVehicles);
vehicleRouter.get("/popular", vehicleController.getPopularVehicle);
vehicleRouter.get("/:id", vehicleController.getVehicleById);
vehicleRouter.post("/", vehicleController.createVehicle);
vehicleRouter.patch("/:id", vehicleController.updateVehicle);
vehicleRouter.delete("/:id", vehicleController.deleteVehicle);

module.exports = vehicleRouter;
