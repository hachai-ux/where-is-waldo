import { useEffect, useState } from 'react';
import { deleteDoc, getDoc, doc } from 'firebase/firestore';

//clicking on submit will read data from the database, and submit that data to the leaderboard database
const RecordPopup = (props) => {

    
    const [timestampStart, setTimestampStart] = useState();
    const [timestampEnd, setTimestampEnd] = useState();


      
    getBookReadData();

    async function getBookReadData() {

    const docSnap = await getDoc(doc(props.db, "currentPlayers", props.docRef));
        console.log('Got docSnap');
    if (docSnap.exists()) {
        setTimestampStart(docSnap.data().timestampStart);
         setTimestampStart(docSnap.data().timestampEnd);
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
  
        }
    };
    
    async function deleteCurrentUserOnDatabase() {
        //removes current user

        await deleteDoc(doc(props.db, "currentPlayers", props.docRef));
    }

    const saveScore = (e) => {
        e.preventDefault();
    }

    return (
        <div>
            <div className="form-popup" id="record">
                <form onSubmit={saveScore}className="form-container">
                    <h1>Time</h1>

                    <label for="name"><b>Name</b></label>
                    <input type="text" placeholder="Enter Name" name="name" required />

                    <button type="submit" class="btn">Save</button>
                </form>
            </div>
                        
        </div>
    )
}

export default RecordPopup;