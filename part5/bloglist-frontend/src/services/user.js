import axios from 'axios'
const baseUrl = '/api/users'

const getUserById = async (id) => {
  const req = await axios.get(`${baseUrl}/${id}`)
  return req.data
}

export default { getUserById }