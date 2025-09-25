const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
// const {engine} = require('express-handlebars');
const app = express();
const errorController = require('./controllers/error');

// app.engine("hbs", engine({ extname: ".hbs", defaultLayout: 'main-layout', layoutsDir: 'views/layouts/' }));
// app.set('view engine', 'pug');
app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.pageNotFound);

app.listen(3005)
