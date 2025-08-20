import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import './i18n';
import { AuthProvider } from './provider/AuthProvider';
import { NavigationProvider } from './provider/NavigationProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <NavigationProvider>
    <AuthProvider>
      <App />
    </AuthProvider>
    </NavigationProvider>
  </BrowserRouter>
);

