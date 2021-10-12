const userRouter = require("express").Router();
const authMiddlewares = require("../middlewares/auth");
const upload = require("../middlewares/upload");

const userController = require("../controllers/users");

// GET USERS AND FIND
userRouter.get(
  "/",
  authMiddlewares.checkToken,
  authMiddlewares.isAdmin,
  userController.getAllUsers
);
// GET DATA BY USER ID
userRouter.get(
  "/:id",
  authMiddlewares.checkToken,
  // authMiddlewares.isAdmin,
  userController.getUserById
);
// CREATE DATA USERS
userRouter.post(
  "/",
  authMiddlewares.checkToken,
  // authMiddlewares.isAdmin,
  userController.createUser
);
// UPDATE PASSWORD BY ID
userRouter.patch(
  "/password/:id",
  authMiddlewares.checkToken,
  authMiddlewares.isAdmin,
  userController.updatePassword
);
// UPDATE USER BY ID
userRouter.patch(
  "/:id",
  authMiddlewares.checkToken,
  // authMiddlewares.isAdmin,
  upload.single("picture"),
  userController.updateUser
);
// DELETE DATA USER BY ID
userRouter.delete(
  "/:id",
  authMiddlewares.checkToken,
  authMiddlewares.isAdmin,
  userController.deleteUser
);

module.exports = userRouter;
