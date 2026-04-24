const express = require("express");
const session = require("express-session");
const path = require("path");

const authRoutes = require("./routes/auth.routes");
const studentRoutes = require("./routes/student.routes");

const logger = require("./middleware/logger.middleware");
const errorHandler = require("./middleware/error.middleware");

const app = express();

app.use(express.json());

app.use(session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: true
}));

app.use(express.static(__dirname));

app.use(logger);

app.get("/", (req, res) => {
    res.json({ message: "Student API OK" });
});

app.use("/", authRoutes);
app.use("/students", studentRoutes);

// SYNC
app.get("/heavy-sync", (req, res) => {
    const start = Date.now();
    while (Date.now() - start < 3000) {}
    res.json({ message: "Sync done" });
});

// ASYNC
app.get("/heavy-async", async (req, res) => {
    await new Promise(r => setTimeout(r, 3000));
    res.json({ message: "Async done" });
});

app.use(errorHandler);

app.listen(3000, () => {
    console.log("Server chạy tại port http://localhost:3000");
});