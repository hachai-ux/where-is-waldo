import React, { useEffect, useRef } from "react";
import pokemon_search from '../images/Pokemon_Search.png';


const Canvas = (props) => {

    const canvasRef = useRef(null);
    const imageRef = useRef(null);
    
/* --obsolete, because of using background-image in css--
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
    */
    
    const drawTargetingBox = (e) => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        console.log(canvasRef);
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
 
        console.log(x);
        console.log(y);

        const rectSize = 50;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.rect(x - (rectSize / 2), y - (rectSize / 2), rectSize, rectSize);
        ctx.strokeStyle = "rgba(0,0,0,1)";
        //transparent probably due to pixel density
        ctx.stroke();
        ctx.stroke();
        ctx.stroke();
        
        
    }
 

    return (
        
        <div>
            <img ref={imageRef} className="search-image" alt='Pokemon Search' src={pokemon_search}/>
            <canvas id='search-image'ref={canvasRef} width="1440" height="900" {...props} onClick={(e)=>drawTargetingBox(e)}/>
        </div>
       
    );
};


export default Canvas;