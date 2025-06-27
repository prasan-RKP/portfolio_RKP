import express from "express";
import Contact from "../model/contactModel.js";

const router = express.Router();

// console.log("Defining POST /submit-review");
router.post("/submit-review", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    console.log("📥 Incoming data:", { name, email, message });

    if (!name || !email || !message) {
      //console.log("❌ Missing fields");
      return res.status(400).json({ msg: "Please fill in all required fields" });
    }

    if (message.length < 200) {
      //console.log("❌ Message too short");
      return res.status(400).json({ msg: "Message must be at least 200 characters long" });
    }

    const existingUser = await Contact.findOne({ email });
    //console.log("🔍 Existing user:", existingUser);

    if (existingUser) {
      return res.status(400).json({ msg: "You have already posted a review" });
    }

    const newUser = new Contact({ name, email, message });
    const savedUser = await newUser.save();

    //console.log("✅ Review saved:", savedUser);

    return res.status(201).json({
      _id: savedUser._id,
      name: savedUser.name,
      email: savedUser.email,
      message: savedUser.message,
    });

  } catch (error) {
    console.error("❌ Internal Server Error:", error);
    return res.status(500).json({ msg: "Internal Server Error", error: error.message });
  }
});



//console.log("Defining GET /fetch-review");
router.get("/fetch-review", async (req, res) => {
  try {
    const reviews = await Contact.find({});
    if (!reviews || reviews.length === 0) {
      return res.status(404).json({ msg: "No reviews found" });
    }
    return res.status(200).json(reviews);
  } catch (error) {
    return res.status(500).json({ msg: "Internal Server Error" });
  }
});

export default router;
//grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 mt-16" style="opacity: 1;transform: none;overflow-x: scroll;
