import React from 'react';

const WorkoutList = ({ workouts, title }) => {
  if (!workouts.length) {
    return <h3>No Workouts Yet</h3>;
  }

  return (
    <div>
      <h3>{title}</h3>
      {workouts &&
        workouts.map(workout => (
          <div key={workout._id} className="card mb-3">
            <p className="card-header">
              {workout.username}
              workout on {workout.createdAt}
            </p>
            <div className="card-body">
              <p>{workout.workoutText}</p>
              <p className="mb-0">
                Reactions: {workout.reactionCount} || Click to{' '}
                {workout.reactionCount ? 'see' : 'start'} the discussion!
              </p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default WorkoutList;