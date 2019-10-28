import typeDefs from './schema'
import resolvers from './resolvers'
import models from './models'

const { ApolloServer } = require('apollo-server')
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: { models }
})

const GRAPHQL_PORT = 3000

server.listen(GRAPHQL_PORT).then(({ url }) => {
  console.log(
    `GraphQL server is now running at ${url}`
  )
}).catch(e => console.error(e))
