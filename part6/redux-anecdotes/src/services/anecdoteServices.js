import axios from 'axios'
const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createAnecdote = async (content) => {
  const newAnecdote = { content, votes: 0}
  const request = await axios.post(baseUrl, newAnecdote)
  return request.data
}

//TODO Update votes in backend

export default { getAll, createAnecdote }