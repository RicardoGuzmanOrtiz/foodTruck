const { MongoClient, ObjectId } = require('mongodb')
const { url } = process.env.MONGODB_URL || require('./secrets/mongodb.json')

const client = new MongoClient(url)

const getCollection = async (dbName, collectionName) => {
    await client.connect()
    return client.db(dbName).collection(collectionName)
}

module.exports = { getCollection, ObjectId }
