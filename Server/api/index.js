require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const PORT = 3001;
const session = require("express-session");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const OAuth2Strategy = require("passport-google-oauth2").Strategy;
const bcrypt = require("bcryptjs");
const userModel = require("./models/users");
const Contact = require("./models/contactform");

mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error", err));

// Middleware
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: "GET,POST,PUT,DELETE",
//     credentials: true,
//   })
// );

app.use(
  cors({
    origin: ["https://resume-builder-frontend-murex.vercel.app/"],
    methods: ["GET","POST","PUT","DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
// setup session
app.use(
  session({
    secret: "jwt-secret-key",
    resave: false,
    saveUninitialized: true,
  })
);

// setuppassport
app.use(passport.initialize());
app.use(passport.session());

// JWT Middleware
// const verifyUser = (req, res, next) => {
//   const token = req.cookies.token;
//   if (!token) return res.json("Token not available");

//   jwt.verify(token, "jwt-secret-key", (err, decode) => {
//     if (err) return res.json("Invalid token");
//     next();
//   });
// };

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "No token" });

  try {
    const decoded = jwt.verify(token, "jwt-secret-key");
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};

// Google Strategy
passport.use(
  new OAuth2Strategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID || GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      scope: ["profile", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await userModel.findOne({ googleId: profile.id });

        if (!user) {
          user = new userModel({
            googleId: profile.id,
            displayName: profile.displayName,
            email: profile.emails[0].value,
            image: profile.photos[0].value,
          });

          await user.save();
        }

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  const user = await userModel.findById(id);
  done(null, user);
});

// initial google ouath login
// app.get(
//   "/auth/google",
//   passport.authenticate("google", { scope: ["profile", "email"] })
// );

// app.get(
//   "/auth/google/callback",
//   passport.authenticate("google", {
//     successRedirect: "http://localhost:3000/home",
//     failureRedirect: "http://localhost:3000/login",
//   })
// );

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "http://localhost:3000/login" }),
  async (req, res) => {
    try {
      const user = req.user;
      const token = jwt.sign(
        { id: user._id, email: user.email },
        "jwt-secret-key",
        { expiresIn: "1d" }
      );

      res.cookie("token", token, {
        httpOnly: true,
        sameSite: "Lax",
        secure: false,
      });

      res.redirect("http://localhost:3000/home");
    } catch (error) {
      console.error("Google login error:", error.message);
      res.redirect("http://localhost:3000/login");
    }
  }
);


// 1
// app.get("/login/success",async(req,res)=>{
//     if(req.user){
//         res.status(200).json({message:"user Login",user:req.user})
//     }else{
//         res.status(400).json({message:"Not Authorized"})
//     }
// })

app.get("/login/success", async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "No token found" });

    const decoded = jwt.verify(token, "jwt-secret-key");
    const user = await userModel.findById(decoded.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({
      message: "User login success",
      user: {
        name: user.name,
        email: user.email,
        image: user.image || "",
      },
    });
  } catch (err) {
    console.error("Login success error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// PROTECTED ROUTE
app.get("/home", verifyUser, (req, res) => {
  res.json("Success - Protected Route Accessed");
});

//Local Login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ status: "error", message: "No User found" });
    }

    if (!user.password) {
      return res
        .status(400)
        .json({ status: "error", message: "Account registered via Google" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ status: "error", message: "Incorrect password" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      "jwt-secret-key",
      {
        expiresIn: "1d",
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "Lax",
      secure: false,
    });

    return res.json({
      status: "success",
      user: {
        displayName: user.name,
        image: user.image || "",
      },
    });
  } catch (err) {
    console.error("Login error:", err.message);
    return res.status(500).json({ status: "error", message: "Server error" });
  }
});

// LOCAL REGISTER
app.post("/register", async (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) return res.status(409).json("User already exists");

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new userModel({
      firstname,
      lastname,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.json("User registered successfully");
  } catch (err) {
    console.error("Registration error:", err.message);
    res.status(500).json("Registration failed");
  }
});

// contact feedback
app.post("/api/contact", async (req, res) => {
  try {
    console.log("Incoming body:", req.body);

    // Use the imported Contact model
    const contact = new Contact(req.body);
    await contact.save();

    res.status(201).json({
      message: "Contact saved successfully",
      contactId: contact._id,
    });
  } catch (error) {
    console.error("Save error:", error);
    res.status(500).json({
      error: "Internal Server Error",
      details: error.message,
    });
  }
});

app.get("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("http://localhost:3000");
  });
});

app.listen(PORT, () => {
  console.log(`server start at port no ${PORT}`);
});
