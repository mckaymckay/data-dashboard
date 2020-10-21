import axios from 'axios'
export default function request (arg) {
  return axios({
    ...arg,
    baseURL: 'http://127.0.0.1:5000/api/v1.0'
  })
}
