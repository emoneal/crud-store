const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Inventory Blueprint

const inventorySchema = new Schema({
    item: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    stock: {
        type: Number,
        require: true
    }

})

module.exports = mongoose.model("inventory", inventorySchema)