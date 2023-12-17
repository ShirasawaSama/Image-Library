import { app } from '@azure/functions'
import type { HttpRequest, HttpResponseInit, InvocationContext } from '@azure/functions'
import { db, response, signJWT } from './utils'

export async function login (request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  const { username, password } = await request.json() as { username: string, password: string }

  const user = await db.collection('users').findOne({ username, password })
  if (!user) return response({ error: 'User not found' }, 404)

  return response({ token: signJWT({ username }) })
}

app.http('login', {
  methods: ['POST'],
  authLevel: 'anonymous',
  handler: login
})
