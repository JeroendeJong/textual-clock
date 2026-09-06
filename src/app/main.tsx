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
    width: 100%;
    min-height: 100dvh;
    box-sizing: border-box;
    display: grid;
    place-items: center;
    padding: 16px;
    font-family: 'Comfortaa';
    font-size: x-large;
  }

  html,
  body {
    width: 100%;
    min-height: 100%;
    margin: 0;
    overflow: hidden;
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


