import { useState } from 'react'
import { createNote } from '../api/notesApi'

function Note({ onNoteAdded = () => {}, accessToken = '' }) {
  const [note, setNote] = useState({ notesId: '', title: '', desc: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const addNote = async (e) => {
    e.preventDefault()
    setError('')

    if (!note.title.trim() || !note.desc.trim()) {
      setError('Title and Description are required')
      return
    }

    try {
      if (!accessToken) {
        setError('You must be signed in to add notes.')
        return
      }
      setIsSubmitting(true)
      const notesId =
        Math.random() < 0.5
          ? Math.floor(100 + Math.random() * 900) // 3-digit
          : Math.floor(1000 + Math.random() * 9000) // 4-digit

      await createNote({
        notesId: `${notesId}`,
        title: note.title.trim(),
        desc: note.desc.trim(),
        accessToken,
      })

      // Clear form and notify parent so list can refresh
      setNote({ notesId: '', title: '', desc: '' })
      onNoteAdded()
    } catch (err) {
      console.error('Error adding note', err)
      setError('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }

  return (
    <form onSubmit={addNote} className="space-y-3">
      <div>
        <label
          htmlFor="title"
          className="text-xs font-medium text-slate-600 block mb-1"
        >
          Title
        </label>
        <input
          type="text"
          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 placeholder:text-slate-400"
          id="title"
          name="title"
          value={note.title}
          onChange={onChange}
          required
        />
      </div>

      <div>
        <label
          htmlFor="desc"
          className="text-xs font-medium text-slate-600 block mb-1"
        >
          Description
        </label>
        <textarea
          id="desc"
          name="desc"
          className="w-full min-h-[90px] rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 placeholder:text-slate-400 resize-y"
          value={note.desc}
          onChange={onChange}
          required
        />
      </div>

      {error && (
        <p className="text-red-500 text-sm mb-2">
          {error}
        </p>
      )}

      {error && (
        <p className="text-red-500 text-xs">
          {error}
        </p>
      )}

      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2 text-xs font-medium text-white shadow-sm shadow-slate-900/20 transition hover:bg-slate-800 disabled:opacity-60 disabled:cursor-not-allowed"
          disabled={isSubmitting || !accessToken}
        >
          {!accessToken
            ? 'Sign in to add notes'
            : isSubmitting
              ? 'Saving...'
              : 'Add note'}
        </button>
      </div>
    </form>
  )
}

export default Note