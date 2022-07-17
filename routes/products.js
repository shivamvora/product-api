const epxress = require("express");
const router = epxress.Router();

const {
  getAllProducts,
  getAllProductsStatic,
} = require("../controllers/products");

router.route("/").get(getAllProducts);
router.route("/static").get(getAllProductsStatic);

module.exports = router;
