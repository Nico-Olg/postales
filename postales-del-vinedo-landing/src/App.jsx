import React from 'react';
import { LanguageProvider } from './i18n/LanguageContext';
import PostalesDelVinedoLanding from './component/PostalesDelVinedoLanding';
import './styles/PostalesDelVinedo.css'

function App() {
  return (
    <LanguageProvider>
      <PostalesDelVinedoLanding />
    </LanguageProvider>
  );
}

export default App;
