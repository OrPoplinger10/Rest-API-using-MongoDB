import mongoose from "mongoose";
import { CategoryModel } from "./catgory-model";

// 1. Interface representing our model:
// Inter Face says what is there somewhere in our case is what is in the product:
// extends mongoose.Document - There are many more things in the product that come from here because when I inherit I get everything I inherited from database:
export interface IProductModel extends mongoose.Document {
    // We do not declare the _id because it automatically exists:
    name: string;
    price: number;
    stock: number;
    categoryId: mongoose.Schema.Types.ObjectId;
}


// 2. Schema built on the interface, containing more things:
export const ProductSchema = new mongoose.Schema<IProductModel>({
    name: {
        type: String,
        trim: true,
        unique: true,
        required: [true, "Missing name."],
        minlength: [2, "Name to short."],
        maxlength: [100, "Name to long."],


    },
    price: {
        type: Number,
        required: [true, "Missing price"],
        min: [0, "Price can't bt negative."],
       max: [1000, "Price can't exceed 1000."],
    },
    stock:{
        type: Number,
        required: [true, "Missing stock"],
        min: [0, "Price can't bt negative."],
       max: [1000, "Price can't exceed 1000."],

    },
    categoryId: mongoose.Schema.Types.ObjectId
}, {
    versionKey: false,
    toJSON: { virtuals: true },
    id: false
    
    
});

//Virtual Property
ProductSchema.virtual("category",{
    ref: CategoryModel, // The model object to create --> new CategoryModel(...)
    localField: "categoryId", // in ProductModel Which field belongs to this relation
    foreignField: "_id", // in CategoryModel Which field belongs to this relation
    justOne: true 

})

// 3. Model - the final class:
export const ProductModel = mongoose.model<IProductModel>("ProductModel", ProductSchema, "products"); // Model name, Schema, collection name.
