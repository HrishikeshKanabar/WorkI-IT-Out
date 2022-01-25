const { User, Workout } = require('../models');

const resolvers = {
  Query: {
    workouts: async () => {
      return Workout.find().sort({ createdAt: -1 });
    }
  }
};
  
module.exports = resolvers;