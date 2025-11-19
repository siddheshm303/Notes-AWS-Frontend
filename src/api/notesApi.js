const API_URL = import.meta.env.VITE_API_URL ?? 'https://3p5o9ockqg.execute-api.ap-south-1.amazonaws.com/dev'

const ensureAccessToken = (accessToken) => {
  if (!accessToken) {
    throw new Error('Missing access token for authenticated request')
  }
}

const getAuthHeaders = (accessToken) => ({
  Authorization: `Bearer ${accessToken}`,
})

export async function getNotes(accessToken) {
  ensureAccessToken(accessToken)
  const res = await fetch(`${API_URL}/notes`, {
    method: 'GET',
    headers: {
      ...getAuthHeaders(accessToken),
    },
  })

  if (!res.ok) {
    throw new Error(`Failed to fetch notes: ${res.status} ${res.statusText}`)
  }

  return res.json()
}

export async function createNote({ notesId, title, desc, accessToken }) {
  ensureAccessToken(accessToken)
  const res = await fetch(`${API_URL}/notes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders(accessToken),
    },
    body: JSON.stringify({ notesId, title, desc }),
  })

  if (!res.ok) {
    throw new Error(`Failed to create note: ${res.status} ${res.statusText}`)
  }

  return res.json()
}

export async function deleteNoteById(notesId, accessToken) {
  ensureAccessToken(accessToken)
  const res = await fetch(`${API_URL}/notes/${notesId}`, {
    method: 'DELETE',
    headers: {
      ...getAuthHeaders(accessToken),
    },
  })

  if (!res.ok) {
    throw new Error(`Failed to delete note: ${res.status} ${res.statusText}`)
  }

  return res.json()
}

