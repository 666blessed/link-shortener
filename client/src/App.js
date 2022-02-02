import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import useAuth from './hooks/auth.hook';
import {AuthContext} from './context/AuthContext'; 
import {useRoutes} from './routes';
import Navbar from './components/Navbar';
import Loader from './components/Loader';

function App() {
  const {token, login, logout, userId, ready} = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);

  if (!ready) {
    return <Loader/>
  }

  return (
    <AuthContext.Provider value={{
      token, login, logout, userId, isAuthenticated
    }}>
      <Router>
        {isAuthenticated && <Navbar/>}
        <div>
          {routes}
        </div>
        <ToastContainer/>
      </Router>
    </AuthContext.Provider>
  );
} 

export default App;
