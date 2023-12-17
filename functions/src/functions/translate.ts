import { HttpHandler, app } from '@azure/functions'
import { db, response } from './utils'
import { ObjectId } from 'mongodb'
import axios from 'axios'

const translate = async (text: string) => axios.post(
  'https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&to=en',
  [{ text }],
  {
    headers: {
      'Ocp-Apim-Subscription-Key': process.env.TranslatorKey,
      'Ocp-Apim-Subscription-Region': process.env.TranslatorRegion || 'eastus',
      'Content-type': 'application/json'
    },
    responseType: 'json'
  }
).then(res => res.data[0].translations[0].text)

const httpTrigger: HttpHandler = async (req, ctx) => {
  const id = req.params.id

  const data = await db.collection('images').findOne({ _id: new ObjectId(id) })
  if (!data) return response({ error: 'Image not found' }, 404)

  return response({
    details: data.details ? await translate(data.details) : '',
  })
}


app.http('translate', {
  methods: ['GET'],
  authLevel: 'anonymous',
  handler: httpTrigger,
  route: 'translate/{id}'
})
