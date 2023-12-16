import { HttpHandler, app, input } from '@azure/functions'
import { MongoClient } from 'mongodb'

const client = new MongoClient(process.env.CosmosDbConnectionString!)

const httpTrigger: HttpHandler = async (req, ctx) => {
  // Query data from Cosmos DB, with pagination and search
  const query = req.query
  const page = +query.get('page')! || 1
  const search = query.get('search') || ''

  const data = await client.db('ImageLibaray').collection('images').find(search ? { title: { $regex: search, $options: 'i' } } : {})
    .skip((page - 1) * 10).limit(10).toArray()

  return {
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }
}


app.http('images', {
  methods: ['GET'],
  authLevel: 'anonymous',
  handler: httpTrigger
})
