import 'dotenv/config'
import { knex as setupKnex } from 'knex'

const config = {
  client: 'sqlite',
  connection: {
    filename: process.env.DATABASE_URL || '',
  },
  useNullAsDefault: true,
}

export const knex = setupKnex(config)
