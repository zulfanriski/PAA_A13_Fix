import React from 'react';
import Image from 'next/image';
import styles from '../styles/index.module.css'

export default function index() {
  return (
    <>
    <h1 className={styles.head}>
      Pilih Role anda!
    </h1>

    <div className={styles.box1}>
    <a href='loginAdmin'>admin</a>
    </div>

    <div className={styles.box2}>
    <a href='login'>siswa</a>
    </div>
    
    
    </>
  )
}
