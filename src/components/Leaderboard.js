import { useEffect, useState } from 'react';
import { deleteDoc, getDocs, query, collection } from 'firebase/firestore';


//clicking on submit will read data from the database, and submit that data to the leaderboard database
const Leaderboard = (props) => {

  //get all leaderboard data from firestore
  const [leaderboardScores, setLeaderboardScores] = useState(null);

  useEffect(() => {

  async function getLeaderboardData() {
      
    const q = query(collection(props.db, "leaderboard"));

    const querySnapshot = await getDocs(q);
    setLeaderboardScores(querySnapshot.map((doc) => { 
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      return doc;

    }));

  }
        getLeaderboardData();
    
  }, [])

  const saveLeaderboardData = async () => {
        
      }

  
  const deleteOldScore = () => {

  }

  function ScoresList() {
    //list not table for now
  const scoreItems = leaderboardScores.map((doc) =>
    <li key={doc.id}>
      {doc.data().name} {doc.data().time}s</li>
  );
  return (
    <ul>{scoreItems}</ul>
  );
}
    
  

    return (
      <div>
        <div className="form-popup" id="leaderboard">
                <div className="form-container">
                    <ScoresList />

                    <label htmlFor="name"><b>Enter name to save score</b></label>
                    <input type="text" placeholder="Name" name="name" required />

                    <button type="submit" className="btn">Save</button>
                </div>
            </div>       
           
                        
        </div>
    )
}

export default Leaderboard;