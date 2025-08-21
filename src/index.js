import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import './i18n';
import { AuthProvider } from './provider/AuthProvider';
import { LanguageProvider } from './provider/LanguageProvider';
import { TokenProvider } from './provider/TokenProvider';
import { ProfileProvider } from './provider/ProfileProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <LanguageProvider>  
    <TokenProvider>
      <ProfileProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ProfileProvider>
    </TokenProvider>
  </LanguageProvider>
</BrowserRouter>
);

