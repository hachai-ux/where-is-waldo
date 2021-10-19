import { useEffect, useState } from 'react';
import { deleteDoc, getDocs, doc } from 'firebase/firestore';

//clicking on submit will read data from the database, and submit that data to the leaderboard database
const Leaderboard = (props) => {

    
  //get all leaderboard data from firestore

      
    getLeaderboardData();

    async function getLeaderboardData() {

    }
    
  

    return (
        <div>
           
                        
        </div>
    )
}

export default Leaderboard;