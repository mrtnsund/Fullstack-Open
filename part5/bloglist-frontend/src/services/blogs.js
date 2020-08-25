import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}
const getBlog = (id) => {
  const request = axios.get(baseUrl + `/${id}`)
  return request.then(response => response.data)
}
const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}
const addLike = (blog) => {
  blog.likes += 1;
  const response = axios.put(baseUrl + `/${blog.id}`, blog)
  return response.data;
}

export default { getAll, getBlog, addLike, create, setToken }