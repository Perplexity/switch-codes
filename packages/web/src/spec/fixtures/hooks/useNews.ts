import moment from 'moment'
import { NewsState } from '../../../slices/newsSlice'

export const getUseNewsData = (loading: boolean = false): NewsState => {
  return {
    loading,
    news: loading
      ? []
      : [
          {
            id: 1,
            title: 'Welcome',
            content: 'Hello and welcome to the website, this is just a test.',
            timestamp: moment().subtract(5, 'minutes').toDate()
          }
        ]
  }
}
