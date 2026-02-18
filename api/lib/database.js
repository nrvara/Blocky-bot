const { CosmosClient } = require("@azure/cosmos");

// Use environment variables for connection
// For local development, these can be set in local.settings.json
const endpoint = process.env.COSMOS_DB_ENDPOINT || "https://localhost:8081";
const key = process.env.COSMOS_DB_KEY || "C2y6yDjf5/R+ob0N8A7Cgv30VRDJIWEHLM+4QDU5DE2nQ9nDuVTqobD4b8mGGyPMbIZnqyMsEcaGQy67XIw/Jw==";
const databaseId = "BlockyBotDB";

const client = new CosmosClient({ endpoint, key });

async function initDatabase() {
    const { database } = await client.databases.createIfNotExists({ id: databaseId });
    // Containers: Schools, Users (Teachers/Students are users with roles)
    // Schools container: partition key /id
    await database.containers.createIfNotExists({ id: "Schools", partitionKey: "/id" });
    // Users container: partition key /schoolId (to query all users in a school efficiently)
    await database.containers.createIfNotExists({ id: "Users", partitionKey: "/schoolId" });

    return database;
}

module.exports = {
    client,
    databaseId,
    initDatabase
};
