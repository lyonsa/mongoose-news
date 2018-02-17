//Dependencies
var express = require('express');
var path = require('path');
var request = require('request');
var cheerio = require('cheerio');

var router = express.Router();
var db = require("../models");

//Forward '/' route to the '/articles' route
router.get('/', function (req, res) {
    res.redirect('/articles');
});

//Scrape data to database from Nintendo's news site.
router.get("/scrape", function (req, res) {

    request("https://www.nintendo.com/whatsnew#news-articles", function (error, response, html) {

        // Load the HTML into cheerio and save it to a variable
        // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
        var $ = cheerio.load(html);

        // An empty array to save the data that we'll scrape
        var results = [];

        // Delete out old data when scraping.
        if (db.Note){
            db.Note.remove({}, function (err) {
            });
        };
        if (db.Article){
            db.Article.remove({}, function (err) {
            }); 
        }

        // Find the parts of the page I need to pull
        $("ul.news-tiles li").each(function (i, element) {

            var link = "https://www.nintendo.com" + $(element).find("a").attr("href");
            var title = $(element).find("h2").text();
            var pic = $(element).find("img").attr("data-src");
            var desc = $(element).find("p").text();

            // Save these results in an object that we'll push into the results array we defined earlier
            results.push({
                title: title,
                link: link,
                desc: desc,
                pic: pic
            });
        });

        // Log the results once you've looped through each of the elements found with cheerio
        for (var index = 0; index < results.length; index++) {
            var element = results[index];
            db.Article.create(element)
                .then(function (dbArticle) {
                    // View the added result in the console
                    console.log(dbArticle)
                })
                .catch(function (err) {
                    // If an error occurred, send it to the client
                    return res.json(err);
                });
        };

        // Return to home after scrape
        res.redirect('/');
    });
});


// Route for getting all Articles from the db (ie.the home page)
router.get("/articles", function (req, res) {
    // Grab every document in the Articles collection
    db.Article.find().sort({ _id: 1 })
        .populate("notes")
        //send to handlebars
        .exec(function (err, doc) {
            if (err) {
                console.log(err);
            } else {
                var artcl = { article: doc };
                res.render('index', artcl);
            }
        }
    );
});

// Route for grabbing a specific Article by id, populate it with it's note.
// This route was mostly used for debugging.
router.get("/articles/:id", function (req, res) {
    // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
    db.Article.findOne({ _id: req.params.id })
        .populate("notes")
        .then(function (dbArticle) {
            // If we were able to successfully find an Article with the given id, send it back to the client
            res.json(dbArticle);
        })
        .catch(function (err) {
            // If an error occurred, send it to the client
            console.log(err)
            res.json(err);
        });
});

// Route for saving/updating an Article's associated Note
router.post("/articles/:id", function (req, res) {
    console.log(req.body)

    // Create a new note and pass the req.body to the entry
    db.Notes.create(req.body)
        .then(function (dbNote) {

            // If a Note was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Note
            // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
            // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
            return db.Article.findOneAndUpdate({ _id: req.params.id }, { $push: { notes: dbNote._id }}, { new: true });
        })
        .then(function (dbArticle) {
            // If we were able to successfully update an Article, send it back to the client
            res.json(dbArticle);
        })
        .catch(function (err) {
            console.log(err)
            
            // If an error occurred, send it to the client
            res.json(err);
        });
});

router.delete("/notes/:id", function (req, res) {
    db.Notes.remove({_id: req.params.id})
    .catch(function (err){
        console.log(err)
    })
})

module.exports = router;