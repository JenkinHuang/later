// const express = require("express");
// const app = express();

// const port = process.env.PORT || 3000;

// app.get("/", (req, res) => {
//     res.send("Hello World.");
// });

// app.listen(port, () => {
//     console.log(`Express web app available at localhost: ${port}`);
// });

const express = require("express");
const app = express();
const articles = [{ title: 'Example'}];

app.set("port", process.env.PORT || 3000);

app.get("/articles", (req, res, next) => {
    res.send(articles);
});

app.post("/articles", (req, res, next) => {
    res.send("OK");
});

app.get("/articles/:id", (req, res, next) => {
    const id = req.params.id;
    console.log("Fetching: ", id);
});

app.delete("/articles/:id", (req, res, next) => {
    const id = req.params.id;
    console.log("Deleting: " + id);
    delete articles[id];
    res.send({ message: "Deleted" });
});

app.listen(app.get("port"), () => {
    console.log("App started on port", app.get("port"));
});

module.exports = app;