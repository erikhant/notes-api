const { addNotes, getAllNotes, getNotesById, editNotesById, deleteNoteById } = require('./handler')

const routes = [
  {
    method: 'POST',
    path: '/notes',
    handler: addNotes
  },
  {
    method: 'GET',
    path: '/notes',
    handler: getAllNotes
  },
  {
    method: 'GET',
    path: '/notes/{id}',
    handler: getNotesById
  },
  {
    method: 'PUT',
    path: '/notes/{id}',
    handler: editNotesById
  },
  {
    method: 'DELETE',
    path: '/notes/{id}',
    handler: deleteNoteById
  }
]

module.exports = routes
