
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx';

import { Provider } from 'react-redux';
import { store } from './app/store.ts';

//css
import "../src/index.css";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <Provider store={store} >
      <App />
    </Provider>
  </StrictMode>,
)
