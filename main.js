const express = require("express");

const app = express();
app.set("view engine", "ejs");
app.use('/public', express.static("public"));

app.get("/", (req, res) => {
    try {
        res.render("index");
    } catch (error) {
        console.log(error);
    }
});

app.listen(8080, () => console.log("Server running on port 8080"));
