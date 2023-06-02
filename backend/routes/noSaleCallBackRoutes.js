// routes/noSaleCallBack.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const connection = require('../database/database');

router.post('/', upload.single('file'), (req, res) => {
    // Perform the no sale call back data update logic
    // - Read the uploaded Excel file (req.file.path)
    // - Extract the required column data
    // - Insert the data into the SQL table

    res.status(200).json({ message: 'No sale call back data update successful' });
});

module.exports = router;
