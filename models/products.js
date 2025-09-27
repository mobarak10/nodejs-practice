const products = [];
const fs = require('fs');
const path = require('path');
const Cart = require('./cart');

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'products.json'
);

const getProductsFromFile = (callback) => {
    fs.readFile(p, (err, fileContent) => { // read the file content
        if (err) { // if error occurs
            callback([]); // return an empty array
        }else{
            callback(JSON.parse(fileContent)); // return the parsed JSON file content
        }
    });
}
module.exports  = class Product {
    constructor(id, title, imageUrl, price, description) {
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.price = price;
        this.description = description;
    }

    save() {
        if (this.id) { // if the product already exists (id is present)
            getProductsFromFile(products => { // return a callback function with products array from file
                const existingProductIndex = products.findIndex(prod => prod.id === this.id); // find the index of the existing product in the products array   
                const updatedProducts = [...products]; // create a copy of the products array
                updatedProducts[existingProductIndex] = this; // update the product at the found index with the current product instance
                fs.writeFile(p, JSON.stringify(updatedProducts), (err) => { // replace the file with updated products array in JSON format & callback function to handle error
                    console.log(err);  // console.log the error if any error
                });
            }); 
        } else {
            this.id = Math.random().toString(); // generate a random id for the product
            getProductsFromFile((products) => { // return a callback function with products array from file
                products.push(this); // push the new product to products array
                fs.writeFile(p, JSON.stringify(products), (err) => { // replace the file with updated products array in JSON format & callback function to handle error
                    console.log(err);  // console.log the error if any error
                });
            });
        }
    }

    static deleteById(id) {
        getProductsFromFile(products => {
            const product = products.find(prod => prod.id === id);
            const updatedProducts = products.filter(prod => prod.id !== id);
            fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
                if (!err) {
                    console.log('Deleted Successfully');
                    Cart.deleteProduct(id, product.price);
                }   
                else {
                    console.log(err);
                }
            });
        });
    }
  

    static getProducts(callback) {
        getProductsFromFile(callback); // return a callback function with products array from file
    }

    static fetchAll(cb) {
        getProductsFromFile(cb);
    }

    static findById(id, callback) {
        getProductsFromFile((products) => {
            const product = products.find(p => p.id === id);
            callback(product);
        });
    }

}