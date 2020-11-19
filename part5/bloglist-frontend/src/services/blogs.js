import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = ( newToken ) => {
  token = newToken
}

const create = async (newObj) => {
  const config = {
    headers: { Authorization : `Bearer ${token}` },
  }

  try {
    const response = await axios.post(baseUrl, newObj, config)
    return response.data
  } catch(exception) {
    console.log(exception)
  }
}

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const update = (id, newObj) => {
  const request =  axios.put(`${baseUrl}/${id}`, newObj)
  return request.then(res => res.data)
}

const deleteBlog = (id) => {
  const config = {
    headers: { Authorization : `Bearer ${token}` },
  }

  const request = axios.delete(`${baseUrl}/${id}`, config)
  return request
}

export default { getAll, setToken, create, update, deleteBlog }