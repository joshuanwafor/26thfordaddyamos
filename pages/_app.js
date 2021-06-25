import '@/css/tailwind.css'

import { ThemeProvider } from 'next-themes'
import { DefaultSeo } from 'next-seo'
import Head from 'next/head'
import firebase from 'firebase/app'
import { FirestoreProvider } from '@react-firebase/firestore'

import { SEO } from '@/components/SEO'
import LayoutWrapper from '@/components/LayoutWrapper'

export default function App({ Component, pageProps }) {
  if (!firebase.apps.length) {
    firebase.initializeApp({
      apiKey: 'AIzaSyBxIkoozDKuuF_s5gGsFYc4u4txMx76KBc',
      authDomain: 'daddyamos-cbc6b.firebaseapp.com',
      projectId: 'daddyamos-cbc6b',
      storageBucket: 'daddyamos-cbc6b.appspot.com',
      messagingSenderId: '976661112910',
      appId: '1:976661112910:web:aff87ac0f0fb556941bb1f',
      measurementId: 'G-CCK18B266N',
    })
  }
  return (
    <ThemeProvider attribute="class">
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      <DefaultSeo {...SEO} />
      <LayoutWrapper>
        <Component {...pageProps} />
      </LayoutWrapper>
    </ThemeProvider>
  )
}
