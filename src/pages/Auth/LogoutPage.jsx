import { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

export default function Logout() {
  const { logout, redirect } = useAuth();

  useEffect(() => {
    const performLogout = async () => {
      await logout();
      redirect('/');
    };
    performLogout();
  }, [logout, redirect]);

  return null;
}
