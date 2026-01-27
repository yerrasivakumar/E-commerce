import Order from '../models/Order.js';
import Cart from '../models/Cart.js';
import Product from '../models/Product.js';
import User from '../models/User.js'
import {sendOrderPlacedMail} from '../utils/nodemailer.js'
export const placeOrder = async (req, res) => {
  try {
    const { userId, address, paymentMethod } = req.body;

    // 🔹 Get User
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 🔹 Get Cart
    const cart = await Cart.findOne({ userId }).populate("items.productId");
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }
console.log("CART ITEMS 👉", cart.items);
    // 🔹 Prepare Order Items
    const orderItems = cart.items.map(item => ({
      productId: item.productId._id,
      quantity: item.quantity,
      price: item.productId.price,
    }));

    // 🔹 Calculate Total
    const totalAmount = orderItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    // 🔹 Deduct Stock
    for (let item of cart.items) {
      await Product.findByIdAndUpdate(item.productId._id, {
        $inc: { stock: -item.quantity },
      });
    }

    // 🔹 Create Order
    const order = await Order.create({
      userId,
      items: orderItems,
      address,
      totalAmount,
      paymentMethod,
     
    });

  

    // 🔹 Clear Cart
    await Cart.findOneAndUpdate({ userId }, { items: [] });

    res.status(201).json({
      message: "Order placed successfully",
      orderId: order._id,
    });
  // 🔹 Prepare Email Items (THIS WAS MISSING)
const emailItems = cart.items.map(item => ({
  name: item.productId.title,   // ✅ FIXED
  quantity: item.quantity,
  price: item.productId.price,
  total: item.productId.price * item.quantity,
}));

const formattedAddress = `
${address.phone}<br/>
${address.city}, ${address.state} - ${address.pincode}
${address.adressLine}<br/>
`;
    // 🔹 SEND EMAIL (CORRECT)
    await sendOrderPlacedMail(user.email, {
      name: user.name,
      orderId: order._id,
      items: emailItems,
      totalAmount,
      address :formattedAddress,
    });
  } catch (error) {
    console.error("ORDER ERROR 👉", error); // 🔥 IMPORTANT
    res.status(500).json({ message: "Internal server error" });
  }
};


export const getorderHistory = async (req, res) => {
  try {
    const { userId } = req.params;

    // 1️⃣ Check user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    // 2️⃣ Get order history for this user
    const orderHistory = await Order.find({ userId });

    res.status(200).json({
      message: "Order history fetched successfully",
      data: orderHistory
    });

  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message
    });
  }
};

//admin get orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("userId", "name email mobileNumber")
      .populate("items.productId", "name price");

    res.status(200).json({
      message: "All orders fetched",
      data: orders,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
//admin status update
export const getOrdersByStatus = async (req, res) => {
  try {
    const { status } = req.params; // Pending / Completed / Rejected

    const orders = await Order.find({ status })
      .populate("userId", "name email")
      .populate("items.productId", "name price");

    res.status(200).json({
      message: `${status} orders fetched`,
      data: orders,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
//admin status updated
export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body; // Completed or Rejected

    if (!["Received", "Cancel"].includes(status)) {
      return res.status(400).json({
        message: "Invalid status update",
      });
    }

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = status;
    await order.save();

    res.status(200).json({
      message: `Order ${status} successfully`,
      data: order,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
