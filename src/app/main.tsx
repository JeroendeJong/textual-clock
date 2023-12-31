import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app.tsx'
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'MajorMonoDisplay';
    font-style: normal;
    src: local('Opensans-Bold'), url(./fonts/MajorMonoDisplay-Regular.ttf) format('truetype');
  }

  #root {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
    font-family: 'Comfortaa';
    font-size: x-large;
  }

  body {
    height: calc(100vh - 16px);
  }

  html {
    background-color: #000000;
    --primary-color: #D9BA31;
    --secondary-color: #282A3A;
  }
`

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GlobalStyle/>
    <App />
  </React.StrictMode>,
)



