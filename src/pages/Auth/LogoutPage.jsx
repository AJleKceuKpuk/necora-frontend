import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function LogoutPage() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    const performLogout = async () => {
      await logout(); // удаляет токен, вызывает POST /auth/logout
      navigate('/'); // или '/', если хочешь на главную
    };

    performLogout();
  }, []);

  return <div>Выход...</div>; // можно показать спиннер или просто текст
}
