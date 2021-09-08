const router = require('express').Router();

const {createNewNote, validateNote} = require('../../lib/notes');
const db = require('../../db/db');

router.get('/notes', (req, res) => {
  res.json(db);
});

router.post('/notes', (req, res) => {
  const newNote = req.body;
  newNote.id = (db.length + 1).toString();

  if (!validateNote(newNote)) {
    res.status(400).send('This note is not properly formatted.');
  } else {
    createNewNote(newNote, db);
    res.json(newNote);
  }
});

module.exports = router;