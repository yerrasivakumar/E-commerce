import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectdb from './config.js/db.js';
import Routes from './routes/authRoutes.js'
import Product from './routes/productRoutes.js'
import AddCart from './routes/cartRoutes.js'
import Orders from './routes/orderRoutes.js'
import Address from './routes/address.js'
import wishlistRoutes from './routes/wishlistRoutes.js'
dotenv.config()
const  app = express()

app.use(express.json())
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Body Parser (Built-in)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectdb();
app.use("/uploads", express.static("uploads"));
app.use('/api/auth', Routes);
app.use('/api/product', Product);
app.use('/api/cart', AddCart);
app.use('/api/order', Orders);
app.use('/api/address', Address);
app.use("/api/wishlist", wishlistRoutes);

app.get('/', (req, res) => {
    res.send('API is running...');
});

// app.post("/send-mail", async (req, res) => {
//   try {
//     const { to,name} = req.body;

//     if (!to) {
//       return res.status(400).json({ message: "Mail is required" });
//     }

//     await sendMail({ to ,name});

//     res.status(200).json({ message: "Mail sent successfully" ,name});
//   } catch (error) {
//     res.status(500).json({
//       message: "Failed to send mail",
//       error: error.message,
//     });
//   }
// });







app.listen(5000, () => {
    console.log('Server is running on port 5000');
});