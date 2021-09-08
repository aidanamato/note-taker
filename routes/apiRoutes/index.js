const router = require('express').Router();

const {getNotes, createNewNote, validateNote, deleteNote} = require('../../lib/notes');

router.get('/notes', (req, res) => {
  res.json(getNotes());
});

router.post('/notes', (req, res) => {
  let newNote = req.body;

  if (!validateNote(newNote)) {
    res.status(400).send('This note is not properly formatted.');
  } else {
    newNote = createNewNote(newNote);
    res.json(newNote);
  }
});

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