// components/ui/map.js
"use client";

import React, {useEffect, useRef} from 'react';
import dynamic from 'next/dynamic'; // for dynamic import with ssr false
import H from '@here/maps-api-for-javascript';

///
/// HERE Maps component
///
/// This component is a wrapper around the HERE Maps JavaScript API.
/// It loads the required scripts and initializes the map.
export const HereMap = ({
                            apikey,
                            data = null,
                            lat = -23.55,
                            lng = -46.6333,
                            isScrollable = false,
                            zoomX = 14,
                        }) => {
    const mapRef = useRef(null);
    const map = useRef(null);
    const platform = useRef(null);

    useEffect(() => {
        // Initialize the map if it's not created already
        if (!map.current) {
            platform.current = new H.service.Platform({
                apikey,
            });

            const defaultLayers = platform.current.createDefaultLayers({
                pois: true,
            });

            // Create a new map instance
            const newMap = new H.Map(mapRef.current, defaultLayers.vector.normal.map, {
                zoom: zoomX,
                center: {lat, lng},
            });

            map.current = newMap;

            // Add event listener for resizing
            const resizeHandler = () => {
                newMap.getViewPort().resize();
            };
            window.addEventListener('resize', resizeHandler);

            // Handle scroll event if scrollable
            if (isScrollable) {
                newMap.setOptions({
                    pixelRatio: window.devicePixelRatio,
                    gestureHandling: 'cooperative', // Enable pinch zoom and drag
                });
            }
        }

        return () => {
            // Cleanup on unmount
            if (map.current) {
                map.current.dispose();
            }
            window.removeEventListener('resize', resizeHandler);
        };
    }, [apikey, data, lat, lng, isScrollable, zoomX]);

    return <div style={{width: '100%', height: '500px'}} ref={mapRef}/>;
};

// Dynamically import the component to avoid SSR issues
export default dynamic(() => Promise.resolve(HereMap), {ssr: false});