
import {read, write} from "../utils/model.js"


let categorieController = {
  GET: (req, res) => {
    let categories = read('categories')
    let subCategories = read('subCategories')
  
  
    categories.map(categorie => {
      categorie.subCategories = subCategories.filter(subCategorie => subCategorie.category_id == categorie.category_id);
      categorie.subCategories.filter(e => delete e.category_id);
    })
    res.send(categories)
  },
  GETID: (req, res) => {
    let categories = read('categories')
    let subCategories = read('subCategories')
  
    categories.map(categorie => {
      categorie.subCategories = subCategories.filter(subCategorie => subCategorie.category_id == categorie.category_id)
      categorie.subCategories.filter(e => delete e.category_id);
    })
    let { id } = req.params
    let categorie = categories.find(categorie => categorie.category_id == id)
    res.send(categorie)
  },
  POST: (req, res) => {
    let categories = read('categories')
    let { category_name } = req.body
    let newCategory = { category_id: categories.at(-1)?.category_id + 1 || 1, category_name }
    categories.push(newCategory)
    write('categories', categories)
    res.status(201).json({ status: 201, message: "New SubCategory add", data: newCategory })
  },
  PUT: (req, res) => {
    let categories = read('categories')
    let { id } = req.params;
    let { category_name } = req.body;
    let categorie = categories.find(categorie => categorie.category_id == id);
    if (!categorie){
      return res.status(404).json({ status: 404, message: "subcategory was not found" })
    } else {
      categorie.category_name = category_name || categorie.category_name
      write('categories', categories)
      return res.status(200).json({ status: 200, message: "subcategory updated", data: categorie })
    }
  },
  DELETE: (req, res) => {
    let id = req.params
    let categories = read('categories')
    let categorieIndex = categories.findIndex(categorie => categorie.category_id == id)
    if(categorieIndex == -1) {
      let categorie = categories.splice(categorieIndex, 1)
      write('categories', categories)
      return res.status(200).json({status: 200, message : 'user deleted', data:categorie})
    } else {
      return res.status(404).json({status: 404, message: 'user not found'})
    }
  }
  
}

export default categorieController