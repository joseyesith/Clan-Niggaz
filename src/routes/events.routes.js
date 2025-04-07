import { Router } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";

// Si estás en ES Modules, necesitas esto para __dirname
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = Router();


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, "../../public/imagenes");
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

router.post("/", upload.single("file"), (req, res) => {
  console.log(req.file);
  res.status(200).json({ message: "Archivo subido correctamente", file: req.file });
});

export default router;
