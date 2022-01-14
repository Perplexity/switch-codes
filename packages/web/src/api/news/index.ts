import axios from 'axios'

const getNews = () => {
  return axios.get('/news')
}

export default { getNews }
