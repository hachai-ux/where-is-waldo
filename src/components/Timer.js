import { addDoc, collection, serverTimestamp, updateDoc } from "firebase/firestore";
import React,{ useState, useEffect, useRef } from 'react';
import { useStopwatch } from 'react-timer-hook';
import RecordPopup from './RecordPopup';
import Leaderboard from './Leaderboard';

const Timer = (props) => {

    const [docRef, setDocRef] = useState(null);
    const [leaderboardActive, setLeaderboardActive] = useState(false);
    const [timestampEndLoaded, setTimestampEndLoaded] = useState(false);
    console.log('render timer');

    const {
    seconds,
    minutes,
    hours,
    start,
    pause
    } = useStopwatch({ autoStart: false });

    const RecordPopupMemo = React.memo(RecordPopup);

    useEffect(() => {
         if (props.imageLoaded === true) {
            saveStartTime();
         }
        
         async function saveStartTime() {
  // Add a new time entry to the Firebase database.
        try {
            if (docRef === null) {
                const tempDocRef = await addDoc(collection(props.db, 'current_players'), {
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
    
},[props.imageLoaded])


    useEffect (() => {

        console.log(timestampEndLoaded);
        if (props.searchEnd === true && timestampEndLoaded === false) {
            saveEndTime();
        }


         
                
                async function saveEndTime() {
            // Add a new time entry to the Firebase database.
                    
                    //run it only once or else there seems to be a bug with not finding the document and timestampEnd updating too much
                    try {
                pause();
                await updateDoc(docRef, {
                    timestampEnd: serverTimestamp()
                });
                        console.log('save end time')
                        setTimestampEndLoaded(true);
                      
                        
                      
             
                
            }
            catch(error) {
                console.error('Error writing new timestamp to Firebase Database', error);
            }
                }
        
      
     

    },[props.searchEnd]);

  
    const EndingPopups = () => {
  
        if (props.searchEnd === true && timestampEndLoaded === true) {
            return <RecordPopupMemo db={props.db} docRefID={docRef.id} />
        }
        else if (leaderboardActive === true) {
            return <Leaderboard />;
        }
        else return null;
    }





    return (
        <div className="timer">
            <div style={{ fontSize: '100px' }}>
                   <span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
            </div>
            <EndingPopups />
       
        </div>
    )
}


export default Timer;