import React, { useEffect, useRef, useState } from 'react';

const HereMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isMapInitialized, setIsMapInitialized] = useState(false);
  const mapInstance = useRef<null |H.Map>(null); // Stocke l'instance de la carte

  useEffect(() => {
    const loadScript = (src: string): Promise<void> => {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.type = 'text/javascript';
        script.async = true;
        script.onload = () => resolve();
        script.onerror = (e) => reject(e);
        document.head.appendChild(script);
      });
    };

    const initializeMap = () => {
      if (window.H && mapRef.current && !isMapInitialized) {
        const platform = new window.H.service.Platform({
          apikey: 'TZGMfFjWVd1Xakcknrs_qdO4AAtWcTt3uONGSDTs8LI',
        });

        const defaultLayers = platform.createDefaultLayers();
        mapInstance.current = new window.H.Map(
          mapRef.current,
          defaultLayers.vector.normal.map,
          {
            zoom: 6,
            center: { lat: 46.603354, lng: 1.888334 },
          }
        );

        const mapEvents = new window.H.mapevents.MapEvents(mapInstance.current);
        new window.H.mapevents.Behavior(mapEvents);
        window.H.ui.UI.createDefault(mapInstance.current, defaultLayers);

        setIsMapInitialized(true);
      }
    };

    const loadHereMapsScripts = async () => {
      try {
        await loadScript('https://js.api.here.com/v3/3.1/mapsjs-core.js');
        await loadScript('https://js.api.here.com/v3/3.1/mapsjs-service.js');
        await loadScript('https://js.api.here.com/v3/3.1/mapsjs-ui.js');
        await loadScript('https://js.api.here.com/v3/3.1/mapsjs-mapevents.js');
        
        if (window.H) {
          initializeMap();
        } else {
          console.error("La bibliothèque HERE n'est toujours pas disponible après le chargement.");
        }
      } catch (error) {
        console.error('Erreur lors du chargement des scripts HERE:', error);
      }
    };

    loadHereMapsScripts();

    return () => {
      if (mapInstance.current) {
        mapInstance.current.dispose();
      }
    };
  }, [isMapInitialized]);

  return <div ref={mapRef} style={{ height: '600px', width: '100%' }} />;
};

export default HereMap;
