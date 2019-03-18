let db = require("../models");

module.exports = function(app) {
    app.get("/", function (req, res) {
        // db.Burger.findAll({}).then(function (data) {
        //     res.render("index", { burgers: data });
        // });
        db.Burger.findAll({
            where: {},
            include: [
                { model: db.Creator },
                { model: db.Customer }
            ]
        }).then(function(data) {
            // console.log(data);
            res.render("index", { burgers: data });
        });

    });

    app.post("/api/create", function (req, res) {
        // check if creator already exist, use ID if so
        // else insert ne creator in DB and use the new ID
        db.Creator.findOne({
            where: { creator_name: req.body.creatorName }
        }).then(function(data) {
            // console.log(data);
            if(data){
                db.Burger.create({
                    burger_name: req.body.burgerName,
                    CreatorId: data.id
                })
                .then(function (burgerData) {
                    res.json(burgerData).end();
                });
            }
            else {
                db.Creator.create({
                    creator_name: req.body.creatorName
                })
                .then(function (creatorData) {
                    // res.json(data);
                    // console.log(data);
                    db.Burger.create({
                        burger_name: req.body.burgerName,
                        CreatorId: creatorData.id
                    })
                    .then(function (burgerData) {
                        res.json(burgerData).end();
                    });
                });
            }
        });

    });

    app.put("/api/update/:id", function (req, res) {
        db.Customer.create({
            customer_name: req.body.customerName
        })
        .then(function (customerData) {
            db.Burger.update({
                devoured: true,
                CustomerId: customerData.id
            }, {
                where: {
                    id: req.params.id
                }
            })
            .then(function (burgerData) {
                res.json(burgerData).end();
            });
        });
    });
};
