const Product = require("../models/product");

const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({}).sort("-name price");
  res.status(200).json({ products, nbHits: products.length });
};

const getAllProducts = async (req, res) => {
  const { featured, name, price, company, sort } = req.query;
  const queryObj = {};
  if (featured) {
    queryObj.featured = featured;
  }
  if (price) {
    queryObj.price = price;
  }
  if (company) {
    queryObj.company = company;
  }
  if (name) {
    queryObj.name = { $regex: name, $options: "i" };
  }

  console.log("queryObject: ", queryObj);

  let result = Product.find(queryObj);
  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  }
  const products = await result;
  res.status(200).json({ products, length: products.length });
};

module.exports = { getAllProducts, getAllProductsStatic };
