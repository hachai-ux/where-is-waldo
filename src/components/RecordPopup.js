import { deleteDoc, getDoc, doc, addDoc, collection } from 'firebase/firestore';
import React,{ useState, useEffect} from 'react';


const RecordPopup = (props) => {
//clicking on submit will read data from the database, and submit that data to the leaderboard database
    
    const [timestampStart, setTimestampStart] = useState(null);
    const [timestampEnd, setTimestampEnd] = useState(null);
    
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
            props.assignTime(`${docSnap.data().timestampEnd - docSnap.data().timestampStart}` + "s");
            console.log('once please');
            console.log(docSnap.data().timestampEnd - docSnap.data().timestampStart);
        };

        getTimestampData();
        

    }, []);

    const ScoreTime = () => {
        if (timestampStart !== null && timestampEnd !== null) {

            return (
                <div>
                    You found all Pokemon in {props.time}.
                </div>
        )
        }
        

        else return null;
    }

   

   
    
    async function deleteCurrentUserOnDatabase() {
        //removes current user

        await deleteDoc(doc(props.db, "current_players", props.docRef));
    }

  
       
     
async function saveScore(e) {
 e.preventDefault();
        console.log(timestampStart);
    console.log(timestampEnd);
    console.log(props.db);
    console.log(props.time);
    console.log(e.target.value);
      
  try {
    await addDoc(collection(props.db, 'leaderboard'), {
      name: e.target.name.value,
      time: props.time,
    });
  }
  catch(error) {
    console.error('Error writing new message to Firebase Database', error);
  }
}

    

    const changeStates = (e) => {
        e.preventDefault();
        props.setSearchEndFalse();
        props.assignTimestampEndLoadedFalse();
        props.assignLeaderboardActive(true);

    }
 
    return (
        <div>
            <div className="form-popup" id="record">
                <form onSubmit={(e) => { saveScore(e); changeStates(e); }} className="form-container">
                    <ScoreTime />

                    <label htmlFor="name"><b>Enter name to save score</b></label>
                    <input type="text" placeholder="Name" name="name" required />

                    <button type="submit" className="btn">Save</button>
                </form>
            </div>               
        </div>
    )
}

export default RecordPopup;