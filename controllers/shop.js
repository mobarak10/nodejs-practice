const Product = require("../models/products");
const Cart = require("../models/cart");

exports.getProducts = (req, res, next) => {
    Product.getProducts((products) => {
        res.render('shop/product-list', {
            prods: products,
            pageTitle: 'All Products',
            path: '/products',
        });
    });
}

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.getProductById(prodId, product => {
        res.render('shop/product-details', {
            product: product,
            pageTitle: product.title,
            path: '/products',
        });  
    });
}

exports.getIndex = (req, res, next) => {
    Product.getProducts((products) => {
        res.render('shop/index', {
            prods: products,
            pageTitle: 'Shop',
            path: '/',
        });
    });
}

exports.getCart = (req, res, next) => {
    Product.getProducts((products) => {
        res.render('shop/cart', {
            prods: products,
            pageTitle: 'Your Cart',
            path: '/cart',
        });
    });
}

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    
    Product.getProductById(prodId, (product) => {
        Cart.addProduct(prodId, product.price);
        res.redirect('/cart');
    });
}

exports.getCheckout = (req, res, next) => {
    Product.getProducts((products) => {
        res.render('shop/checkout', {
            prods: products,
            pageTitle: 'Checkout',
            path: '/checkout',
        });
    });
}
exports.getOrders = (req, res, next) => {
     Product.getProducts((products) => {
        res.render('shop/orders', {
            prods: products,
            pageTitle: 'Orders',
            path: '/orders',
        });
    });
}