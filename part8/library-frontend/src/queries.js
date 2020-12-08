import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name,
      born,
      bookCount
    }
  }
`

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    title,
    author {
      name
    }
    published,
    genres 
  }
`

export const ALL_BOOKS = gql`
  query allBooks($author: String, $genre: String) {
    allBooks(
      author: $author
      genre: $genre
    ) {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`

export const ADD_BOOK = gql`
  mutation createBook( $title: String!, $published: Int!, $author: String!, , $genres: [String!]! ) {
    addBook(
      title: $title,
      published: $published,
      author: $author,
      genres: $genres
    ) {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`

export const UPDATE_BORN = gql`
  mutation editBorn( $name: String!, $born: Int! ) {
    editAuthor(
      name: $name,
      setBornTo: $born
    ) {
      name,
      born
    }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(
      username: $username
      password: $password
    ) {
      value
      fgenre
    }
  }
`