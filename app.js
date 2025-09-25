const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
// const {engine} = require('express-handlebars');
const app = express();

// app.engine("hbs", engine({ extname: ".hbs", defaultLayout: 'main-layout', layoutsDir: 'views/layouts/' }));
// app.set('view engine', 'pug');
app.set('view engine', 'ejs');
app.set('views', 'views');

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminData.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
    res.status(404).render('404', { pageTitle: 'Page Not Found', path: req.url });
    // res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

app.listen(3005)
