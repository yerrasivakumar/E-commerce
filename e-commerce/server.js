import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectdb from './config.js/db.js';
import Routes from './routes/authRoutes.js'
import Product from './routes/productRoutes.js'
import AddCart from './routes/cartRoutes.js'

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


app.get('/', (req, res) => {
    res.send('API is running...');
});


app.listen(5000, () => {
    console.log('Server is running on port 5000');
});