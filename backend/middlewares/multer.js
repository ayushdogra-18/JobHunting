import multer from 'multer';

const storage = multer.memoryStorage();

export const singleUpload=multer({storage}).single("file");
// .single("file")  // file is the key name from frontend form data

