import React from 'react';
import 'Styles/globals.css';
import type { AppProps } from 'next/app';

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default App;
