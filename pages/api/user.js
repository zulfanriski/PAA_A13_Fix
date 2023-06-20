import jwt from 'jsonwebtoken';
import { pool } from '../../config/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Mendapatkan token dari header permintaan
      const token = req.headers.authorization?.replace('Bearer ', '');

      if (!token) {
        res.status(401).json({ message: 'Authorization token not found.' });
        return;
      }

      // Memverifikasi dan mendekode token JWT
      const decodedToken = jwt.verify(token, 'ZUL');

      // Mendapatkan ID pengguna dari token
      const userId = decodedToken.id;

      // Mengambil data pengguna dari database berdasarkan ID
      const [user] = await pool.query('SELECT * FROM datasiswa WHERE id = ?', [userId]);

      if (!user) {
        res.status(404).json({ message: 'User not found.' });
        return;
      }

      res.status(200).json({ user });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Something went wrong.' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed.' });
  }
}
