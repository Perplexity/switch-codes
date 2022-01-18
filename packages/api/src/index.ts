import './pre-start' // Must be the first import
import { createConnection } from 'typeorm'
import app from './Server'

// Start the server
const port = Number(process.env.PORT || 3000)
createConnection('default').then(() => {
  app.listen(port, () => {
    console.info('Express server started on port: ' + port)
  })
})
