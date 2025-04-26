const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    // Common field
    email: { type: String, unique: true, required: true },

    // Local authentication fields
    firstname: String,
    lastname: String,
    password: String, // only for local auth

    // Google OAuth fields
    googleId: String,
    displayName: String,
    image: String

}, { timestamps: true })

const User = mongoose.model("users", userSchema)
module.exports = User
