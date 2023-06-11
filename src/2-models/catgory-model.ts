import mongoose from "mongoose"
import { ProductSchema } from "./product-model";

// 1. InterFace
export interface ICategoryModel extends mongoose.Document {

    name: string;
    description: string;

}

// 2. Schema
export const CategorySchema = new mongoose.Schema<ICategoryModel>({

    name: {
        type: String,
        required:[true, "Missing name"],
        minlength: [3, "Name to short"],
        maxlength: [30, "Name too long"],
        trim: true,
        unique: true

    },
    description: {
        type: String,
        required:[true, "Missing description"],
        minlength: [10, "Description to short"],
        maxlength: [1000, "Description too long"]
    }
}, {
    versionKey: false

});


// 3. Model:
export const CategoryModel = mongoose.model<ICategoryModel>("CategoryModel", CategorySchema, "categories")

