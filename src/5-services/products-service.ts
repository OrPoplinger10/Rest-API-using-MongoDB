import { ResourceNotFoundError, ValidationError } from "../2-models/client-errors";
import { IProductModel, ProductModel } from "../2-models/product-model";

// Get all products from database: 
async function getAllProducts(): Promise<IProductModel[]> {
    // // exec runs the query and returns a promise that it accesses the disk
    // return ProductModel.find().exec();

    // Get all products with virtual category object for each product 
    return ProductModel.find().populate("category").exec(); // "category is the virtual field name"
    
}

// Get one product
async function getOneProduct(_id: string): Promise<IProductModel> {
    const product = await ProductModel.findById({_id}).exec();
    if(!product) throw new ResourceNotFoundError(_id);
    return product;

}

// Add product
async function addProduct(product: IProductModel): Promise<IProductModel> {
   const errors = product.validateSync();
   if(errors) throw new ValidationError(errors.message);
    return product.save()

}

// Update product
async function updateProduct(product: IProductModel): Promise<IProductModel> {
    const errors = product.validateSync();
    if(errors) throw new ValidationError(errors.message);
     const updatedProduct = await ProductModel.findByIdAndUpdate(product._id, product, { returnOriginal: false}).exec();
     if(!updateProduct) throw new ResourceNotFoundError(product._id);
     return updatedProduct
    //{ returnOriginal: false} -- > Don't return the original product , but the updated me

}

// Delete product
async function deleteProduct(_id: string): Promise<void> {
    const deleteProduct = await ProductModel.findByIdAndDelete(_id).exec();
   if(!deleteProduct) throw new ResourceNotFoundError(_id);

}

// Get all products from database: 
async function getSomeProducts(): Promise<IProductModel[]> {

     //SELECT name, price FROM products WHERE price = 10
    // return ProductModel.find({ price: 10 }, ["name", "price"]).exec();

    //SELECT name, price FROM products WHERE price = 10
    // return ProductModel.find({ price: 10 }, {_id: false, name: true, price: true }).exec();

    //SELECT _id, name, price FROM products WHERE price = >10 and price <=20
    //Mongo query Language Operators
    // $eq --> Equal
    // $neq --> not equal
    // $lt --> less than
    // $lte --> less than or equal
    // $gt --> greater than
    // $gte --> greater than or equal
    // $or --> Or
    // $and --> AND
    // $regex --> Regex
    // return ProductModel.find({ price: { $gte: 10, $lte: 20  } },["name", "price"] ).exec();

     //SELECT _id, name, price FROM products WHERE price = >10 and price <=20 ORDER BY price
    // return ProductModel.find({ price: { $gte: 10, $lte: 20  } },["name", "price"], {sort: { price: 1 } }).exec();

    //SELECT _id, name, price FROM products WHERE price = >10 and price <=20 ORDER BY price DESC
    // return ProductModel.find({ price: { $gte: 10, $lte: 20  } },["name", "price"], {sort: { price: -1 } }).exec();

        //SELECT _id, name, price FROM products WHERE price = >10 and price <=20 ORDER BY price DESC, name ASC
    // return ProductModel.find({ price: { $gte: 10, $lte: 20  } },["name", "price"], {sort: { price: -1, name: 1 } }).exec();

    //SELECT _id, name, price FROM products WHERE price = < 50 OR name LIKE 'ch%' ORDER by price
    // return ProductModel.find(
    // { name: { $regex: /^ch.*$/i } },
    // { _id: false, name: true, price: true }, 
    // { sort: { price: -1, name: 1 } }).exec();

    // SELECT name, price, categoryId, category FROM products JOIN categorits
    // WHERE categoryId = "id of beverages ORDER BY price"
    return ProductModel.find(
        { categoryId: "5e91e29b9c08fc560ce2cf32" },
        { _id: false, name: true, price: true, categoryId: true },
        {  sort: { price: 1 } }).populate("category").exec();
        
    }                                                               

    
    
 



export default {
    getAllProducts,
    getOneProduct,
    addProduct,
    updateProduct,
    deleteProduct,
    getSomeProducts
 };
