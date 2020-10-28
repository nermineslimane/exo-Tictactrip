const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const config = require("config");
// util functions
const justify = require("./utils/justify");
const secToMidnight = require("./utils/secToMidnight");
// to store user in case token lost
const users = require("./db/users");

// get jwt secret from defaul configuration
const jwtSecret = config.get("jwt.secret");

const port = 3000;

//app.use(bodyParser.urlencoded({ extended: true }));
// enabling body parser for json and text format
app.use(bodyParser.json());
app.use(bodyParser.text());

// just to test
app.get("/", (req, res) => {
    res.send("Hello World!");
});

/**
 * method POST
 *
 */

// middleware to verify token and limit
const auth = (req, res, next) => {
    console.log(req.headers["x-token"]);
    const token = req.headers["x-token"];

    jwt.verify(token, jwtSecret, (err, decoded) => {
        console.log(decoded);
        if (err) return res.status(400).send("token invalide");
        email = decoded.data.email;
        let user = users.find((u) => u.email === email);
        if (!user) return res.status(500).send("user db error");

        if (user.limit < 80000) {
            req.email = email;
            user.limit += req.body.length;
            users.map((u) => (user.email === u.email ? user : u));
            next();
        } else
            return res.status(400).send("limit reached!!! Paiment is required");
    });
};

app.post("/api/justify", auth, (req, res) => {
    console.log(req.body);

    result = justify(req.body, 80);

    res.send(result);
});

// give a user new token
app.post("/api/token", (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).send("email is requiered");
    let user = users.find((u) => u.email === email);
    if (!user) users.push({ email, limit: 0, date: Date.now() });
    const token = jwt.sign({ data: { email } }, jwtSecret, {
        expiresIn: secToMidnight(),
    });
    res.json(token);
});




app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
