import React, { useState } from 'react';
import { useMutation ,useQuery} from '@apollo/client';
import { QUERY_WORKOUTS, QUERY_ME ,QUERY_USER} from '../../utils/queries';
import { ADD_WORKOUT } from '../../utils/mutations';
import { Redirect, useParams } from 'react-router-dom';

const WorkoutForm = () => {
    const [workoutText, setText] = useState('');
    const [characterCount, setCharacterCount] = useState(0);
    const { username: userParam } = useParams();
    const { data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
      variables: { username: userParam }
    });
    const [addWorkout, { error }] = useMutation(ADD_WORKOUT, {
        update(cache, { data: { addWorkout:addWorkoutData} }) {
           try {
                // read what's currently in the cache
                const { workouts } = cache.readQuery({ query: QUERY_WORKOUTS });
               console.log('line 16 workouts>>'+workouts);
                // prepend the newest workout to the front of the array
                cache.writeQuery({
                query: QUERY_WORKOUTS,
                data: { workouts:[addWorkoutData,...workouts] }
               /* data: { workouts:addWorkoutData }*/
                });

               
            }
            catch (e) {
                console.error('error 27'+e);
            }
            

            console.log('addWorkoutData>> '+JSON.stringify(addWorkoutData));
            // update me object's cache, appending new workout to the end of the array
            //const data  = cache.readQuery({ query: QUERY_ME });
            console.log('data>>> '+ data);
            //const me  = cache.readQuery({ query: QUERY_ME });
            if(!data){

               /*cache.writeQuery({
                    query: QUERY_ME,
                    data: { me: {workouts: addWorkoutData } }
                });*/
               
               cache.writeQuery({
                    query: QUERY_ME,
                    data: { me: { ...data.me, workouts: [...data.me.workouts, addWorkout] } }
                });



            }else{
                /*cache.writeQuery({
                    query: QUERY_ME,
                    data: { me: { ...me, workouts: [...me.workouts, addWorkout] } }
                });*/
                console.log('ELSE PART');
            }
           
            
            
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