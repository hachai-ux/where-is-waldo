import { useEffect, useState } from 'react';
import { deleteDoc, getDocs, query, collection, orderBy, limit } from 'firebase/firestore';


//clicking on submit will read data from the database, and submit that data to the leaderboard database
const Leaderboard = (props) => {

  //get all leaderboard data from firestore
  const [leaderboardScores, setLeaderboardScores] = useState(null);

  useEffect(() => {

  async function getLeaderboardData() {

    const q = query(collection(props.db, "leaderboard"), orderBy('time', 'asc'), limit(10));

    const querySnapshot = await getDocs(q);
    setLeaderboardScores(querySnapshot.docs.map((doc) => { 
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      return doc;

    }));

  }
        getLeaderboardData();
    
  }, [])


  function ScoresList() {
    //list not table for now
    if (leaderboardScores !== null) {
      const scoreItems = leaderboardScores.map((doc) =>
        <li key={doc.id}>
          {doc.data().name} {doc.data().time}s</li>
      );
      return (
        <ol>{scoreItems}</ol>
      );
      
    }
     else return null;
}
    
  

    return (
      <div>
        <div className="form-popup" id="leaderboard">
                
          <div className="form-container">
            <h1>Leaderboard</h1>
                    <ScoresList />
                </div>
            </div>       
           
                        
        </div>
    )
}

export default Leaderboard;