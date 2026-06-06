import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("isAdminLoggedIn") === "true";

  function handleLogout() {
    localStorage.removeItem("isAdminLoggedIn");
    navigate("/");
  }

  return (
    <nav>
      <div>
        <div style={{ display: 'flex', gap: '20px' }}>
          <Link to="/">Home</Link>
          <Link to="/experience">Experience</Link>
          <Link to="/about">About</Link>
        </div>
        
        {isAuthenticated && (
          <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
            <Link to="/admin" style={{ color: '#0ea5e9', fontWeight: 'bold', textDecoration: 'none' }}>Panel Admin</Link>
            <button onClick={handleLogout} className="btn-danger">Logout</button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;