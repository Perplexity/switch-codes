import axios from 'axios'

export const getNews = () => {
  return axios.get('/news')
}
