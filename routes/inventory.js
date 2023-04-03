const express = require("express")
const inventoryRouter = express()
const Inventory = require('../models/inventory.js')

inventoryRouter.route("/")
    .get((req, res, next) => {
        Inventory.find((err, inventory) => {
            if (err) {
                res.status(500)
                return next(err)
            }
            return res.status(200).send(inventory)
            
        })
    })
    
// POST One
    .post((req, res, next) => {
        const newItem = new Inventory(req.body)
        newItem.save((err, savedItem) => {
            if (err) {
                res.status(500)
                return next(err)
            }
            return res.status(201).send(savedItem)    
        })
    })


//DELETE one

inventoryRouter.delete("/:itemId", (req, res) => {
    Inventory.findOneAndDelete({_id: req.params.itemId}, (err, deletedItem) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(`Successfully deleted item ${deletedItem} from the database`)
    })
})

//PUT one
inventoryRouter.put("/:itemId", (req, res, next) => {
    Inventory.findOneAndUpdate(
        { _id: req.params.itemId }, // find this one and update
        req.body, // Update the object with this data
        {new: true}, // Send back updated version
        (err, updatedItem) => {
            if (err) {
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updatedItem)
        }
    )
})

inventoryRouter.get("/:itemId", (req, res, next) => {
    
    
    Inventory.find({_id: req.params.itemId}, (err, foundItem, next) => {
        if (err) {
            res.status(500) 
            return next(err)
        }
        return res.status(200).send(foundItem)
    })

}

)


    module.exports = inventoryRouter