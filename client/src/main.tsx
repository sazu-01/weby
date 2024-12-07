
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx';

import { Provider } from 'react-redux';
import { store } from './App/store.ts';

//css
import "../src/index.css";

createRoot(document.getElementById('root')!).render(
      <Provider store={store} >
      <App />
    </Provider>
)
