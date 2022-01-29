import React from 'react';
import { Link } from 'react-router-dom';

const FriendList = ({ friendCount, username, friends }) => {
  if (!friends || !friends.length) {
    return <p className="bg-dark text-light p-3">{username}, find some gym buddies!</p>;
  }

  return (
    <div>
      <h5>
        {username}'s {friendCount} {friendCount === 1 ? 'Workout buddy' : 'workout buddies'}
      </h5>
      {friends.map(friend => (
        <button className="btn w-100 display-block mb-2" key={friend._id}>
          <Link to={`/profile/${friend.username}`}>{friend.username}</Link>
        </button>
      ))}
    </div>
  );
};

export default FriendList;