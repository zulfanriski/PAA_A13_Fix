import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';
import jwt from 'jsonwebtoken';
import styles from '../styles/bayar.module.css';

export async function getServerSideProps(context) {
  const cookies = parseCookies(context);
  const { token } = cookies;

  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  try {
    const decoded = jwt.verify(token, 'ZUL');

    return {
      props: {},
    };
  } catch (error) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
}

export default function Kas() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [nominal, setNominal] = useState('');
  const [tanggal, setTanggal] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    } else {
      fetch('/api/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setUser(data.user);
        })
        .catch((error) => {
          console.error('Error:', error);
          router.push('/login');
        });
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('/api/bayarkas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nama: user?.Nama,
        kelas: user?.Kelas,
        nominal,
        nomer_absen: user?.Nomer_induk,
        tanggal,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      setIsPaymentSuccess(true);
    } else {
      setErrorMessage(data.message);
    }
  };

  return (
    <div className={styles.addform}>
      {user ? (
        <>
          <h1 className={styles.head}>Bayar Kas</h1>
          <form onSubmit={handleSubmit}>
            <label className={styles.label}>
              Name:
              <input className={styles.input} type="text" value={user.Nama} readOnly />
            </label>
            <label className={styles.label}>
              Kelas:
              <input className={styles.input} type="text" value={user.Kelas} readOnly />
            </label>
            <label className={styles.label}>
              Nomer Induk:
              <input className={styles.input} type="number" value={user.Nomer_induk} readOnly />
            </label>
            <label className={styles.label}>
              Nominal:
              <input className={styles.input} type="number" value={nominal} onChange={(e) => setNominal(e.target.value)} />
            </label>
            <label>
              Tanggal:
              <input type="date" value={tanggal} onChange={(e) => setTanggal(e.target.value)} />
            </label>
            {errorMessage && <p>{errorMessage}</p>}
            <br></br>
            <button type="submit">Bayar</button>
          </form>
        </>
      ) : (
        <p>Loading...</p>
      )}

      {isPaymentSuccess && (
        <div className={styles.popup}>
          <h2>Pembayaran Berhasil!</h2>
          <p>Terima kasih atas pembayaran Anda.</p>
          < a href='siswahome'>
          <button  onClick={() => setIsPaymentSuccess(false)}>Tutup</button>

          </a>
        </div>
      )}
    </div>
  );
}
