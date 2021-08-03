const categoryRouter = require("express").Router();

const categoryController = require("../controllers/categories");

// GET DATA CATEGORIES
categoryRouter.get("/", categoryController.getAllCategories);
// GET CATEGORY BY ID
categoryRouter.get("/:id", categoryController.getCategoryById);
// CREATE DATA CATEGORIES
categoryRouter.post("/", categoryController.createCategory);
// UPDATE CATEGORY BY ID
categoryRouter.patch("/:id", categoryController.updateCategory);
// DELETE CATEGORY BY ID
categoryRouter.delete("/:id", categoryController.deleteCategory);

module.exports = categoryRouter;
