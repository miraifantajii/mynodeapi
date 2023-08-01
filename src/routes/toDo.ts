import { FastifyInstance } from 'fastify'
import { knex } from '../database'
import { z } from 'zod'

export async function toDoRoutes(app: FastifyInstance) {
  app.post('/', async (request) => {
    const createTodoBodySchema = z.object({
      name: z.string(),
      status: z.boolean(),
    })

    const { name, status } = createTodoBodySchema.parse(request.body)
  })

  app.get('/', async () => {
    const list = knex('todo_list').select('*')

    return list
  })
}
