require("dotenv").config();
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const connectDB = require("./server/config/db");
const session = require("express-session");
const passport = require("passport");
const MongoStore = require("connect-mongo");
const methodOverride = require("method-override");

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to the database
connectDB();

// Express session middleware
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI, // Ensure this environment variable is correctly named and set
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // Equals 24
    }
  })
);

// Initialize Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
// Static files
app.use(express.static("public"));

// Templating engine setup
app.use(expressLayouts);
app.set("view engine", "ejs");
app.set("layout", "./layouts/main"); // Specify the layout file

// Routes
app.use("/", require("./server/routes/dashboard"));
app.use("/", require("./server/routes/auth"));
app.use("/", require("./server/routes/index"));

// 404 Error handling
app.get("*", (req, res) => {
  res.status(404).render("404");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
