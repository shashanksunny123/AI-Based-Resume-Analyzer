import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContent'
import Loading from './Loading'

export default function ProtectedRoute({ children }) {
  const { user, loading, isAuthenticated } = useAuth()

  if (loading) {
    return <Loading />
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return children
}
