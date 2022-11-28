import {read, write} from "../utils/model.js"

let productsController = {
  GET: (req, res) => {
    let products = read('products')
    let { subCategoryId, model, price, color, product_name } = req.query
    
    let filteredProduct = products.filter(product => {
      let bySubId = subCategoryId ? product.sub_category_id == subCategoryId : true
      let byModel = model ? product.model == model : true
      let byColor = color ? product.color == color : true
      let byPrice = price ? product.price == price : true
      let byName = product_name ? product.product_name == product_name : true
  
      return bySubId && byModel && byColor && byPrice && byName
    })
  
    if (filteredProduct.length) {
      return res.send( filteredProduct )
    } else {
      res.status(404).json({ status: 404, message: "product not found" })
    }
  },
  GETID: (req, res) => {
    let products = read('products')
    let { productId } = req.params
    let product = products.find(product => product.product_id == productId)
    res.send( product )
  },
  POST:(req, res) => {
    let products = read('products')
    let { sub_category_id, model, product_name, color, price } = req.body
    let newProduct = { product_id: products.at(-1)?.product_id + 1 || 1, sub_category_id, model, product_name, color, price }
    products.push(newProduct)
    write('products', products)
    res.status(201).json({ status: 201, message: "product added", data: newProduct })
  },
  PUT: (req, res) => {
    let products = read('products')
    let { id } = req.params;
    let { productName, price } = req.body;
    let product = products.find(product => product.product_id == id);
    if (!product){
      return res.status(404).json({ status: 404, message: "product was not found" })
    } else {
      product.product_name = productName || product.product_name
      product.price = price || product.price
      write('products', products)
      return res.status(200).json({ status: 200, message: "product updated", data: product })
    }
  },
  DELETE: (req, res) => {
    let products = read('products')
    let { id } = req.params
    let productIndex = products.findIndex(product => product.product_id == id)
    if (productIndex != -1) {
      let product = products.splice(productIndex, 1)
      write('products', products)
      return res.status(200).json({ status: 200, message: "product deleted", data: product })
    } else {
      return res.status(404).json({ status: 404, message: "product not found" })
    }
  }

}

export default productsController