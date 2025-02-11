const express = require("express");
const path = require("path");
const session = require("express-session");
const app = express();
const port = 3000;


app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: "qelsi-sekret",
    resave: false,
    saveUninitialized: true
}));


const users = [];


function isAuthenticated(req, res, next) {
    if (req.session.user) {
        return next();
    }
    res.redirect("/login");
}


app.get("/", (req, res) => {
    res.render("index");
});

app.get("/courses", isAuthenticated, (req, res) => {
    res.render("courses");
});

app.get("/signup", (req, res) => {
    res.render("signup");
});

app.post("/signup", (req, res) => {
    const { username, password } = req.body;
    users.push({ username, password });
    res.redirect("/login");
});

app.get("/login", (req, res) => {
    res.render("login");
});

app.post("/login", (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        req.session.user = username;
        res.redirect("/courses");
    } else {
        res.send("Te dhenat e paskata");
    }
});

app.get("/logout", (req, res) => {
    req.session.destroy(() => {
        res.redirect("/");
    });
});

app.listen(port, () => {
    console.log(`Serveri po punon ne http://localhost:${3000}`);
});
