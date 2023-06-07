import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        <link href='/manifest.json' rel='manifest' />
        <meta content='#264653' name='theme-color' />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
