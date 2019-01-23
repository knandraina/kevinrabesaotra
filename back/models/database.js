const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const fs = require('fs');


const kuduSchema = new Schema({
    name : {type: String, required : true},
    continent : {type : String, required : true},
    weight : {type : Number, required : true},
    height : {type : Number, required : true},
    horns : {type : String, required : true},
    picture : {type: String, required : true}
})

const Kudu = mongoose.model('Kudu', kuduSchema)

// fs.readFile("./data.json", (err, data) => {
//     if (err) throw err;
//     var json = JSON.parse(data)
//     Kudu.create(json, (err, data )=> {
//         console.log("created ", data)
//     })
// })

module.exports = Kudu