import type { HttpRequest, HttpResponseInit } from "@azure/functions"
import { MongoClient } from 'mongodb'
import jsonwebtoken from 'jsonwebtoken'

export const response = (body: object, status?: number, headers: HeadersInit = {}): HttpResponseInit => ({
  status,
  headers: {
    'Content-Type': 'application/json',
    ...headers
  } as any,
  body: JSON.stringify(body)
})

export const db = new MongoClient(process.env.CosmosDbConnectionString!).db('ImageLibaray')

export const signJWT = (payload: object) => jsonwebtoken.sign(payload, process.env.CosmosDbConnectionString!, { expiresIn: '7d' })
export const getUsername = (req: HttpRequest) => {
  const token = req.headers.get('Authorization')?.replace('Bearer ', '')
  if (!token) return null
  return (jsonwebtoken.verify(token, process.env.CosmosDbConnectionString!) as { username: string })?.username || null
}
