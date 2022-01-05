import React, { useRef, useEffect } from 'react';
import createMapView from './utils/map';

export const MapView = ({basemap, zoom}) => {
    const mapRef = useRef();
    useEffect(()=>{
        const mapProperties = { basemap };
        const viewProperties = { zoom };
        const view = createMapView(mapRef.current, mapProperties, viewProperties);
        return () => { view && view.destroy();};
    }, []);
    return <div ref={mapRef} />
} 