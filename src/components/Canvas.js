import React, { useEffect, useRef } from "react";
import pokemon_search from '../images/Pokemon_Search.png';


const Canvas = (props) => {

    const canvasRef = useRef(null);
    const imageRef = useRef(null);
    

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
      
       

        const image = new Image();
        image.src = pokemon_search;
        image.onload = function () {
            ctx.drawImage(image, 0, 0);
        };

  
     
    //Our first draw

    }, [])
    
    const drawTargetingBox = (e) => {
        const canvas = canvasRef.current;
        console.log(canvasRef);
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
 
        console.log(x);
        console.log(y);
        
        
    }
 

    return (
        
        <div>
            <img ref={imageRef} className="search-image" alt='Pokemon Search' src={pokemon_search}/>
            <canvas ref={canvasRef} width="1440" height="900" {...props} onClick={(e)=>drawTargetingBox(e)}/>
        </div>
       
    );
};


export default Canvas;