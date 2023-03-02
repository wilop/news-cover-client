import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Matchs from './pages/Matchs';
import Standings from './pages/Standings'
import Teams from './pages/Teams';
import NoPage from './pages/NoPage';

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
          <Route index path='/' element={<RequireAuth><Teams /></RequireAuth>} />
          <Route path='/teams' element={<RequireAuth><Teams /></RequireAuth>} />
          <Route path='/matchs' element={<RequireAuth><Matchs /></RequireAuth>} />
          <Route path='/standings' element={<RequireAuth><Standings /></RequireAuth>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>

  );
}

export default App;
