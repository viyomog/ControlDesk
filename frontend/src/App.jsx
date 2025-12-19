import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CreateServer from './pages/CreateServer';
import Billing from './pages/Billing';
import Settings from './pages/Settings';
import ServerDetails from './pages/ServerDetails';
import LandingPage from './pages/LandingPage';
import Layout from './components/Layout';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<PrivateRoute />}>
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/servers" element={<Dashboard />} />
          <Route path="/create-server" element={<CreateServer />} />
          <Route path="/billing" element={<Billing />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/server/:id" element={<ServerDetails />} />
        </Route>
      </Route>
      <Route path="*" element={<div className="h-screen bg-background text-white flex items-center justify-center">404 - Not Found</div>} />
    </Routes>
  );
}

export default App;
