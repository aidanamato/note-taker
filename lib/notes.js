// dependencies
const fs = require('fs');
const path = require('path');
let notes = require('../db/db');

// returns all notes
const getNotes = () => notes;

// creates a new note
const createNewNote = note => {
  // if this is the first note, give an id of 1
  if (!notes[0]) {
    note.id = 1;
  } else {
    // give an id equal to 1 plus the last id of saved notes
    note.id = (notes[notes.length - 1].id) + 1;
  }
  // push note to saved notes
  notes.push(note);
  // rewrite notes in db.json to include the new note
  fs.writeFileSync(
    path.join(__dirname, '../db/db.json'),
    JSON.stringify(notes, null, 2)
  );
  // return the new note as a response
  return note;
};

// checks if note has a proper title and text content
const validateNote = note => {
  if (!note.title || typeof note.title !== "string") {
    return false;
  }
  if (!note.text || typeof note.text !== "string") {
    return false;
  }
  return true;
};

// delete a note from saved notes
const deleteNote = id => {
  // finds note to be deleted by id
  const deletedNote = notes.find(note => note.id === id);
  if (deletedNote) {
    // return notes array that does not include the deleted note
    notes = notes.filter(note => note.id !== id);
    // rewrite notes in db.json to not include the deleted note
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