import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    price: {
      type: Number,
      required: true,
    },
     netQuantity: {
    type: Number, // 250, 500, 1, 3
    required: true
  },

  unit: {
    type: String, // g, kg, ml, l, pcs
    enum: ["g", "kg", "ml", "l", "pcs"],
    required: true
  },
    category: String,
    image: String,
    stock: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);


export default mongoose.model("Product", productSchema);