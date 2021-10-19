import { deleteDoc, getDoc, doc } from 'firebase/firestore';
import React,{ useState, useEffect} from 'react';


const RecordPopup = (props) => {
//clicking on submit will read data from the database, and submit that data to the leaderboard database
    
    const [timestampStart, setTimestampStart] = useState(null);
    const [timestampEnd, setTimestampEnd] = useState(null);
    const [time, setTime] = useState(null);
    console.log('show recordpopup only once');
    

    useEffect(() => {


        async function getTimestampData() {

          
            console.log(props.docRefID);
             console.log(props.db);
            const docRef = doc(props.db, "current_players", props.docRefID);
            console.log(docRef);
            const docSnap = await getDoc(docRef);
            console.log(docSnap);
            console.log(docSnap.data());
            console.log(docSnap.exists());
            if (docSnap.exists()) {
                console.log(docSnap.data().timestampEnd);
                setTimestampStart(docSnap.data().timestampStart);
                setTimestampEnd(docSnap.data().timestampEnd);
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
  
            }
            setTime(`${docSnap.data().timestampEnd - docSnap.data().timestampStart}` + "s");
            console.log('once please');
        };

        getTimestampData();
        

    }, []);

    const ScoreTime = () => {
        if (timestampStart !== null && timestampEnd !== null) {

            return (
                <div>
                    You found all Pokemon in {time}.
                </div>
        )
        }
        

        else return null;
    }

    const ScoreTimeMemo = React.memo(ScoreTime);

   
    
    async function deleteCurrentUserOnDatabase() {
        //removes current user

        await deleteDoc(doc(props.db, "current_players", props.docRef));
    }

    const saveScore = (e) => {
        e.preventDefault();
        console.log(timestampStart);
        console.log(timestampEnd);

    }
 
    return (
        <div>
            <div className="form-popup" id="record">
                <form onSubmit={saveScore} className="form-container">
                    <ScoreTimeMemo />

                    <label htmlFor="name"><b>Enter name to save score</b></label>
                    <input type="text" placeholder="Name" name="name" required />

                    <button type="submit" className="btn">Save</button>
                </form>
            </div>               
        </div>
    )
}

export default RecordPopup;