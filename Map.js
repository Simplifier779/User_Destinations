import React, {useRef,useEffect} from 'react';
import './Map.css';

const Map = props => {
    const mapRef = useRef();

    useEffect(()=>{
        const map=new window.google.maps.Map(mapRef.current,{
            center:props.center,
            zoom:props.zoom
        });
    
        new window.google.maps.Marker({position:props.center,map:map});
    },[props.center,props.zoom]);

    

   return <div ref={mapRef} className={`map ${props.className}`} style={props.stlyle}></div>; //use effect runs after this jsx return statement has been rendered. Hnece there is no error otherwise if there is no use effect then before this jsx code is rendered the above cod runs and casues problems.
   //current propr holds tha actual pointer we need
};


export default Map;
