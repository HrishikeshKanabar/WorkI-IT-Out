import React, { useState } from 'react';
import { useMutation } from '@apollo/client';

import { QUERY_WORKOUTS, QUERY_ME } from '../../utils/queries';
import { ADD_WORKOUT } from '../../utils/mutations';

const WorkoutForm = () => {
    const [workoutText, setText] = useState('');
    const [characterCount, setCharacterCount] = useState(0);

    const [addWorkout, { error }] = useMutation(ADD_WORKOUT, {
        update(cache, { data: { addWorkout } }) {
            try {
                // read what's currently in the cache
                const { workouts } = cache.readQuery({ query: QUERY_WORKOUTS });
            
                // prepend the newest workout to the front of the array
                cache.writeQuery({
                query: QUERY_WORKOUTS,
                data: { workouts: [addWorkout, ...workouts] }
                });
            }
            catch (e) {
                console.error(e);
            }

            // update me object's cache, appending new workout to the end of the array
            const { me } = cache.readQuery({ query: QUERY_ME });
            cache.writeQuery({
                query: QUERY_ME,
                data: { me: { ...me, workouts: [...me.workouts, addWorkout] } }
            });
        }
    });

    const handleChange = event => {
        if (event.target.value.length <= 280) {
          setText(event.target.value);
          setCharacterCount(event.target.value.length);
        }
    };

    const handleFormSubmit = async event => {
        event.preventDefault();
        
        try {
            // add workout to database
            await addWorkout({
              variables: { workoutText }
            });
        
            // clear form value
            setText('');
            setCharacterCount(0);
        } 
        catch (e) {
            console.error(e);
        }
    };

  return (
    <div>
        <p className={`m-0 ${characterCount === 280 ? 'text-error' : ''}`}>
            Character Count: {characterCount}/280
            {error && <span className="ml-2">Something went wrong...</span>}
        </p>
        <form 
            className="flex-row justify-center justify-space-between-md align-stretch"
            onSubmit={handleFormSubmit}
        >
            <textarea
            placeholder="Add a new workout..."
            value={workoutText}
            className="form-input col-12 col-md-9"
            onChange={handleChange}
            ></textarea>
            <button className="btn col-12 col-md-3" type="submit">
                Submit
            </button>
        </form>
    </div>
  );
};

export default WorkoutForm;