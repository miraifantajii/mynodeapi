import 'dotenv/config'
import fastify from 'fastify'
import { toDoRoutes } from './routes/toDo'

const app = fastify()

app.register(toDoRoutes, {
  prefix: 'todos',
})

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('http server running...')
  })
