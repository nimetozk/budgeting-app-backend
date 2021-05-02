/**
 * This part provides the functions to handle bank statement uploads
 *
 * I have used the following documentation to understand the 'Multer' library:
 * https://www.npmjs.com/package/multer
 */

import multer from "multer";

const storage = multer.memoryStorage();

const tabFileFilter = (req, file, cb) => {
  // console.log(file.mimetype);
  if (file.mimetype === "text/plain") {
    cb(null, true);
  } else {
    cb(new Error("Tsv file uploaded is not text/plain"), false);
  }
};

export const uploadTsvHandler = multer({
  storage,
  limits: { fileSize: 1000000 },
  fileFilter: tabFileFilter,
}).single("myTsvFile");
