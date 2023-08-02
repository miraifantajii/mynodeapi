import { FastifyInstance } from 'fastify'
import { knex } from '../database'
import { z } from 'zod'

export async function toDoRoutes(app: FastifyInstance) {
  app.post('/', async (request, reply) => {
    const createTodoBodySchema = z.object({
      name: z.string(),
      status: z.boolean(),
    })

    const { name, status } = createTodoBodySchema.parse(request.body)

    await knex('todo_list').insert({
      name,
      status,
    })

    return reply.status(200).send()
  })

  app.get('/', async () => {
    const list = knex('todo_list').select('*')

    return list
  })

  app.delete('/:id', async (request, reply) => {
    const deleteTodoParamsSchema = z.object({
      id: z.string().transform(Number),
    })
    const { id } = deleteTodoParamsSchema.parse(request.params)

    const todo = await knex('todo_list').count({
      id,
    })

    if (todo.length > 0) {
      await knex('todo_list')
        .where({
          id,
        })
        .first()
        .del()
    }

    return reply.status(200).send()
  })

  app.patch('/:id', async (request, reply) => {
    const updateTodoParamsSchema = z.object({
      id: z.string().transform(Number),
    })

    const updateTodoBodySchema = z.object({
      name: z.string(),
      status: z.boolean(),
    })

    const { id } = updateTodoParamsSchema.parse(request.params)

    const { name, status } = updateTodoBodySchema.parse(request.body)

    const todo = await knex('todo_list').count({
      id,
    })

    if (todo.length > 0) {
      await knex('todo_list')
        .where({
          id,
        })
        .update({
          name,
          status,
        })
    }

    return reply.status(200).send()
  })
}
