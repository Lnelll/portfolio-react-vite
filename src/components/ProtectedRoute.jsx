import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  // Mengecek token otentikasi tiruan di Local Storage
  const isAuthenticated = localStorage.getItem("isAdminLoggedIn") === "true";

  // Jika belum login, paksa pindah ke halaman login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Jika sudah login, tampilkan halaman yang diminta
  return children;
}

export default ProtectedRoute;