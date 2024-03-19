const express = require("express");
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const User = require("./models/UserModel")
const cors = require("cors");
const Attendance = require("./models/Attendance");
const authMiddleware = require("./middlewares/authMiddleware");
require("dotenv").config();
// const path = require("path")

const app = express();
app.use(express.static(path.join(__dirname,"frontend","build")))
app.use(bodyParser.json());

app.use(cors())


mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true, useUnifiedTopology:
        true
}).then(() => console.log(" mongoDB connected")).catch(err => {
    console.log("Error connecting Database", err);
})


//backend functions

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"frontend","build","index.html"))
})

app.post("/api/register", async (req, res) => {

    try {
        const { username, password, role } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword, role });
        await user.save();
        res.json({ message: "Registration Succesfull" })
    } catch (error) {
        console.log("Registration error", error);
        res.status(500).json({ error: "failed Registration" })

    }
})


//login
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if the user exists
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        // Compare the provided password with the hashed password stored in the database
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        // If username and password are correct, generate a JWT token
        const token = jwt.sign({ id: user._id, username: user.username, role: user.role }, 'your_secret_key', { expiresIn: '1h' });

        // Send the token and user information (you can customize the response as needed)
        res.json({ token, user: { id: user._id, username: user.username, role: user.role } });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.post('/api/attendance/mark', authMiddleware, async (req, res) => {
    try {
        const { date, status } = req.body;

        // Check if attendance record already exists for the given date
        const existingAttendance = await Attendance.findOne({ date: date, userId: req.user.id });
        if (existingAttendance) {
            return res.status(400).json({ error: 'Attendance already marked for this date' });
        }

        // If no existing attendance record, save a new one
        const attendance = new Attendance({ date, status, userId: req.user.id });
        await attendance.save();
        res.json({ message: 'Attendance marked successfully' });
    } catch (error) {
        console.error('Attendance marking error:', error);
        res.status(500).json({ error: 'Attendance marking failed' });
    }
});


app.get('/api/attendance', authMiddleware, async (req, res) => {

    try {
        const userId = req.user.id;
        const attendanceRecords = await Attendance.find({ userId });
        res.json(attendanceRecords);
    } catch (error) {
        console.error('Error fetching attendance records:', error);
        res.status(500).json({ error: 'Failed to fetch attendance records' });
    }
});

app.get('/api/user', authMiddleware, async (req, res) => {


    try {
        // Retrieve user details based on JWT token
        const userId = req.user.id; // Assuming userId is stored in req.user.userId after authentication

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        console.error('Error fetching user details:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
);

app.get('/api/attendanceRecord', async (req, res) => {
    try {
        const attendance = await Attendance.find();
        res.json(attendance);
    } catch (error) {
        console.error('Error fetching attendance records:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/api/attendance/:id', async (req, res) => {
    const { status } = req.body;
    const { id } = req.params;

    try {
        const attendance = await Attendance.findByIdAndUpdate(id, { status }, { new: true });
        res.json(attendance);
    } catch (error) {
        console.error('Error updating attendance record status:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("Server running...!");
})