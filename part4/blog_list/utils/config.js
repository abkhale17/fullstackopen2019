require('dotenv').config()

const PORT = process.env.PORT
const MONGODB_URI = `mongodb+srv://fso1920:abhishek@cluster0.rrvky.mongodb.net/Blog_list?retryWrites=true&w=majority`

module.exports = {
  MONGODB_URI,
  PORT
}