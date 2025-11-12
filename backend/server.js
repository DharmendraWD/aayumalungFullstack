import express from "express";
import "dotenv/config"; //so i can use .env feature
import connectDB from "./database/db.js";
import userRoutes from "./routes/userRoutes.js";
import heroRoutes from "./routes/heroRoutes.js";
import cors from 'cors'


const app = express();
const PORT = process.env.PORT || 8000;

app.use(
  cors({
    origin: 'http://localhost:3000', // your Next.js frontend
    credentials: true,               // allow cookies or Authorization headers
  })
)

// middleware 
app.use(express.json());

// routes 
app.use("/api/admin", userRoutes)
app.use("/api/homepage", heroRoutes)


app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
});