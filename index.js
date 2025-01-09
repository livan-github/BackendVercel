require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./db');
const mongoose = require('mongoose');
const User = require('./models/User'); // Asegúrate de que este modelo esté correctamente definido.

const app = express();

// Conexión a MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:5173', "https://frontend-vercel-ashy.vercel.app"] // Cambiar luego a la URL de producción
}));

// Ruta base
app.get("/", (req, res) => {
  res.send("Server deployed and running on vercel.");
});
app.get("/test-db", async (req, res) => {
  try {
    const isConnected = mongoose.connection.readyState === 1; // 1 = conectado
    if (isConnected) {
      res.status(200).json({ message: "Database connected successfully" });
    } else {
      res.status(500).json({ message: "Database not connected" });
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Error checking DB connection", error });
  }
});

// Ruta para crear un usuario
app.post("/api/users", async (req, res) => {
  try {
    const { name, email } = req.body;

    // Validar datos
    if (!name || !email) {
      return res.status(400).json({ message: "Name and email are required." });
    }

    // Crear un nuevo usuario
    const newUser = new User({ name, email });
    await newUser.save();

    res.status(201).json({ message: "User created successfully.", user: newUser });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

// Ruta para obtener todos los usuarios
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find(); // Recuperar todos los usuarios de la base de datos
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

// Puerto
const port = process.env.PORT || 9000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
