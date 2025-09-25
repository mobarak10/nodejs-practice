const express = require('express');
const productController = require('../controllers/products');
const { route } = require('./shop');

const router = express.Router();

const products = [];
// /admin/add-product => GET
router.get('/add-product', productController.getAddProduct);

// /admin/add-product => POST
router.post('/add-product', productController.postAddProduct);


module.exports = router;