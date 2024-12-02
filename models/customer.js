const mongoose = require('mongoose')
const customerSchema = new mongoose.Schema({
  name: String,
  age: Number
})

const Todo = mongoose.model('Todo', customerSchema)

module.exports = Todo
