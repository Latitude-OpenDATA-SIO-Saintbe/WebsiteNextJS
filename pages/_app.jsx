useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://js.api.here.com/v3/3.1/mapsjs-core.js';
    script.async = true;
    document.body.appendChild(script);

    const scriptEvents = document.createElement('script');
    scriptEvents.src = 'https://js.api.here.com/v3/3.1/mapsjs-mapevents.js';
    scriptEvents.async = true;
    document.body.appendChild(scriptEvents);

    return () => {
        document.body.removeChild(script);
        document.body.removeChild(scriptEvents);
    };
}, []);
