import { AppDataSource } from "./DBconfigs/data-source"
import { createServer } from '@graphql-yoga/node'
import { importSchema } from 'graphql-import'
import { resolvers } from './resolvers'
import { join } from 'path'

const typeDefs = importSchema(join(__dirname,"schema.graphql"))

// Provide your schemyarna
const server = createServer({
    schema: {
      typeDefs: typeDefs,
      resolvers: resolvers
    },
  })

AppDataSource.initialize().then(() =>{
  // Start the server and explore http://localhost:4000/graphql
  server.start()
})
  


/*
AppDataSource.initialize().then(async () => {

    console.log("Inserting a new user into the database...")
    const user = new User()
    user.firstName = "Timber"
    user.lastName = "Saw"
    user.age = 25
    await AppDataSource.manager.save(user)
    console.log("Saved a new user with id: " + user.id)

    console.log("Loading users from the database...")
    const users = await AppDataSource.manager.find(User)
    console.log("Loaded users: ", users)

    console.log("Here you can setup and run express / fastify / any other framework.")

}).catch(error => console.log(error))
*/
