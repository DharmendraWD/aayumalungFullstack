import express from "express";
import "dotenv/config"; //so i can use .env feature
import connectDB from "./database/db.js";
import userRoutes from "./routes/userRoutes.js";
import heroRoutes from "./routes/heroRoutes.js";
import cors from 'cors'
import path from "path";
import { fileURLToPath } from "url";



const app = express();
const PORT = process.env.PORT || 8000;

const allowedOrigins = [
  'https://aayumalun.vercel.app',
  'http://localhost:3000',
];

app.use(
  cors({
    origin: [
      "https://aayumalun.vercel.app",
      "http://localhost:3000"
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);




// middleware 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));


// TO EXPOSE IMAGE WHICH IS IN UPLOADED FOLDER START 
// Get __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Serve uploads folder statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// TO EXPOSE IMAGE WHICH IS IN UPLOADED FOLDER END


// parse urlencoded bodies (for form-data)


// routes 
app.use("/api/admin", userRoutes)
app.use("/api/homepage", heroRoutes)


app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on ports ${PORT}`);
});