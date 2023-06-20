import multer from 'multer';
import { pool } from '../../config/db';

// Konfigurasi penyimpanan file menggunakan Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Folder tujuan penyimpanan file
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix); // Nama file yang disimpan di server
  }
});

const upload = multer({ storage });

export default upload.single('image'), async function uploadHandler(req, res) {
  if (!req.file) {
    res.status(400).json({ message: 'No file uploaded.' });
    return;
  }

  try {
    // Mendapatkan ID pengguna dari token JWT yang dikirimkan pada header Authorization
    const userId = req.user.id;

    // Mendapatkan informasi file yang diupload
    const { originalname, filename } = req.file;

    // Menyimpan informasi file ke dalam database
    const result = await pool.query(
      'INSERT INTO images (user_id, filename, originalname) VALUES (?, ?, ?)',
      [userId, filename, originalname]
    );

    res.status(200).json({ message: 'File uploaded successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Something went wrong.' });
  }
};
