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
const bodyParser = require("body-parser");
const app = express();
// const articles = [{ title: 'Example'}];
const Article = require("./public/js/db").Article;
const read = require("node-readability");

app.set("port", process.env.PORT || 3000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded( { extended: true }));
app.use("/css/boostrap.css", express.static('node_modules/bootstrap/dist/css/bootstrap.css'));

app.get("/articles", (req, res, next) => {
    Article.all((err, articles) => {
        if (err) return next(err);
        // res.send(articles);
        res.format({
            html: () => {
                res.render('articles.ejs', { articles: articles });
            },
            json: () => {
                res.send(articles);
            }
        })
    });
});

// app.post("/articles", (req, res, next) => {
//     const article = { tiele: req.body.title };
//     articles.push(article);
//     res.send(article);
// });

app.get("/articles/:id", (req, res, next) => {
    const id = req.params.id;
    Article.find(id, (err, articles) => {
        if (err) return next(err);
        res.send(articles);
    })
    // console.log("Fetching: ", id);
});

app.delete("/articles/:id", (req, res, next) => {
    const id = req.params.id;
    Article.delete(id, (err) => {
        if (err) return next(err);
        res.send({ message: "Deleted"} );
    });
    // console.log("Deleting: " + id);
    // delete articles[id];
    // res.send({ message: "Deleted" });
});

app.post("/articles", (req, res, next) => {
    const url = req.body.url;

    read(url, (err, result) => {
        if (err || !result) res.status(500).send('Error downloading article');

        Article.create(
            { title: result.title, content: result.content },
            (err, article) => {
                if (err) return next(err);
                res.send("OK");
            }
        );
    });
});

app.listen(app.get("port"), () => {
    console.log("App started on port", app.get("port"));
});

module.exports = app;