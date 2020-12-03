const { ApolloServer, gql } = require('apollo-server')

const mongoose = require('mongoose')

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
    bookCount: Int,
    id: ID!
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
    allBooks: async (root, args) => {
      if(args.author || args.genre) {
        if(args.author && args.genre) {
          //TODO: also match records containing args.author 
          return await Book.find( { genres: { $in: [args.genre] }} ).populate('author')
        } else if (args.author) {
          //TODO: match books obly written by args.author
          return await Book.find({}).populate('author')
        } else if (args.genre) {
          return await Book.find( { genres: { $in: [args.genre] }} ).populate('author')
        }
      }

      return await Book.find({}).populate('author')
    },
    allAuthors: async () => {
      //TODO: To write concese code
      //TODO: books:[objectId] ids of books written byt THIS author instead of bookCount
      let authors = await Author.find({})
      const books = await Book.find({}).populate('author')
      authors =  authors.map(author => {
        let booksByAuthor = books.filter(book => book.author.name === author.name)
        return { ...author.toJSON(), bookCount: booksByAuthor.length }
      })
      return authors
    },
  },
  Mutation: {
    addBook: async (root, args) => {
      const isNewAuthor = await Author.findOne({ name: args.author })
      if(!isNewAuthor) {
        const newAuthor = new Author({ name: args.author, bookCount: 1 })
        const book = new Book({ ...args, author: newAuthor._id})
        await newAuthor.save()
        return await book.save()
      } else {
        const existingAuthor = isNewAuthor.toJSON()
        const book = new Book({ ...args, author: existingAuthor._id })
        return await book.save()
      }
    },
    editAuthor: async (root, args) => {
      const matchAuthor = await Author.findOne({ name: args.name })
      if(!matchAuthor) {
        return null
      }
      const updatedAuthor = { ...matchAuthor.toJSON(), born: args.setBornTo }
      const res = await Author.findByIdAndUpdate(updatedAuthor._id, updatedAuthor, { new: true })
      return res.toJSON()
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