const fs = require('fs');
const path = require('path');
let notes = require('../db/db');

const getNotes = () => notes;

const createNewNote = note => {
  if (!notes[0]) {
    note.id = 1;
  } else {
    note.id = (notes[notes.length - 1].id) + 1;
  }
  
  notes.push(note);
  fs.writeFileSync(
    path.join(__dirname, '../db/db.json'),
    JSON.stringify(notes, null, 2)
  );
  return note;
};

const validateNote = note => {
  if (!note.title || typeof note.title !== "string") {
    return false;
  }
  if (!note.text || typeof note.text !== "string") {
    return false;
  }
  return true;
};

const deleteNote = id => {
  const deletedNote = notes.find(note => note.id === id);
  if (deletedNote) {
    notes = notes.filter(note => note.id !== id);
    console.log(notes);
    fs.writeFileSync(
      path.join(__dirname, '../db/db.json'),
      JSON.stringify(notes, null, 2)
    );

    return deletedNote;
  }
};

module.exports = {
  getNotes,
  createNewNote,
  validateNote,
  deleteNote
};