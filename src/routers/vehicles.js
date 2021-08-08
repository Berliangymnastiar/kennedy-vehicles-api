// sub-router menuju tabel vehicles
const vehicleRouter = require("express").Router();
const upload = require("../middlewares/upload");

const vehicleController = require("../controllers/vehicles");

// let storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "public/images");
//   },
//   filename: function (req, file, cb) {
//     cb(
//       null,
//       file.originalname.split(".")[0] +
//         "-" +
//         Date.now() +
//         "." +
//         file.originalname.split(".")[1]
//       //  foto-date.1
//     );
//   },
// });

// let upload = multer({ storage: storage });

vehicleRouter.get("/", vehicleController.getAllVehicles);
vehicleRouter.get("/popular", vehicleController.getPopularVehicle);
vehicleRouter.get("/:id", vehicleController.getVehicleById);
vehicleRouter.post("/", vehicleController.createVehicle);
vehicleRouter.patch(
  "/:id",
  upload.single("picture"),
  vehicleController.updateVehicle
);
vehicleRouter.delete("/:id", vehicleController.deleteVehicle);

module.exports = vehicleRouter;
// vehicleRouter.post("/image", upload.single("img"), (req, res) => {
//   console.log(req.file);
// });
// vehicleRouter.patch(
//   "/",
//   upload.single("picture"),
//   vehicleController.editVehicle
// );
