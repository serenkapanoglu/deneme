import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, uid }) => {
    if (!uid) {
        console.log(uid);
        return <Navigate to='/login' />;
    }
    return children;
};

export default ProtectedRoute;