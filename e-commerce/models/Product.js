import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    // 🔹 Basic Info
    title: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      trim: true
    },

    category: {
      type: String,
      required: true
    },

    image: {
      type: String,
      required: true
    },

    // 🔹 Pricing & Quantity
    price: {
      type: Number,
      required: true
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

    stock: {
      type: Number,
      default: 0
    },

    // 🔹 Product Attributes
    isNatural: {
      type: Boolean,
      default: true // 100% natural
    },

    brandName: {
      type: String,
      default: "Fresh-Fruits"
    },

    manufacturer: {
      type: String,
      default: "Local"
    },

    imported: {
      type: Boolean,
      default: false // yes / no
    },

    dietaryPreference: {
      type: String,
      enum: ["veg", "non-veg"],
      default: "veg"
    },

    shelfLife: {
      type: String ,// e.g. "7 days", "1 month"
       default :"4days"
    },

    countryOfOrigin: {
      type: String,
      default: "India"
    },

    // 🔹 Seller Details
    seller: {
      name: {
        type: String,
        default : "Jaisriram"
        
      },
      address: {
        type: String,
        default : "kothavalasa"
      },
      licenseNo: {
        type: String,
         default : "710222982220"
      }
    },

    // 🔹 Customer Care
   customerCare: {
  phone: {
    type: String,
    default: "+91630172269"
  },
  email: {
    type: String,
    default: "freshfruits@gmail.com"
  }
},
    disclaimer: {
      type: String,
      default:
        "Images shown are for representation purposes only. Actual product may vary."
    }
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
