const { User, Workout } = require('../models');

const resolvers = {
  Query: {
    workouts: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Workout.find(params).sort({ createdAt: -1 });
    },
    workout: async (parent, { _id }) => {
      return Workout.findOne({ _id });
    },
      // get all users
      users: async () => {
        return User.find()
          .select('-__v -password')
          .populate('friends')
          .populate('workouts');
      },
      // get a user by username
      user: async (parent, { username }) => {
        return User.findOne({ username })
          .select('-__v -password')
          .populate('friends')
          .populate('workouts');
      },
  }
};
  
module.exports = resolvers;