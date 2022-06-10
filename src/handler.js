const { nanoid } = require('nanoid')
const { isDataSaved } = require('./utils')
const notes = require('./notes')

const addNotes = (request, h) => {
  const { title, tags, body } = request.payload
  const id = nanoid()
  const updateAt = new Date().toISOString()
  const createdAt = updateAt
  notes.push({
    id, title, tags, body, createdAt, updateAt
  })

  if (isDataSaved(id)) {
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil ditambahkan',
      data: {
        noteId: id
      }
    })
    response.code(201)
    return response
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal ditambahkan'
  })
  response.code(500)
  return response
}

const getAllNotes = () => {
  return {
    status: 'success',
    data: {
      notes
    }
  }
}

const getNotesById = (request, h) => {
  const { id } = request.params
  const note = notes.filter(note => note.id === id)[0]
  if (note) {
    return {
      status: 'success',
      data: {
        note
      }
    }
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan tidak ditemukan'
  })
  response.code(404)
  return response
}

const editNotesById = (request, h) => {
  const { id } = request.params
  const { title, tags, body } = request.payload

  const index = notes.findIndex(note => note.id === id)

  if (index !== -1) {
    const updateAt = new Date().toISOString()
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      updateAt
    }

    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil diperbarui'
    })
    return response
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui catatan. Id tidak ditemukan'
  })
  response.code(404)
  return response
}

const deleteNoteById = (request, h) => {
  const { id } = request.params

  const index = notes.findIndex(note => note.id === id)
  if (index !== -1) {
    notes.splice(index, 1)
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil dihapus!'
    })
    return response
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal dihapus! Id tidak ditemukan'
  })
  response.code(404)
  return response
}

module.exports = {
  addNotes, getAllNotes, getNotesById, editNotesById, deleteNoteById
}
