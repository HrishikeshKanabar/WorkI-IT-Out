import React from "react";
import { useQuery } from '@apollo/client';
import Auth from '../utils/auth';

import { QUERY_WORKOUTS, QUERY_ME_BASIC } from '../utils/queries';
import WorkoutList from '../components/WorkoutList';
import FriendList from '../components/FriendList';
import WorkoutForm from '../components/WorkoutForm';

const Home = () => {
  // use useQuery hook to make query request
  const { loading, data } = useQuery(QUERY_WORKOUTS);
  // use object destructuring to extract `data` from the `useQuery` Hook's response and rename it `userData` to be more descriptive
  const { data: userData } = useQuery(QUERY_ME_BASIC);

  const workouts = data?.workouts || [];

  console.log(workouts);

  const loggedIn = Auth.loggedIn();

  return (
    <main>
      <div className="flex-row justify-space-between">
        {loggedIn && (
        <div className="col-12 mb-3">
          <WorkoutForm />
        </div>
        )}
        <div className={`col-12 mb-3 ${loggedIn && 'col-lg-8'}`}>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <WorkoutList workouts={workouts} title="Enjoy Workouts feed" />
          )}
        </div>
        {loggedIn && userData ? (
          <div className="col-12 col-lg-3 mb-3">
            <FriendList
              username={userData.me.username}
              friendCount={userData.me.friendCount}
              friends={userData.me.friends}
            />
          </div>
        ) : null}
      </div>
    </main>
  );
};

export default Home;
