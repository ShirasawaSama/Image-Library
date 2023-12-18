import { HttpHandler, app } from '@azure/functions'
import { ObjectId } from 'mongodb'
import { db, blob, response, getUsername } from '../utils'

export const httpTrigger: HttpHandler = async (req) => {
  const id = req.params.id
  if (!id) return response({ error: 'Missing id' }, 400)

  const username = getUsername(req)
  if (!username) return response({ error: 'Unauthorized' }, 401)

  const data = await db.collection('images').deleteOne({ _id: new ObjectId(id), username })
  if (!data.deletedCount) return response({ error: 'Image not found' }, 404)

  await blob.getBlockBlobClient(id).deleteIfExists()

  return response({ success: true })
}


app.http('delete-image', {
  methods: ['DELETE'],
  authLevel: 'anonymous',
  handler: httpTrigger,
  route: 'image/{id}'
})
