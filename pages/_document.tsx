import { AppProps } from 'next/app';
import Script from 'next/script';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* Scripts HERE */}
      <Script
        src="https://js.api.here.com/v3/3.1/mapsjs-core.js"
        strategy="beforeInteractive"
        onLoad={() => console.log('Script core chargé')}
        onError={(e) => console.error('Erreur lors du chargement du script core', e)}
      />
      <Script
        src="https://js.api.here.com/v3/3.1/mapsjs-service.js"
        strategy="beforeInteractive"
        onLoad={() => console.log('Script service chargé')}
        onError={(e) => console.error('Erreur lors du chargement du script service', e)}
      />
      <Script
        src="https://js.api.here.com/v3/3.1/mapsjs-ui.js"
        strategy="beforeInteractive"
        onLoad={() => console.log('Script UI chargé')}
        onError={(e) => console.error('Erreur lors du chargement du script UI', e)}
      />
      <Script
        src="https://js.api.here.com/v3/3.1/mapsjs-mapevents.js"
        strategy="beforeInteractive"
        onLoad={() => console.log('Script mapevents chargé')}
        onError={(e) => console.error('Erreur lors du chargement du script mapevents', e)}
      />

      {/* Composant de page */}
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;





