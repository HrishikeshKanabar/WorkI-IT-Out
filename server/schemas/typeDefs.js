// import the gql tagged template function
const { gql } = require("apollo-server-express");




// create our typeDefs
const typeDefs = gql`

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
    workouts(username: String): [Workout]
  }

  type User {
  _id: ID
  username: String
  email: String
  friendCount: Int
  workouts: [Workout]
  friends: [User]
}

  type Query {
  users: [User]
  user(username: String!): User
  workouts(username: String): [Workout]
  workout(_id: ID!): Workout
}
`;

// export the typeDefs
module.exports = typeDefs;
