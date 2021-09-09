const path = require('path');
const router = require('express').Router();

// get notes.html
router.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/notes.html'));
});

// get index.html
router.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/'));
});

module.exports = router;