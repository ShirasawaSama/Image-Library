import { app } from '@azure/functions'
import type { HttpRequest, HttpResponseInit, InvocationContext } from '@azure/functions'
import { db, blob, response, getUsername } from '../utils'

export async function upload (request: HttpRequest): Promise<HttpResponseInit> {
  const username = getUsername(request)
  if (!username) return response({ error: 'Unauthorized' }, 401)

  const data = await request.formData()
  const file = data.get('file')!
  if (typeof file === 'string') return response({ error: 'Invalid file' }, 400)
  if (!file.size) return response({ error: 'Missing file' }, 400)
  if (file.size > 1024 * 1024 * 5) return response({ error: 'File too large' }, 400)
  const ext = file.name.split('.').pop()!.toLowerCase() || 'png'

  const randomId = Date.now().toString(36) + Math.random().toString(36).slice(2)
  await blob.getBlockBlobClient(`${randomId}.${ext}`).uploadData(await file.arrayBuffer())

  await db.collection('images').insertOne({
    username,
    title: data.get('title') || '',
    details: data.get('details') || '',
    file: `${process.env.StorageBaseUrl}images/${randomId}.${ext}`,
    createdAt: new Date()
  })

  return response({ success: true })
}

app.http('upload', {
  methods: ['PUT'],
  authLevel: 'anonymous',
  handler: upload
})
