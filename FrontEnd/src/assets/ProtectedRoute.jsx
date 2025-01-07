// ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  // Check if user is logged in (you can use a more secure way if needed)
  const isAuthenticated = localStorage.getItem('isLoggedIn') === 'true';

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
