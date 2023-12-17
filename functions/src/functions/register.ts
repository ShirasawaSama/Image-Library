import { app } from '@azure/functions'
import type { HttpRequest, HttpResponseInit, InvocationContext } from '@azure/functions'
import { db, response, signJWT } from './utils'

export async function register (request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  const { username, password } = await request.json() as { username: string, password: string }

  if (!username || !password || username.length < 3 || password.length < 6) return response({ error: 'Invalid name or password' }, 400)

  const user = await db.collection('users').findOne({ username })
  if (user) return response({ error: 'User already exists' }, 409)

  const result = await db.collection('users').insertOne({ username, password })
  if (!result.acknowledged) return response({ error: 'Failed to register' }, 500)

  return response({ token: signJWT({ username }) }, 201)
}

app.http('register', {
  methods: ['PUT'],
  authLevel: 'anonymous',
  handler: register
})
