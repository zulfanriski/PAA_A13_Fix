import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from "../styles/loginadm.module.css";
import axios from 'axios';
import { parseCookies } from 'nookies';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('/api/loginAdmin', { email, password });
      const { data } = response;

      // Simpan token ke localStorage
      localStorage.setItem('token', data.token);

      // Redirect ke halaman utama
      router.push('/landing');
    } catch (error) {
      setError('Email atau password salah');
    }
  };

  return (
    <div className={styles.addform}>
      <form onSubmit={handleSubmit}>
        <h1 className={styles.head}>Login</h1>

        {error && <div className="error">{error}</div>}

        <div>
          <label className={styles.input} >Email</label>
          <input className={styles.input} type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div>
          <label className={styles.input}>Password</label>
          <input className={styles.input} type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>

        <button type="submit">Login</button>
      </form>
    </div>  
  );
}
