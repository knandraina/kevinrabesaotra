const express = require("express");
const authRoutes = express.Router();

const Kudu = require('../models/database')

authRoutes.get("/all-data", (req, res, next) => {
    Kudu.find()
        .then(data => {
            //give kudu's number in Africa
            const africaAnimals = data.filter((currentValue, i) => {
                return currentValue.continent === "Africa"
            })
            //give kudu's number in Asia
            const asiaAnimals = data.filter((currentValue, i) => {
                return currentValue.continent === "Asia"
            })

            //give species according to horns in Africa
            var countsAfrica = {}
            africaAnimals.forEach((x) => { countsAfrica[x.horns] = (countsAfrica[x.horns] || 0) + 1; });

            //Number of kudus existing in Africa
            const africaAnimal = data.reduce((total, currentValue, i) => {
                if (currentValue.continent === 'Africa') {
                    return total + 1
                } else {
                    return total
                }
            }, 0)
            //give species according to horns in Asia
            const countsAsia = {}
            asiaAnimals.forEach((x) => { countsAsia[x.horns] = (countsAsia[x.horns] || 0) + 1; });

            //Number of kudus existing in Asia
            const asiaAnimal = data.reduce((total, currentValue, i) => {
                if (currentValue.continent === 'Asia') {
                    return total + 1
                } else {
                    return total
                }
            }, 0)

            //array of unique value of thorns
            //   const uniqueHorns = [...new Set(data.map(x => x.horns))]
            var counts = {};
            data.forEach((x) => { counts[x.horns] = (counts[x.horns] || 0) + 1; });

            return res.status(200).json({ "data": data, "asiaAnimal": asiaAnimal, counts, countsAfrica, countsAsia, asiaAnimals, africaAnimals, africaAnimal })
        })
})

authRoutes.get("/africa-data", (req, res, next) => {
    Kudu.find({ "continent": "Africa" })
        .then(data => {
            return res.status(200).json(data)
        })
})

authRoutes.get("/asia-data", (req, res, next) => {
    Kudu.find({ "continent": "Asia" })
        .then(data => {
            return res.status(200).json(data)
        })
})

authRoutes.get("/all-mudus/:horns", (req, res, next) => {
    Kudu.find({ "horns": req.params.horns })
        .then(data => {
            return res.status(200).json(data)
        })
})

authRoutes.get("/:continent/:horns", (req, res, next) => {
    var continent = req.params.continent.charAt(0).toUpperCase() + req.params.continent.slice(1)
    Kudu.find({ $and: [{ "continent": continent }, { "horns": req.params.horns }] })
        .then(data => {
            var averageHeight = data.reduce((acc, currentValue) => {
                return acc + currentValue.height
            }, 0)
            averageHeight = averageHeight / (data.length + 1)
            var averageWeight = data.reduce((acc, currentValue) => {
                return acc + currentValue.weight
            }, 0)
            averageWeight = averageWeight / (data.length + 1)
            return res.status(200).json({ data, averageHeight, averageWeight })
        })
})

authRoutes.get("/:horns", (req, res, next) => {
    console.log(req.params.horns)
    Kudu.find({"horns" : req.params.horns})
        .then(data => {
            return res.status(200).json(data)
        })
})

module.exports = authRoutes;
