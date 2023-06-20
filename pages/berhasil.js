import React from 'react'
import styles from '../styles/berhasil.module.css'

export default function berhasil() {
  return (
    <div>
      <h1 className={styles.head}>Berhasil melakukan pembayaran</h1>
      <a href='bayar'>
      <button className={styles.button}>Klik untuk kembali</button>

      </a>
    </div>
  )
}
