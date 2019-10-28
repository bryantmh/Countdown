const { gql } = require('apollo-server')

const typeDefs = gql`
  type GenericResponse {
    success: Boolean
  }

  type Mutation {
    createTime(userId: Int, since: String!, from: String!): Time
    deleteTime(id: Int!): GenericResponse
    createUser(email: String!, hash: String!, username: String!, name: String, role: String): User
    updateUser(id: Int, email: String, hash: String, username: String, name: String, role: String): User
    deleteUser(id: Int!): GenericResponse
  }

  type Query {
    times: [Time]
    time(
      id: Int
    ): Time
    users: [User]
    user(
      id: Int
    ): User
  }

  type Time {
    id: Int!
    userId: Int
    since: String!
    from: String!
    user: User
  }

  type User {
    id: Int!
    email: String!
    hash: String!
    username: String!
    name: String
    role: String
    times: [Time]
  }`

export default typeDefs
