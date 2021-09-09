const router = require('express').Router();

// functions from lib/notes.js
const {getNotes, createNewNote, validateNote, deleteNote} = require('../../lib/notes');

// returns all saved notes
router.get('/notes', (req, res) => {
  res.json(getNotes());
});

// posts a new note to saved notes
router.post('/notes', (req, res) => {
  let newNote = req.body;

// validates posted notes
  if (!validateNote(newNote)) {
    res.status(400).send('This note is not properly formatted.');
  } else {
    newNote = createNewNote(newNote);
    res.json(newNote);
  }
});

// deletes a note from saved notes
router.delete('/notes/:id', (req, res) => {
  const {id} = req.params;
  const deletedNote = deleteNote(Number(id));
  if (deletedNote) {
    res.json(deletedNote);
  } else {
    res.status(404).send("This note doesn't exist");
  }
});

module.exports = router;