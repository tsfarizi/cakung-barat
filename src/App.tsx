import { HashRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Profil from './pages/Profil';
import Pelayanan from './pages/Pelayanan';
import Postingan from './pages/Postingan';
import { PageHeaderProvider } from './contexts/PageHeaderContext';

function App() {
  return (
    <HashRouter>
      <PageHeaderProvider>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/profil" element={<Profil />} />
            <Route path="/pelayanan" element={<Pelayanan />} />
            <Route path="/postingan" element={<Postingan />} />
          </Route>
        </Routes>
      </PageHeaderProvider>
    </HashRouter>
  );
}

export default App;