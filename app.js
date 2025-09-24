const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded

app.use((req, res, next) => { 
  next();  // allow the request to continue to the next middleware
});

app.use('/add-product', (req, res, next) => { 
  res.send('<form action="/product" method="POST"><input type="text" name="title"><button type="submit">Add Product</button></form>'); // send a response to the client
});
app.post('/product', (req, res, next) => {
    console.log(req.body);
    res.redirect('/');
});

app.use('/', (req, res, next) => { 
  res.send('<h1>Hello from Express!</h1>'); // send a response to the client
});

app.listen(3000)
