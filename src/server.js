import express  from "express";
const app = express();
app.use( express.json())
import categorieController from "./controllers/categories.controller.js"
import subCategoriesController from "./controllers/subCategories.controller.js"
import productsController from "./controllers/products.controller.js"

app.get('/categories', categorieController.GET)
app.get('/categories/:id', categorieController.GETID)
app.post('/categories', categorieController.POST)
app.put('/categories/:id', categorieController.PUT)
app.delete('/categories/:id', categorieController.DELETE)

app.get('/subcategories', subCategoriesController.GET)
app.get('/subcategories/:id', subCategoriesController.GETID)
app.post('/subcategories', subCategoriesController.POST)
app.put('/subcategories/:id', subCategoriesController.PUT)
app.delete('/subcategories/:id', subCategoriesController.DELETE)

app.get('/products', productsController.GET)
app.get('/products/:id', productsController.GETID)
app.post('/products', productsController.POST)
app.put('/products/:id', productsController.PUT)
app.delete('/products/:id', productsController.DELETE)



app.listen(5800, () => console.log('server url: http:localhost:5800'))