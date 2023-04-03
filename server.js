const express = require("express")
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')

// Middleware (every request) //
app.use(express.json()) // Looks for a request body
app.use(morgan('dev')) // Logs requests to server

// Connect to DB

mongoose.connect('mongodb://localhost:27017/crudstoredb',{useNewUrlParser: true})
.then(()=> console.log("Connected to MongoDB"))
.catch(err => console.error(err));

// Routes //
app.use("/crudstore", require("./routes/inventory.js"))


// Error Handler

app.use((err, req, res, next) => {
    console.log(err)
    return res.send({errMsg: err.message})
})


// Server Listen //

app.listen(9000, () => {
    console.log ("The server is running on Port 9000")
})
