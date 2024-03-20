import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";


const productsCollection = "products";

const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  thumbnails: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
});

ProductSchema.plugin(mongoosePaginate);

export const productsModel = mongoose.model(productsCollection, ProductSchema);