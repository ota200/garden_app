import logo from './logo.svg';
import './App.css';

/* Imports React Router parts
- Router: wraps the app and enables client side routing
- Routes + Route: Decleares which componet shows for each URL path
- Link: renders <a> tags that navigate with out page having to reload.
*/
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';


// Import 3 pages componets for the 3 diffrent routes
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import PlantsPage from "./pages/PlantsPage";
import ProfilePage from "./pages/ProfilePage";



function App() {
  
  return (
    <Router>
      {/* Router must wrap everything that uses routing 
      
      And a nav bar full of links to the paths, using Link so the URL changes without page fully reloading*/}
      <nav>
        <Link to="/">Home</Link> | {" "}
        <Link to="/auth">Login/Sign Up</Link> | {" "}
        <Link to="/plants">My Plants</Link> | {" "}
        <Link to="/profile">My Profile</Link>

      </nav>

      <Routes>
        {/* Basically when Url is exactly "/" render HomePage componet and so on */}
        <Route path="/" element={<HomePage />}/>
        <Route path="/auth" element={<AuthPage />}/>
        <Route path="/plants" element={<PlantsPage />}/>
        <Route path="/profile" element={<ProfilePage/>}/>

      </Routes>
    </Router>
  );
}

export default App;
