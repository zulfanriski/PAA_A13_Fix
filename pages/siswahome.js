import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/siswahome.module.css'


export default function Landing() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    } else {
      fetch('/api/user', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(response => response.json())
        .then(data => {
          setUser(data.user);
        })
        .catch(error => {
          console.error('Error:', error);
          router.push('/login');
        });
    }
  }, []);

  const handleLogout = () => {
    // Clear the token from local storage
    localStorage.removeItem('token');

    // Redirect to the login page
    router.push('/login');
  };

  return (
    <div>
      {user && (
        <div>
          <h1 className={styles.head}>Welcome, {user.Nama}!</h1>
          <a href='bayar'>
          <button className={styles.box1}>Bayar Kas</button>

          </a>
          <button onClick={handleLogout} className={styles.box2}>Logout</button>
        </div>
      )}
    </div>
  );
}
