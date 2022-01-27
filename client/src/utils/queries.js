import { gql } from '@apollo/client';

export const QUERY_WORKOUTS = gql`
  query workouts($username: String) {
    workouts(username: $username) {
      _id
      workoutText
      createdAt
      username
      reactionCount
      reactions {
        _id
        createdAt
        username
        reactionBody
      }
    }
  }
`;

export const QUERY_WORKOUT = gql`
  query workout($id: ID!) {
    workout(_id: $id) {
      _id
      workoutText
      createdAt
      username
      reactionCount
      reactions {
        _id
        createdAt
        username
        reactionBody
      }
    }
  }
`;

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      friendCount
      friends {
        _id
        username
      }
      workouts {
        _id
        workoutText
        createdAt
        reactionCount
      }
    }
  }
`;
