
import { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const HomeRedirect = () => {
    const { authData } = useAuth();
    const navigate = useNavigate();
  
    useEffect(() => {
      switch (authData.role) {
        case 'ADMIN':
          navigate("/admin-home");
          break;
        case 'SELLER':
          navigate("/seller-home");
          break;
        case 'BUYER':
          navigate("/buyer-home");
          break;
        default:
          navigate("/buyer-home");
      }
    }, [authData.role, navigate]);
  };

export default HomeRedirect;