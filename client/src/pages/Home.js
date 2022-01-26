import React from "react";
import { useQuery } from '@apollo/client';
import { QUERY_WORKOUTS } from '../utils/queries';
import WorkoutList from '../components/WorkoutList';

const Home = () => {
  // use useQuery hook to make query request
  const { loading, data } = useQuery(QUERY_WORKOUTS);

  const workouts = data?.workouts || [];
  console.log(workouts);

  return (
    <main>
  <div className="flex-row justify-space-between">
    <div className="col-12 mb-3">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <WorkoutList workouts={workouts} title="Some Feed for workout(s)..." />
      )}
    </div>
  </div>
</main>
  );
};

export default Home;
