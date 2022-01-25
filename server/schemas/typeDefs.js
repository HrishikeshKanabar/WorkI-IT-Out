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
}

type Query {
        workouts:[Workout]
}`;

    


// export the typeDefs
module.exports = typeDefs;
