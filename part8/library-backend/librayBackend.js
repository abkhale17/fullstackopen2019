const { ApolloServer, gql, UserInputError, AuthenticationError } = require('apollo-server')
const jwt = require('jsonwebtoken')

const mongoose = require('mongoose')

const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')

const MONGODB_URI = 'mongodb+srv://fso1920:abhishek@cluster0.rrvky.mongodb.net/Blog_list?retryWrites=true&w=majority'

const JWT_SECRET = 'weatherBOI'
console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

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
    me: User
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
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
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
    me: (root, args, context) => context.currentUser,
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser
      if(!currentUser) {
        throw new AuthenticationError('not authenticated')
      }
      const isNewAuthor = await Author.findOne({ name: args.author })

      if(!isNewAuthor) {
        const newAuthor = new Author({ name: args.author, bookCount: 1 })
        const book = new Book({ ...args, author: newAuthor._id})
        try {
          await newAuthor.save()
          await book.save()
          return book
        } catch(error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
      } else {
        try {
          const existingAuthor = isNewAuthor.toJSON()
          const book = new Book({ ...args, author: existingAuthor._id })
          await book.save()
          return { ...book, author: { name: args.author }}
        } catch(error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
      }
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser
      if(!currentUser) {
        throw new AuthenticationError('not authenticated')
      }
      try {
        const matchAuthor = await Author.findOne({ name: args.name })
        if(!matchAuthor) {
          return null
        }
        const updatedAuthor = { ...matchAuthor.toJSON(), born: args.setBornTo }
        await Author.findByIdAndUpdate(updatedAuthor._id, updatedAuthor, { new: true })
        return updatedAuthor
      } catch(error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },
    createUser: (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })
  
      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne( { username: args.username })
      // password kept same for all users for sake of simplicity
      if( !user || args.password !== 'secret' ) {
        throw new UserInputError('wrong credentials')
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if(auth && auth.toLocaleLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )

      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})