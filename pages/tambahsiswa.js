import { NextApiRequest, NextApiResponse } from 'next'
import axios from "axios";
import React, { useState } from "react";
import { useRouter } from "next/router";
import styles from "../styles/tambahsiswa.module.css";
import Link from 'next/link';
function Addsiswa() {
  const router = useRouter();
  const [Addsiswa, setsiswa] = useState({
    Nama: "",
    Nomer_induk: "",
    Kelas: "",
    status: "",
    email: "",
    password: "",
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    let data = await axios.post(
      'http://localhost:3000/api/siswa',
      Addsiswa
    );
    if (data.data) router.push("/utama");
    setsiswa({
      Nama: "",
      Nomer_induk: "",
      Kelas: "",
      status: "",
      email: "",
      password: "",
    });
  };

  const handleChange = (e) => {
    const value = e.target.value;
    console.log("value", value);
    setsiswa({ ...Addsiswa, [e.target.name]: value });
  };
  return (
    <>
      <div className={styles.addform}>
        <h1 className={styles.head}>ADD SISWA</h1>
        <form onSubmit={onSubmit}>
          <div>
            <input
              type="text"
              className={styles.input}
              name="Nama"
              placeholder="Enter Name"
              onChange={handleChange}
              value={Addsiswa && Addsiswa.Nama}
            />
          </div>
          <div>
            <input
              type="number"
              className={styles.input}
              name="Nomer_induk"
              placeholder="Enter Induk Number"
              onChange={handleChange}
              value={Addsiswa && Addsiswa.Nomer_induk}
            />
          </div>
          <div>
  <select
    className={styles.input}
    name="Kelas"
    onChange={handleChange}
    value={Addsiswa && Addsiswa.Kelas}
  >
    <option value="">Pilih Kelas</option>
    <option value="Kelas 1">Kelas 1</option>
    <option value="Kelas 2">Kelas 2</option>
    <option value="Kelas 3">Kelas 3</option>
    {/* Tambahkan opsi lain sesuai dengan kebutuhan Anda */}
  </select>
</div>

<div>
  <select
    className={styles.input}
    name="status"
    onChange={handleChange}
    value={Addsiswa && Addsiswa.status}
  >
    <option value="">Pilih Status</option>
    <option value="AKTIF">AKTIF</option>
    <option value="TIDAK AKTIF">TIDAK AKTIF</option>
    
    {/* Tambahkan opsi lain sesuai dengan kebutuhan Anda */}
  </select>
</div>
          <div>
            <input
              type="email"
              className={styles.input}
              name="email"
              placeholder="Enter Email"
              onChange={handleChange}
              value={Addsiswa && Addsiswa.email}
            />
          </div>
          <div>
            <input
              type="text"
              className={styles.input}
              name="password"
              placeholder="Enter Password"
              onChange={handleChange}
              value={Addsiswa && Addsiswa.password}
            />
          </div>
          <div>
            <button type="submit"> Submit</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Addsiswa;