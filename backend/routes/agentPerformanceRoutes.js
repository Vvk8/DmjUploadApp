// routes/agentPerformance.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const connection = require('../database/database');

router.post('/', upload.single('file'), (req, res) => {
    // Get date from the selected input date field
    const date = req.body.date;
    const file = req.file;

    // Read the uploaded Excel file and extract the vchpesudoname values
    excelService.readColumnFromFile(file.path, 'vchpesudoname')
        .then((vchpesudonames) => {
            // Query to fetch the user ID from tbmstuserprocess table
            const query = `SELECT userid FROM tbmstuserprocess WHERE vchpesudoname IN (?)`;

            connection.query(query, [vchpesudonames], (error, results) => {
                if (error) {
                    console.error('Error fetching user ID:', error);
                    res.status(500).json({ error: 'Internal server error' });
                    return;
                }

                // Create a mapping of vchpesudoname to userid
                const userIdMap = {};
                results.forEach((row) => {
                    userIdMap[row.vchpesudoname] = row.userid;
                });

                // Perform further processing using the userIdMap
                // ...

                res.status(200).json({ message: 'Agent performance update successful' });
            });
        })
        .catch((error) => {
            console.error('Error reading Excel file:', error);
            res.status(500).json({ error: 'Internal server error' });
        });
});
module.exports = router;
