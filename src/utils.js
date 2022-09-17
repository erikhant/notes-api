const notes = require('./notes');

const isDataSaved = (id) => notes.filter((note) => note.id === id).length > 0;

module.exports = {
  isDataSaved,
};
