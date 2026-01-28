import Wishlist from "../models/Wishlist.js";

export const toggleWishlist = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    const exists = await Wishlist.findOne({ userId, productId });

    if (exists) {
      // Remove from wishlist
      await Wishlist.findByIdAndDelete(exists._id);
      return res.json({
        message: "Removed from wishlist",
        inWishlist: false,
      });
    }

    // Add to wishlist
    await Wishlist.create({ userId, productId });

    res.json({
      message: "Added to wishlist",
      inWishlist: true,
    });

  } catch (error) {
    // Handle duplicate key error safely
    if (error.code === 11000) {
      return res.status(409).json({ message: "Already in wishlist" });
    }

    res.status(500).json({ message: "Server error", error });
  }
};


export const getWishlist = async (req, res) => {
  try {
    const { userId } = req.params;

    const wishlist = await Wishlist.find({ userId })
      .populate("productId");

    res.json(wishlist);

  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const removeWishlistItem = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    await Wishlist.findOneAndDelete({ userId, productId });

    res.json({ message: "Wishlist item removed" });

  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

