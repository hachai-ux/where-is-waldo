import { addDoc, collection, serverTimestamp, updateDoc } from "firebase/firestore";
import React,{ useState, useEffect, useRef } from 'react';
import { useStopwatch } from 'react-timer-hook';


const Timer = (props) => {

 
  
    const {
    seconds,
    minutes,
    hours,
    start,
    pause
    } = useStopwatch({ autoStart: false });

   

    useEffect(() => {
        if (props.imageLoaded === true) {
      
            saveStartTime();
         }
        
         async function saveStartTime() {
  // Add a new time entry to the Firebase database.
             try {
                 console.log(props.docRef);
            if (props.docRef === null) {
                const tempDocRef = await addDoc(collection(props.db, 'current_players'), {
                    timestampStart: serverTimestamp()
                });
     
                start();
                props.assignDocRef(tempDocRef);
                
                
                
      }
    
            }
            catch(error) {
                console.error('Error writing new timestamp to Firebase Database', error);
            }
                }
    
},[props.imageLoaded])


    useEffect (() => {

    
        if (props.searchEnd === true && props.timestampEndLoaded === false) {
            saveEndTime();
        }


         
                
                async function saveEndTime() {
            // Add a new time entry to the Firebase database.
                
                    //run it only once or else there seems to be a bug with not finding the document and timestampEnd updating too much
                    try {
                pause();
                await updateDoc(props.docRef, {
                    timestampEnd: serverTimestamp()
                });
                      
                        props.assignTimestampEndLoaded();
                      
                        
                      
             
                
            }
            catch(error) {
                console.error('Error writing new timestamp to Firebase Database', error);
            }
                }
        
      
     

    },[props.searchEnd]);

  
   



    return (
        <div className="timer">
            <div style={{ fontSize: '100px' }}>
                   <span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
            </div>
          
       
        </div>
    )
}


export default Timer;