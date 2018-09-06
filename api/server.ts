import { app } from './app'

const port = process.env.API_PORT

const runServer = async () => {
  app.listen(port, () => {
    console.log(`Server listening on ${port}`)
  })
}

runServer()
  .catch(e => console.log(e))
