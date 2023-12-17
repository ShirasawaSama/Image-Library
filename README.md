# Image Library

## Azure Services

- [Azure Functions](https://azure.microsoft.com/en-us/services/functions/)
- [Azure Cosmos DB](https://azure.microsoft.com/en-us/services/cosmos-db/)
- [Azure Storage](https://azure.microsoft.com/en-us/services/storage/)

## Frontend - React

### Prerequisites

- [Node.js](https://nodejs.org/en/download/)

### Setup

1. Install dependencies

```bash
npm install
```

2. Build the app

```bash
npm run build
```

## Backend - Azure Functions

### Prerequisites

- [Azure Functions Core Tools](https://docs.microsoft.com/en-us/azure/azure-functions/functions-run-local?tabs=windows%2Ccsharp%2Cbash#v2)
- [Node.js](https://nodejs.org/en/download/)
- [Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli?view=azure-cli-latest)

### Setup

1. Install dependencies

```bash
npm install
```

2. Login to Azure

```bash
az login
```

3. Create a resource group

```bash
az group create --name <resource-group-name> --location <location>
```

4. Create a storage account

```bash
az storage account create --name <storage-account-name> --location <location> --resource-group <resource-group-name> --sku Standard_LRS
```

5. Create a function app

```bash
az functionapp create --resource-group <resource-group-name> --consumption-plan-location <location> --runtime node --runtime-version 12 --functions-version 3 --name <function-app-name> --storage-account <storage-account-name>
```

6. Upload the function code

```bash
cd functions

func azure functionapp publish <function-app-name>
```

7. Set the environment variables

```bash
az functionapp config appsettings set --name <function-app-name> --resource-group <resource-group-name> --settings STORAGE_ACCOUNT_NAME=<storage-account-name> STORAGE_ACCOUNT_KEY=<storage-account-key>
```

Environment variables:

- `STORAGE_ACCOUNT_NAME`: The name of the storage account
- `STORAGE_ACCOUNT_KEY`: The access key of the storage account
- `CosmosDbConnectionString`: The connection string of the Cosmos DB account
- `StorageConnectionAppSetting`: The connection string of the storage account
- `StorageBaseUrl`: The base URL of the blob storage

8. Set the CORS policy

```bash
az functionapp cors add --name <function-app-name> --resource-group <resource-group-name> --allowed-origins '*'
```

9. Configure the Cosmos DB

```bash
az cosmosdb create --name <cosmos-db-name> --resource-group <resource-group-name> --kind GlobalDocumentDB --locations regionName=<location> failoverPriority=0 isZoneRedundant=False
```

10. Create a database

```bash
az cosmosdb sql database create --account-name <cosmos-db-name> --resource-group <resource-group-name> --name ImageLibrary
```

11. Create a container

```bash
az cosmosdb sql container create --account-name <cosmos-db-name> --resource-group <resource-group-name> --database-name ImageLibrary --name images
```

12. Configure the Azure Blobs to allow public access

```bash
az storage account create --name <storage-account> --resource-group <resource-group> --kind StorageV2 --location <location> --allow-blob-public-access true
```

13. Create a storage container with public access

```bash
az storage container create --name <container-name> --account-name <account-name> --resource-group <resource-group> --public-access true --account-key <account-key>
```

## Author

Shirasawa

## License

[AGPL-3.0](https://www.gnu.org/licenses/agpl-3.0.en.html)
