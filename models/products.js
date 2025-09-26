const products = [];
const fs = require('fs');
const path = require('path');

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
    constructor(title, imageUrl, price, description) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.price = price;
        this.description = description;
    }

    save() {
        this.id = Math.random().toString(); // generate a random id for the product
        getProductsFromFile((products) => { // return a callback function with products array from file
            products.push(this); // push the new product to products array
            fs.writeFile(p, JSON.stringify(products), (err) => { // replace the file with updated products array in JSON format & callback function to handle error
                console.log(err);  // console.log the error if any error
            });
        });
    }

    static getProducts(callback) {
        getProductsFromFile(callback); // return a callback function with products array from file
    }

    static getProductById(id, callback) {
        getProductsFromFile((products) => {
            const product = products.find(p => p.id === id);
            callback(product);
        });
    }

}