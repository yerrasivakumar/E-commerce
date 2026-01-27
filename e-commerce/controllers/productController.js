import Product from "../models/Product.js";

// Create product
export const createProduct = async (req, res) => {
  try {
    const {
      title,
      price,
      netQuantity,
      unit,
      category,
      image,
      description,
      stock,
      // optional fields
      shelfLife,
      dietaryPreference,
      brandName,
      manufacturer,
      imported,
      countryOfOrigin,
      seller,
      customerCare
    } = req.body;

    // ✅ Only REQUIRED fields validation
    if (!title || !price || !netQuantity || !unit || !category || !image) {
      return res.status(400).json({
        message: "Required fields missing"
      });
    }

    const product = await Product.create({
      title,
      price,
      netQuantity,
      unit,
      category,
      image,

      // optional (only added if sent)
      description,
      stock,
      shelfLife,
      dietaryPreference,
      brandName,
      manufacturer,
      imported,
      countryOfOrigin,
      seller,
      customerCare
    });

    res.status(201).json({
      message: "Product created successfully",
      product
    });

  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message
    });
  }
};



// Get all products
export const getProducts = async (req, res) => {
  try {
    const { search, category } = req.query;
    let filter = {};

    if (search) {
      filter.title = { $regex: search, $options: "i" };
    }

    if (category) {
      filter.category = category;
    }

    const products = await Product.find(filter).sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
// get catergory list
export const getcategorylist = async (req, res) => {
  try {
    const categories = await Product.distinct("category");
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message
    });
  }
};

// Get single product
export const getOneProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Update product
export const updateProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      message: "Product updated successfully",
      updated
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Delete product
export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
