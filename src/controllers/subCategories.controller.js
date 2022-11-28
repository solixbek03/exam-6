import {read, write} from "../utils/model.js"



let subCategoriessController = {
  GET: (req, res) => {
    let subCategories = read('subCategories')
    let products = read('products')

    subCategories.map(subCategories => {
      subCategories.products = products.filter(product => product.sub_category_id == subCategories.sub_category_id);
      subCategories.products.filter(e => delete e.sub_category_id);
    })
    res.send(subCategories)
  },
  GETID: (req, res) => {
    let subCategories = read('subCategories')
    let products = read('products')
  
    subCategories.map(subCategories => {
      subCategories.products = products.filter(product => product.sub_category_id == subCategories.sub_category_id);
      subCategories.products.filter(e => delete e.sub_category_id);
    })
    let { id } = req.params
    let subCategorie = subCategories.find(subCategorie => subCategorie.sub_category_id == id)
    res.send(subCategorie)
  },
  POST : (req, res) => {
    let subcategories = read('subcategories')
    let { category_id, sub_category_name } = req.body
    let newSubCategory = { sub_category_id: subcategories.at(-1)?.sub_category_id + 1 || 1, category_id, sub_category_name }
    subcategories.push(newSubCategory)
    write('subcategories', subcategories)
    res.status(201).json({ status: 201, message: "New SubCategory add", data: newSubCategory })
  },
  PUT: (req, res) => {
    let subcategories = read('subcategories')
    let { id } = req.params;
    let { sub_category_name } = req.body;
    let subcategory = subcategories.find(subcategory => subcategory.sub_category_id == id);
    if (!subcategory){
      return res.status(404).json({ status: 404, message: "subcategory was not found" })
    } else {
      subcategory.sub_category_name = sub_category_name || subcategory.sub_category_name
      write('subcategories', subcategories)
      return res.status(200).json({ status: 200, message: "subcategory updated", data: subcategory })
    }
  },
  DELETE: (req, res) => {
    let id = req.params
    let subCategories = read('subCategories')
    let subCatIndex = subCategories.findIndex(subcat => subcat.sub_category_id == id)
    if(subCatIndex == -1) {
      let subCategorie = subCategories.splice(subCatIndex, 1)
      write('subCategories', subCategories)
      return res.status(200).json({status: 200, message : 'user deleted', data:subCategorie})
    } else {
      return res.status(404).json({status: 404, message: 'user not found'})
    }
  }

}

export default subCategoriessController