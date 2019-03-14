let db = require("../models");

module.exports = function(app) {
    app.get("/", function (req, res) {
        db.Burger.findAll({}).then(function (data) {
            res.render("index", { burgers: data });
        });
    });

    app.post("/api/create", function (req, res) {
        // if creator exits, use ID
        // else update db and use new ID
        db.Creator.create({
            creator_name: req.body.creatorName
        })
        .then(function (data) {
            // res.json(data);
            // console.log(data);
            db.Burger.create({
                burger_name: req.body.burgerName,
                CreatorId: data.id
            })
            .then(function (data) {
                res.status(200).end();
            });
        });
    });

    app.put("/api/update/:id", function (req, res) {
        db.Burger.update({
            devoured: true
        }, {
            where: {
                id: req.params.id
            }
        })
        .then(function (data) {
            if(data.changedRows === 0){
                return res.status(404).end();
            }
            res.status(200).end();
        });
    });
};
