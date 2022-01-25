const { User, Workout } = require('../models');

const resolvers = {
  Query: {
    workouts: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Workout.find(params).sort({ createdAt: -1 });
    },
  }
};
  
module.exports = resolvers;