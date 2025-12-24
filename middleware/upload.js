const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        if (ext !== '.pdf' && ext !== '.docx') {
            return cb(new Error('Only PDFs and Docx are allowed'), false);
        }
        cb(null, true);
    }
});

module.exports = upload;