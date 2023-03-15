import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import SignUp from './pages/SignUp';
import News from './pages/News';
import Sources from './pages/Sources'
import Source from './pages/Source';
import Categories from './pages/Categories';
import Category from './pages/Category';
import NoPage from './pages/NoPage';

import Footer from './components/Footer';
import Navigator from './components/Navigator';
import RequireAuth from './components/RequireAuth';
import {AuthProvider} from './hooks/useAuth';

function App() {
  return (

    <BrowserRouter>
      <AuthProvider>
        <Navigator />
        <Routes>
          <Route index path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='*' element={<NoPage />} />
          <Route index path='/' element={<RequireAuth><News/></RequireAuth>} />
          <Route path='/news' element={<RequireAuth><News /></RequireAuth>} />
          <Route path='/sources' element={<RequireAuth><Sources /></RequireAuth>} />
          <Route path='/source' element={<RequireAuth><Source /></RequireAuth>} />
          <Route path='/categories' element={<RequireAuth><Categories /></RequireAuth>} />
          <Route path='/category' element={<RequireAuth><Category /></RequireAuth>} />
        </Routes>
        <Footer />
      </AuthProvider>
    </BrowserRouter>

  );
}

export default App;
