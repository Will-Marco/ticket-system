import express from 'express';
import dotenv from 'dotenv';
import routes from './src/routes/index.js';
import connectDB from './src/config/db.js';

const app = express();
dotenv.config();
connectDB();

app.use(express.json());

app.use('/api', routes());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server has been started on  port ${PORT}`);
});
