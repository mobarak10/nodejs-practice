const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
// const {engine} = require('express-handlebars');
const app = express();
const errorController = require('./controllers/error');

const sequelize = require('./util/database');
const User = require('./models/user');
const Product = require('./models/product');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');
const Order = require('./models/order');
const OrderItem = require('./models/order-item');

// app.engine("hbs", engine({ extname: ".hbs", defaultLayout: 'main-layout', layoutsDir: 'views/layouts/' }));
// app.set('view engine', 'pug');
app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');


app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findByPk(1)
    .then(user => {
        req.user = user;
        next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.pageNotFound);

Product.belongsTo(User, {constraints: true, onDelete: 'CASCADE'});
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, {through: CartItem});
Product.belongsToMany(Cart, {through: CartItem});
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, {through: OrderItem});

sequelize
    // .sync({force: true}) // {force: true} drops and recreates the table every time the app is run
    .sync() // creates the table if it doesn't exist (doesn't drop it if it already exists)
    .then(result => {
        return User.findByPk(1);
        // console.log(result);
    })
    .then(user => {
        if (!user) {
            return User.create({name: 'Mobarak', email: 'mobarak@test.com'});
        }
        return user;
    })
    .then(user => { 
        console.log(user);
        app.listen(3005);
    })
    .catch(err => {console.log(err)}
);
