import { app, output } from '@azure/functions'
import type { HttpRequest, HttpResponseInit, InvocationContext } from '@azure/functions'
import { db, response, getUsername } from './utils'

const randomId = Date.now().toString(36) + Math.random().toString(36).slice(2)
const blobOutput = output.storageBlob({
  path: 'images/' + randomId + '.png',
  connection: 'StorageConnectionAppSetting'
})

export async function upload (request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  const username = getUsername(request)
  if (!username) return response({ error: 'Unauthorized' }, 401)

  const data = await request.formData()
  const file = data.get('file')!
  if (typeof file === 'string') return response({ error: 'Invalid file' }, 400)

  context.extraOutputs.set(blobOutput, await file.arrayBuffer())
  // db.collection('images').insertOne({
  //   username,
  //   title: data.get('title') || '',
  //   details: data.get('details') || '',
  //   file: 
  // })

  return response({ success: true })
}

app.http('upload', {
  methods: ['PUT'],
  authLevel: 'anonymous',
  extraOutputs: [blobOutput],
  handler: upload
})
