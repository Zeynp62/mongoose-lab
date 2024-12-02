require('dotenv').config()
const prompt = require('prompt-sync')()
console.log(`Welcome to the CRM!`)
console.log(`What would you like to do?\n`)
console.log(
  `1. Create a customer\n2. View all customers\n3. Update a customer\n4. Delete a customer\n5. quit`
)

const mongoose = require('mongoose')
const Todo = require('./models/customer')
const connect = async () => {
  await mongoose.connect(process.env.MONGODB_URI)
  console.log('connected')
  await runQueries()

  await mongoose.disconnect()
  process.exit()
}

const checkInput = async () => {
  let userChoice = ''
  userChoice = prompt('What is your choice?') // Move the prompt inside the function
  if (userChoice === '3') {
    console.log('Below is a list of customers:')
    const todos = await Todo.find()
    console.log('All: ', todos)
    const idInput = prompt(
      'Copy and paste the id of the customer you would like to update here:'
    )
    const newName = prompt("What is the customer's new name?")
    const newAge = prompt("What is the customer's new age?")
    const updatedTodo = await Todo.findByIdAndUpdate(idInput, {
      name: newName,
      age: newAge
    })
  } else if (userChoice === '2') {
    const todos = await Todo.find({})
    console.log('All customers:', todos)
  } else if (userChoice === '5') {
    mongoose.connection.close()
  } else if (userChoice === '1') {
    const todoData = {
      name: 'Zainab',
      age: 21
    }
    const todo = await Todo.create(todoData)
    console.log('New todo:', todo)
  } else if (userChoice === '4') {
    const idToRemove = prompt('Enter the customer id you want to remove: ')
    const removedTodo = await Todo.findByIdAndDelete(idToRemove)
  }
}
const createCustomer = async () => {
  const todoData = {
    name: 'Zainab',
    age: 21
  }
  const todo = await Todo.create(todoData)
  console.log('New todo:', todo)
}
const runQueries = async () => {
  await checkInput()
}

connect()
