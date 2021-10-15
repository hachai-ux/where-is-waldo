import React, { useEffect, useState, useRef } from "react";
import { collection, doc, DocumentSnapshot, getDoc } from "firebase/firestore";
import pokemon_search from '../images/Pokemon_Search.png';


const Canvas = (props) => {

    const canvasRef = useRef(null);
    const canvasMarkerRef = useRef(null);
    const imageRef = useRef(null);
    const [dropdownProperties, setDropdownProperties] = useState({});
    const db = props.db;
     const rectSize = 50;


    const [canvasX, setCanvasX] = useState();
    const [canvasY, setCanvasY] = useState();
    
/* --obsolete, because of using background-image in css--
    //could use layers(multiple canvases)

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
        console.log('clicked 1');
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        console.log(canvasRef);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const rect = canvas.getBoundingClientRect();
        //both clientX and left are relative to the viewport
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
 
        console.log(x);
        console.log(y);

        
        ctx.beginPath();
        ctx.rect(x - (rectSize / 2), y - (rectSize / 2), rectSize, rectSize);
        ctx.strokeStyle = "rgba(0,0,0,1)";
        //transparent probably due to pixel density
        ctx.stroke();
        ctx.stroke();
        ctx.stroke();

        setCanvasX(x);
        setCanvasY(y);
        
    }

    const drawMarker = () => {

        const canvas = canvasMarkerRef.current;
        const ctx = canvas.getContext('2d');

        console.log(canvas);
        
        ctx.beginPath();
        ctx.rect(canvasX - (rectSize / 2), canvasY - (rectSize / 2), rectSize, rectSize);
        ctx.strokeStyle = "rgba(0,0,0,1)";
        //transparent probably due to pixel density
        ctx.stroke();
        ctx.stroke();
        ctx.stroke();
    }
 
    const showDropdownMenu = (e) => {
        const tempDropdownProperties = {
            display: 'inline-block',
            left: e.pageX,
            top: e.pageY
        }
        setDropdownProperties(tempDropdownProperties);
        console.log(dropdownProperties);
    }
   

    return (
        
        <div>
            <img ref={imageRef} className="search-image" alt='Pokemon Search' src={pokemon_search} />
            <div className='canvas-container'>
                <canvas id='marker' ref={canvasMarkerRef} width="1440" height="900" {...props}  />
                <canvas id='search-image' ref={canvasRef} width="1440" height="900" {...props} onClick={(e) => { drawTargetingBox(e); showDropdownMenu(e) }}  />    
            </div>
            <DropdownMenu drawMarker={drawMarker} rectSize={rectSize} canvasX={canvasX} canvasY={canvasY} db={db} dropdownProperties={dropdownProperties} />
        </div>
       
    );
};

//comparison of coordinates to canvas only works if image and canvas size are the same


const DropdownMenu = (props) => {

     
    
    const loadImageCoordinates = async () => {
     

        const docRef = doc(props.db, "search_images", "pokemon");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
        } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
        }
        return docSnap.data();
    }

    const checkValidTarget = async (name) => {
        const docData = await loadImageCoordinates();

        
        if (docData !== 'undefined') {
            console.log(docData);

            for (const field in docData) {
                console.log(field);
                if (field === name) {
                    //top left and bottom right corner is enough for the database(for next time)
                    console.log(props.canvasX);
                    console.log(docData[field].topLeft.x);
                    //compare targeting box to backend "box"/coordinates
                    //Check if at least one corner of the targeting box overlaps with the field/pokemon box
                    //Also check of targeting box is bigger and contains the pokemon's box
                    //Also valid if only edges(not corners) of the targeting box are in the pokemon's box
                    //->The 3 cases are touches, contains and overlaps
                    console.log(props.rectSize / 2);
                    if ((((props.canvasX - props.rectSize / 2) >= docData[field].topLeft.x) && ((props.canvasX - props.rectSize / 2) <= docData[field].topRight.x) && ((props.canvasY - props.rectSize / 2) >= docData[field].topLeft.y) && ((props.canvasY - props.rectSize / 2) <= docData[field].bottomRight.y)) || 
                        (((props.canvasX + props.rectSize / 2) >= docData[field].topLeft.x) && ((props.canvasX + props.rectSize / 2) <= docData[field].topRight.x) && ((props.canvasY - props.rectSize / 2) >= docData[field].topLeft.y) && ((props.canvasY - props.rectSize / 2) <= docData[field].bottomRight.y)) ||
                        (((props.canvasX + props.rectSize / 2) >= docData[field].topLeft.x) && ((props.canvasX + props.rectSize / 2) <= docData[field].topRight.x) && ((props.canvasY + props.rectSize / 2) >= docData[field].topLeft.y) && ((props.canvasY + props.rectSize / 2) <= docData[field].bottomRight.y)) ||
                        (((props.canvasX - props.rectSize / 2) >= docData[field].topLeft.x) && ((props.canvasX - props.rectSize / 2) <= docData[field].topRight.x) && ((props.canvasY + props.rectSize / 2) >= docData[field].topLeft.y) && ((props.canvasY + props.rectSize / 2) <= docData[field].bottomRight.y)) ||
                        (((props.canvasX - props.rectSize / 2) <= docData[field].topLeft.x) && ((props.canvasX + props.rectSize / 2) >= docData[field].topRight.x) && ((props.canvasY - props.rectSize / 2) <= docData[field].topLeft.y) && ((props.canvasY + props.rectSize / 2) >= docData[field].bottomRight.y)) ||
                        (((props.canvasX + props.rectSize / 2) >= docData[field].topLeft.x) && ((props.canvasX + props.rectSize / 2) <= docData[field].topRight.x) && ((props.canvasY - props.rectSize / 2) <= docData[field].topLeft.y) && ((props.canvasY + props.rectSize / 2) >= docData[field].bottomRight.y)) ||
                        (((props.canvasX - props.rectSize / 2) >= docData[field].topLeft.x) && ((props.canvasX - props.rectSize / 2) <= docData[field].topRight.x) && ((props.canvasY - props.rectSize / 2) <= docData[field].topLeft.y) && ((props.canvasY + props.rectSize / 2) >= docData[field].bottomRight.y)) ||
                        (((props.canvasX - props.rectSize / 2) <= docData[field].topLeft.x) && ((props.canvasX + props.rectSize / 2) >= docData[field].topRight.x) && ((props.canvasY + props.rectSize / 2) >= docData[field].topLeft.y) && ((props.canvasY + props.rectSize / 2) <= docData[field].bottomRight.y)) ||
                        (((props.canvasX - props.rectSize / 2) <= docData[field].topLeft.x) && ((props.canvasX + props.rectSize / 2) >= docData[field].topRight.x) && ((props.canvasY - props.rectSize / 2) >= docData[field].topLeft.y) && ((props.canvasY - props.rectSize / 2) <= docData[field].bottomRight.y))) {
                        console.log('Valid');
                        props.drawMarker();
                        }
                        else {
                            console.log('Invalid');
                    }
                    }
            }
        };
    };


    return (
        <div className="dropdown" style={props.dropdownProperties}>
            <div className="dropdown-content">
                <button onClick={()=>checkValidTarget('Togepi')}>Togepi</button>
                <button onClick={()=>checkValidTarget('Wobbuffet')}>Wobbuffet</button>
                <button onClick={()=>checkValidTarget('Horsea')}>Horsea</button>
            </div>
        </div>
    )
}


export default Canvas;