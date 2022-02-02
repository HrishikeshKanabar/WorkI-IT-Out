import React, {useState} from "react";
import { useQuery, useMutation } from '@apollo/client';
import { Redirect, useParams } from 'react-router-dom';
import Auth from '../utils/auth';

import { QUERY_USER, QUERY_ME } from '../utils/queries';
import { ADD_FRIEND } from '../utils/mutations';

import WorkoutList from '../components/WorkoutList';
import FriendList from '../components/FriendList';
import WorkoutForm from '../components/WorkoutForm';

const Profile = () => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam }
  });
  
  const user = data?.me || data?.user || {};

  const [friendText, setFriendText] = useState("Follow")
  const [addFriend] = useMutation(ADD_FRIEND);

  // redirect to personal profile page if username is the logged-in user's
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Redirect to="/profile" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this page. Use the navigation links above to sign up or log in!
      </h4>
    );
  }

  const handleClick = async () => {
    try {
      await addFriend({
        variables: { id: user._id }
      });
      setFriendText("Following")
    } catch (e) {
      console.error(e);
    }
  }; 

  return (
    <div>
      <div className="flex-row mb-3">
        <h2 className="bg-dark text-secondary p-3 display-inline-block">
        Viewing {userParam ? `${user.username}'s` : 'your'} profile.
        </h2>
        {userParam && (
          <button className="btn ml-auto" onClick={handleClick}>
            {friendText}
          </button>
        )}
      </div>

      <div className="flex-row justify-space-between mb-3">
        <div className="col-12 mb-3 col-lg-8">
          <WorkoutList workouts={user.workouts} title={`${user.username}'s workouts...`} />
        </div>
        <div className="col-12 col-lg-3 mb-3">
          <FriendList
            username={user.username}
            friendCount={user.friendCount}
            friends={user.friends}
          />
        </div>

      </div>
      {/* <div className="mb-3">{!userParam && <WorkoutForm />}</div> */}
    </div>
  );
};

export default Profile;
