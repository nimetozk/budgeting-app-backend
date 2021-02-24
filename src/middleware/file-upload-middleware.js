/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/no-explicit-any */
import multer from "multer";

const storage = multer.memoryStorage();

const tabFileFilter = (req, file, cb) => {
  console.log(file.mimetype);
  if (file.mimetype === "text/plain") {
    cb(null, true);
  } else {
    cb(new Error("Tsv file uploaded is not of type text/plain"), false);
  }
};

export const uploadTsvHandler = multer({
  storage,
  limits: { fileSize: 1000000 },
  fileFilter: tabFileFilter,
}).single("myTsvFile");
