import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Provider } from 'react-redux';

import './index.css';
// ** Toast
import { Toaster } from 'react-hot-toast';

import reportWebVitals from './reportWebVitals';
import { store } from './redux/store';
import PreloadComponent from './components/PreloadComponent';

// ** Lazy load app
const LazyApp = lazy(() => import('./App'));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <Suspense fallback={<PreloadComponent />}>
        <LazyApp />
        <Toaster position="top-right" toastOptions={{ className: 'react-hot-toast' }} />
      </Suspense>
    </Provider>
  </BrowserRouter>
);

reportWebVitals();
