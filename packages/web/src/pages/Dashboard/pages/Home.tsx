import moment from 'moment'
import { useNews } from '../../../hooks/news'

const Home = () => {
  const news = useNews()
  return (
    <div className="p-4 w-full">
      <h1 className="text-3xl font-bold pb-4">News & announcements</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {
          news.news.map(article =>
            <div key={`article-${article.id}`} className='flex flex-col basis-full bg-white shadow-lg drop-shadow-lg rounded p-6 gap-1'>
              <div className='flex justify-end'>
                <span className='text-sm text-gray-400'>{moment(article.timestamp).fromNow()}</span>
              </div>
              <h2 className="text-xl font-medium">{article.title}</h2>
              <p>{article.content}</p>
            </div>
          )
        }
      </div>
    </div >
  )
}

export default Home
