import React from "react";
import { useParams } from 'react-router-dom';

const SingleWorkout = (props) => {
  const { id: workoutId } = useParams();
  console.log(workoutId);
  return (
    <div>
      <div className="card mb-3">
        <p className="card-header">
          <span style={{ fontWeight: 700 }} className="text-light">
            Username
          </span>{" "}
          workout on createdAt
        </p>
        <div className="card-body">
          <p>Workout Text</p>
        </div>
      </div>
    </div>
  );
};

export default SingleWorkout;
