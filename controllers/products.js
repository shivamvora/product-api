const Product = require("../models/product");

const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({}).select("name price");
  res.status(200).json({ products, nbHits: products.length });
};

const getAllProducts = async (req, res) => {
  const { featured, name, price, company, sort, fields } = req.query;
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
  } else {
    result = result.sort("createdAt");
  }

  if (fields) {
    console.log("fields: ", fields);
    const fieldsList = fields.split(",").join(" ");
    console.log("fieldsList: ", fieldsList);
    result = result.select(fieldsList);
  }

  // pagination

  const page = Number(req.query.page) || 1;
  const pageLimit = Number(req.query.page) || 10;
  const skip = (page - 1) * pageLimit;
  result = result.limit(pageLimit).skip(skip);

  const products = await result;
  res.status(200).json({ products, length: products.length });
};

module.exports = { getAllProducts, getAllProductsStatic };
