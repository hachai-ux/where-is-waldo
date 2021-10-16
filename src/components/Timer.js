import { addDoc, collection, serverTimestamp, updateDoc } from "firebase/firestore";
import { useState, useEffect } from 'react';
import { useStopwatch } from 'react-timer-hook';
import RecordPopup from './RecordPopup';

const Timer = (props) => {

    const [docRef, setDocRef] = useState(null);

    const {
    seconds,
    minutes,
    hours,
    start,
    pause
    } = useStopwatch({ autoStart: false });




    useEffect (() => {

        if (props.imageLoaded === true) {
            saveStartTime();
        }
        if (props.searchEnd === true) {
            saveEndTime();
        }


          async function saveStartTime() {
  // Add a new time entry to the Firebase database.
        try {
            if (docRef === null) {
                const tempDocRef = await addDoc(collection(props.db, 'currentPlayers'), {
                    timestampStart: serverTimestamp()
                });
                console.log(tempDocRef);
                start();
                setDocRef(tempDocRef);
                
                
      }
    
            }
            catch(error) {
                console.error('Error writing new timestamp to Firebase Database', error);
            }
                }
                
                async function saveEndTime() {
            // Add a new time entry to the Firebase database.
                    try {
                pause();
                await updateDoc(docRef, {
                    timestampEnd: serverTimestamp()
                });
                
                
            }
            catch(error) {
                console.error('Error writing new timestamp to Firebase Database', error);
            }
                }
        
      
     

    },[props.imageLoaded, docRef, props.db, props.searchEnd, start, pause]);

  
    const showRecordPopup = () => {
        if (props.searchEnd === true) {
        return <RecordPopup docRef={docRef} />
    }
} 




    return (
        <div className="timer">
            <div style={{ fontSize: '100px' }}>
                   <span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
            </div>
            {showRecordPopup()};
       
        </div>
    )
}


export default Timer;