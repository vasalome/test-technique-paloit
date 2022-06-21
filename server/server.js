const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express()
const PORT = 8000

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());

app.use(cors({}));

mongoose
  .connect('mongodb://mongo:27017/db', { useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err))

const Product = require('./src/model/Product');

app.get('/', (req, res) => res.status(200).send('Hello World!'));

/**
 ** CRUD Routes
 */

/** Get all Products */
app.get('/products', async (req, res) => {
  console.log('Get all Products')
  let products;
  try {
    products = await Product.find()
  } catch (err) { res.status(404).send('Products not found') }
  res.json({ status: 201, data: products });
});

/** Get Product by id */
app.get('/products/id/:id', async (req, res) => {
  const id = req.params.id;
  console.log('Get Product: '+id)
	let products;
	try {
		products = await Product.findById(id)
	} catch (err) { res.status(404).send('Product not found') }
	res.json({ status: 201, data: products });
});

/** Get all Products by city */
// app.get('/products/city/:city', async (req, res) => {
app.get('/products/city', async (req, res) => {
  const city = req.query.city.split(',');
  console.log('Get all Products from: '+city)
  let products;
	try {
		products = await Product.find()
    products = products.filter((item) => city.includes(item.prodCity))
	} catch (err) { res.status(404).send('Products not found') }
	res.json({ status: 201, data: products });
});

/** Create new Product */
app.post('/products/add', async (req, res) => {
  console.log('Create new Product')
  const newItem = new Product({
    prodName: req.body.prodName,
    prodCity: req.body.prodCity,
    prodPrice: req.body.prodPrice,
  })
  try {
		await newItem.save()
      .then(item => res.status(201).json({ status: 201, data: item }))
	} catch (err) { res.status(500).send('Creation failed') }
});

/** Update Product */
app.patch('/products/patch/:id', async (req, res) => {
  const id = req.params.id;
  console.log('Update Product: '+id)

  let product;
  try {
    product = await Product.findById(id);
  } catch (err) { res.status(500).send('Could not find the product') }

  if (req.body.prodName) product.prodName = req.body.prodName;
  if (req.body.prodCity) product.prodCity = req.body.prodCity;
  if (req.body.prodPrice) product.prodPrice = req.body.prodPrice;

  try {
    await product.save();
  } catch (err) { res.status(500).send('Could not update the product') }

  res.status(200).json({ status: 200, data: product.toObject({ getters: true }) })
});

/** Delete Product */
app.delete('/products/delete/:id', async (req, res) => {
  const id = req.params.id;
  console.log('Delete Product: '+id)

  let product;
  try {
      product = await Product.findById(id);
  } catch (err) { res.status(500).send('Could not find the product to delete') }

  if (!product) { res.status(404).send('Could not find the product for this id') }

  try {
      await product.remove()
        .then(item => res.status(200).json({ status: 200, message: "Product: deleted!", deleted: item }))
  } catch (err) { res.status(500).send('Could not delete the product') }
});

/** Error 404: Route not found */
app.use((req, res) => {
  res.status(404).send('Please enter a valid route')
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}!`))