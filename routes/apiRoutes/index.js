const router = require('express').Router();

const {createNewNote} = require('../../lib/notes');
const db = require('../../db/db');

router.get('/notes', (req, res) => {
  res.json(db);
});

router.post('/notes', (req, res) => {
  const newNote = req.body;
  newNote.id = (db.length + 1).toString();
  createNewNote(newNote, db);
  res.json(newNote);
});

module.exports = router;