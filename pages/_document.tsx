// pages/_document.tsx

import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <script src="https://js.api.here.com/v3/3.1/mapsjs-core.js" />
          <script src="https://js.api.here.com/v3/3.1/mapsjs-service.js" />
          <script src="https://js.api.here.com/v3/3.1/mapsjs-ui.js" />
          <script src="https://js.api.here.com/v3/3.1/mapsjs-mapevents.js" />
          <link
            rel="stylesheet"
            href="https://js.api.here.com/v3/3.1/mapsjs-ui.css"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;

