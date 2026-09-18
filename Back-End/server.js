const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = require('./user');
const Worker = require('./worker');
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;
const Booking=require("./BookingDetails")

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("MongoDB connection error:", err));

app.use(cors());
app.use(express.json());

//Login user
app.post('/loginUser', async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(401).send("Invalid Credentials");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return res.status(401).send("Invalid Credentials");
    }

    res.send("Login success");
});

// Login Worker
app.post('/loginWorker', async (req, res) => {
    const { email, password } = req.body;

    const worker = await Worker.findOne({ email });

    if (!worker) {
        return res.status(401).send("Invalid Credentials");
    }

    const isMatch = await bcrypt.compare(password, worker.password);

    if (!isMatch) {
        return res.status(401).send("Invalid Credentials");
    }

    res.json({
        message: "Login successful",
        data: { email: worker.email }
    });
});


// Register User
app.post('/register', async (req, res) => {
    const { name, email, password, address, pincode, district, mobileno, telephoneno } = req.body;

    if (!name || !email || !password) {
        return res.status(400).send("All fields are required");
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            address,
            pincode,
            district,
            mobileno,
            telephoneno
        });

        await newUser.save();

        res.send(`Welcome, ${name}!`);
        console.log("User created:", name, email);

    } catch (err) {
        if (err.code === 11000) {
            res.status(400).send("Email already exists");
        } else {
            console.error(err);
            res.status(500).send("Server error");
        }
    }
});

//register worker
app.post('/addworker', async (req, res) => {
    const {
        name,
        email,
        password,
        address,
        district,
        pincode,
        categoryOfWork,
        yearOfExperience
    } = req.body;

    if (!name || !email || !password || !address || !district ||
        !pincode || !categoryOfWork || !yearOfExperience) {
        return res.status(400).send("All fields are required");
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const newWorker = new Worker({
            name,
            email,
            password: hashedPassword,
            address,
            district,
            pincode,
            categoryOfWork,
            yearOfExperience
        });

        await newWorker.save();

        res.send(`Worker ${name} added successfully`);

    } catch (error) {
        console.error("Add Worker Error:", error);
        res.status(500).send("Server Error");
    }
});


// Update Worker Profile by Email (updated)
app.put('/updateworker/:id', async (req, res) => {
    try {
        const updatedWorker = await Worker.findOneAndUpdate(
            { email: req.params.id }, // ✅ match by email
            req.body,
            { new: true }
        );
        if (!updatedWorker) {
            return res.status(404).send("Worker not found");
        }
        res.json(updatedWorker);
    } catch (error) {
        console.error("Error updating worker:", error);
        res.status(500).send("Server Error");
    }
});


app.get("/bookingdata/:id",async (req,res)=>{
    try{
    const data= await Booking.find({workeremail:req.params.id});
    console.log("Data fetched : ",data)
    res.json(data)
    }
    catch(err){
        console.log(err)
    }
    
})

    
app.put("/workerbook/:email/:emailW", async (req, res) => {
    try {
      const { email, emailW } = req.params;
  
      // Find the worker by their email
      const worker = await Worker.findOne({ email: emailW });
      if (!worker) return res.status(404).json({ message: "Worker not found" });
    
      // Find the user by their email
      const user = await User.findOne({ email }); // adjust model if you have one
      if (!user) return res.status(404).json({ message: "User not found" });
    
      // Create and save booking using user details and worker email
      const newBooking = new Booking({
        name: user.name,
        email: user.email,
        phone: user.mobileno,
        address: user.address,
        district: user.district,
        pincode: user.pincode,
        workeremail: emailW
      });
    
      await newBooking.save();
      res.status(200).json({ message: "Booking successful", booking: newBooking });
    
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });



// Get Worker Profile by Email (updated)
app.get('/worker/:id', async (req, res) => {
    try {
        const worker = await Worker.findOne({ email: req.params.id }); // ✅ use email instead of ObjectId
        if (!worker) {
            return res.status(404).json({ message: 'Worker not found' });
        }
        res.json(worker);
    } catch (err) {
        console.error("Error fetching worker:", err);
        res.status(500).json({ message: 'Error fetching worker details' });
    }
});

app.get('/workers/:type', async (req, res) => {
    const { type } = req.params;
    const Workers = await Worker.find({ categoryOfWork: type });
    res.json(Workers); // Always send 200
  });


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
