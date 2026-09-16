require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306
};

app.get("/", (req, res) => {
    res.json({
        message: "Repair Shop API is running successfully"
    });
});

app.get("/health", (req, res) => {
    res.json({
        status: "healthy"
    });
});

app.post("/repair", async (req, res) => {
    const { customerName, vehicle, issue } = req.body;

    if (!customerName || !vehicle || !issue) {
        return res.status(400).json({
            message: "customerName, vehicle and issue are required"
        });
    }

    try {
        const connection = await mysql.createConnection(dbConfig);

        await connection.execute(
            `INSERT INTO repair_requests
            (customer_name, vehicle, issue)
            VALUES (?, ?, ?)`,
            [customerName, vehicle, issue]
        );

        await connection.end();

        res.status(201).json({
            message: "Repair request submitted successfully",
            repairRequest: {
                customerName,
                vehicle,
                issue
            }
        });
    } catch (error) {
        console.error("Database error:", error);

        res.status(500).json({
            message: "Unable to save repair request"
        });
    }
});

async function initializeDatabase() {
    try {
        const connection = await mysql.createConnection(dbConfig);

        await connection.execute(`
            CREATE TABLE IF NOT EXISTS repair_requests (
                id INT AUTO_INCREMENT PRIMARY KEY,
                customer_name VARCHAR(100) NOT NULL,
                vehicle VARCHAR(100) NOT NULL,
                issue TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        await connection.end();

        console.log("Database table initialized successfully");
    } catch (error) {
        console.error("Database initialization failed:", error.message);
    }
}

initializeDatabase();

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Repair Shop API running on port ${PORT}`);
});