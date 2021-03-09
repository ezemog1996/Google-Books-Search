const router = require("express").Router();
const bookController = require("../../controllers/bookController");

router.route("/")
    .post(bookController.create)
    .get(bookController.findAll)

router.route("/:id")
    .get(bookController.findOne)
    .put(bookController.update)
    .delete(bookController.remove)

module.exports = router;