const userRouter = require("express").Router();
const upload = require("../middlewares/upload");

const userController = require("../controllers/users");

// GET USERS AND FIND
userRouter.get("/", userController.getAllUsers);
// GET DATA BY USER ID
userRouter.get("/:id", userController.getUserById);
// CREATE DATA USERS
userRouter.post("/", userController.createUser);
// UPDATE PASSWOR BY ID
userRouter.patch("/password/:id", userController.updatePassword);
// UPDATE USER BY ID
userRouter.patch("/:id", upload.single("picture"), userController.updateUser);
// DELETE DATA USER BY ID
userRouter.delete("/:id", userController.deleteUser);

module.exports = userRouter;
