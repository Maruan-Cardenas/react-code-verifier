import './App.css';

// React Router Dom import
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { KatasPage } from './pages/KatasPage';
import { KataDetailPage } from './pages/KataDetailPage';
import { KataCreation } from './pages/KataCreation';
function App() {
  return (
    <div className="App">
      <Router>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/katas">Katas</Link>
            </li>
             <li>
              <Link to="/createKata">Katas Creation</Link>
            </li>
          </ul>
        </nav>
      {/* TODO: Export to routes folder */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/katas" element={<KatasPage />} />
          <Route path="/katas/:id" element={<KataDetailPage />} />
          <Route path="/createKata" element={<KataCreation />} />
          {/* Redirect when page not found */}
          <Route path="*" element={<Navigate to='/' replace />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
