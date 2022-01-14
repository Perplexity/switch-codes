import './pre-start' // Must be the first import
import app from '@server'
import logger from '@shared/Logger'
import { createConnection } from 'typeorm'

// Start the server
const port = Number(process.env.PORT || 3000)
createConnection('default').then(() => {
  app.listen(port, () => {
    logger.info('Express server started on port: ' + port)
  })
})
