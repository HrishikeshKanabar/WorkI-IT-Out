// import the gql tagged template function
const { gql } = require("apollo-server-express")


// create our typeDefs
const typeDefs = gql`

type User {
  _id: ID
  username: String
  email: String
  friendCount: Int
  workout: [Workout]
  friends: [User]
}

type Workout {
  _id: ID
  workoutText: String
  createdAt: String
  username: String
  reactionCount: Int
  reactions: [Reaction]
}

type Reaction {
  _id: ID
  reactionBody: String
  createdAt: String
  username: String
}

type Query {
  me: User
  users: [User]
  user(username: String!): User
  workouts(username: String): [Workout]
  workout(_id: ID!): Workout
}

type Auth {
  token: ID!
  user: User
}

type Mutation {
  login(email: String!, password: String!): Auth
  addUser(username: String!, email: String!, password: String!): Auth
}
`;

// export the typeDefs
module.exports = typeDefs;
