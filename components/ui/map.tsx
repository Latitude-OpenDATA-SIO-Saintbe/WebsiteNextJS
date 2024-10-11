import React, { useEffect, useRef } from 'react';

const HereMap = () => {
    const mapRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const checkApiKey = async () => {
            const apiKey = '7cHtZaRME_mW8-IT022HQNmla265FtUjtZ0jId9jrKg'; // Remplace par ta clé API
            const testUrl = `https://geocode.search.hereapi.com/v1/geocode?q=Paris&apiKey=${apiKey}`;

            try {
                const response = await fetch(testUrl);
                if (response.ok) {
                    const data = await response.json();
                    console.log("Clé API valide : ", data);
                } else {
                    console.log("Erreur de la clé API : ", response.status, response.statusText);
                }
            } catch (error) {
                console.log("Erreur lors de la vérification de la clé API :", error);
            }
        };

        const initializeMap = () => {
            if (typeof window !== 'undefined' && window.H) {
                const H = window.H;
                const platform = new H.service.Platform({
                    apikey: 'TA_CLE_API_HERE', // Remplace par ta clé API
                });

                const defaultLayers = platform.createDefaultLayers();

                const map = new H.Map(
                    mapRef.current,
                    defaultLayers.vector.normal.map,
                    {
                        zoom: 6,
                        center: { lat: 46.603354, lng: 1.888334 }, // Centre sur la France
                    }
                );

                // Ajoute des événements de mappage
                const mapEvents = new H.mapevents.MapEvents(map);
                new H.mapevents.Behavior(mapEvents);
                H.ui.UI.createDefault(map, defaultLayers);

                return () => {
                    map.dispose();
                };
            } else {
                console.log("La bibliothèque HERE n'est pas disponible sur window.");
            }
        };

        checkApiKey(); // Vérifie si la clé API est valide
        initializeMap(); // Initialise la carte si la bibliothèque HERE est présente
    }, []);

    return <div ref={mapRef} style={{ height: '600px', width: '100%' }} />;
};

export default HereMap;


// '7cHtZaRME_mW8-IT022HQNmla265FtUjtZ0jId9jrKg'











