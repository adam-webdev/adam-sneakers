import { SnackbarProvider } from 'notistack'
import { useEffect } from 'react';
import '../styles/globals.css'
import StateContextProvider from '../utils/Store'

function MyApp({ Component, pageProps }) {
  // useEffect(()=>{
  //   const jssStyles = document.querySelector('#jss-server-side')
  //   if(jssStyles){
  //     jssStyles.parentElement.removeChild(jssStyles);
  //   }
  // },[]);
  return(
    <SnackbarProvider anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'left',
    }}>
      <StateContextProvider>
        <Component {...pageProps} />
      </StateContextProvider>
    </SnackbarProvider>

  )
}

export default MyApp
