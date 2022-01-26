import React from "react";

const SingleWorkout = (props) => {
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
