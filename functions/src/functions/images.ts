import { HttpHandler, app, input } from '@azure/functions'
import { CosmosClient } from '@azure/cosmos'

const client = new CosmosClient(process.env.CosmosDbConnectionString!).database('ImageLibrary')

const httpTrigger: HttpHandler = async (req, ctx) => {
  // Query data from Cosmos DB, with pagination and search
  const query = req.query
  const continuation = query.get('continuation')
  const search = query.get('search') || ''

  const queryIterator = client.container('images').items
    .query({
      query: `SELECT * FROM c WHERE CONTAINS(c.title, @search)`,
      parameters: [{ name: '@search', value: search }],
    }, { enableScanInQuery: true, maxItemCount: 10, continuationToken: continuation || undefined })

  const { resources: items, requestCharge, continuationToken, hasMoreResults } = await queryIterator.fetchNext();

  // Return the results
  return {
    status: 200,
    body: {
      items,
      requestCharge,
      continuation: hasMoreResults ? continuationToken : undefined
    } as any
  }
}


app.http('images', {
  methods: ['GET'],
  authLevel: 'anonymous',
  handler: httpTrigger
})
