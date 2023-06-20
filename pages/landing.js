import React from 'react';
import nookies from 'nookies';
import styles from '../styles/landing.module.css';

function Landing({ data }) {
  const handleLogout = () => {
    // Remove the 'token' cookie or perform any other necessary logout logic
    nookies.destroy(null, 'token');

    // Redirect to the login page
    window.location.href = '/loginAdmin';
  };

  return (
    <>
      <h1 className={styles.head}>Selamat Datang Admin</h1>
      <div className={styles.a}>
        <a href="lihatKas">
          <h1>lihat data kas</h1>
        </a>
      </div>
      <div className={styles.b}>
        <a href="utama">
          <h1>Data siswa</h1>
        </a>
      </div>
      <button onClick={handleLogout} className={styles.c}>Logout</button>
    </>
  );
}

export async function getServerSideProps(ctx) {
  const res = await fetch('http://localhost:3000/api/loginAdmin');
  const data = await res.json();
  const cookies = nookies.get(ctx);

  if (!cookies.token) {
    return {
      redirect: {
        destination: '/loginAdmin'
      }
    };
  }

  return {
    props: { data }
  };
}

export default Landing;
