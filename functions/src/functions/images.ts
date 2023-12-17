import { HttpHandler, app } from '@azure/functions'
import { db } from './utils'

const httpTrigger: HttpHandler = async (req, ctx) => {
  // Query data from Cosmos DB, with pagination and search
  const query = req.query
  const page = +query.get('page')! || 1
  const search = query.get('search') || ''
  const username = query.get('username') || ''

  const searchObj: Record<string, any> = { }
  if (search) searchObj['title'] = { $regex: search, $options: 'i' }
  if (username) searchObj['username'] = username
  const data = await db.collection('images').find(searchObj)
    .sort({ _id: -1 })
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
