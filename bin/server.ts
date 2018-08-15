import { app } from '../server/app'

const runServer = async () => {
  app.listen(process.env.PORT, () => {
    console.log(`Server listening on ${process.env.PORT}`)
  })
}

runServer()
  .catch(e => console.log(e))
