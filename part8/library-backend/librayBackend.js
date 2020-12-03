const { ApolloServer, gql } = require('apollo-server')

const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid');

const Author = require('./models/author')
const Book = require('./models/book')

const MONGODB_URI = 'mongodb+srv://fso1920:abhishek@cluster0.rrvky.mongodb.net/Blog_list?retryWrites=true&w=majority'

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`
  type Book {
    title: String!,
    published: Int!,
    author: Author!,
    genres: [String!]!,
    id: ID!
  }

  type Author {
    name: String!,
    born: Int,
    bookCount: Int!,
  }

  type Query {
    bookCount: Int!,
    authorCount: Int!,
    allBooks(author: String, genre: String): [Book!]!,
    allAuthors: [Author!],
  }

  type Mutation {
    addBook(
      title: String!,
      author: String!,
      published: Int!,
      genres: [String!]!
    ) : Book
    editAuthor(
      name: String!,
      setBornTo: Int!,
    ) : Author
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: (root, args) => Book.find({}),
      // ( args.author || args.genre )
      // ? books.filter(book => {
      //   if(args.author && args.genre) {
      //     return args.author === book.author && book.genres.includes(args.genre)
      //   } else if(args.author) {
      //     return args.author === book.author
      //   } else if(args.genre) {
      //     return book.genres.includes(args.genre)
      //   }
      // }) 
      // : books,
    allAuthors: () => Author.find({})
    // authors.map(author => {
    //   let booksByAuthor = books.filter(book => book.author === author.name)
    //   return { ...author, bookCount: booksByAuthor.length }
    // }),
  },
  Mutation: {
    addBook: (root, args) => {
      // const isNewAuthor = books.find(book => book.author === args.author)
      // if(!isNewAuthor) {
      //   authors = authors.concat({
      //     name: args.author,
      //     id: uuidv4()
      //   })
      // }
      const book = new Book({ ...args })
      return book.save()
    },
    editAuthor: (root, args) => {
      const matchAuthor = authors.find(author => author.name === args.name)
      if(!matchAuthor) {
        return null
      }
      let updatedAuthor = { ...matchAuthor, born: args.setBornTo }
      authors = authors.map(author => author.name === args.name ? updatedAuthor: author)
      return updatedAuthor
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})