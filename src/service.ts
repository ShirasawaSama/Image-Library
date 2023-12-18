const ENDPOINT = process.env.ENDPOINT!

const TOKEN = localStorage.getItem('token')

export const username = TOKEN ? JSON.parse(window.atob(TOKEN.split('.')[1].replace(/-/g, '+').replace(/_/g, '/'))).username : null

export const searchImages = async (page: number, search: string, profileUsername: string) =>
  fetch(`${ENDPOINT}/images?page=${page}&search=${encodeURIComponent(search)}&username=${profileUsername}`).then(res => res.json())

export const register = async (username: string, password: string) =>
  fetch(`${ENDPOINT}/register`, {
    method: 'PUT',
    body: JSON.stringify({ username, password })
  }).then(res => res.json()).then(res => {
    if (res.error) throw new Error(res.error)
    localStorage.setItem('token', res.token)
    return true
  }).catch(e => {
    console.error(e)
    return false
  })

export const login = async (username: string, password: string) =>
  fetch(`${ENDPOINT}/login`, {
    method: 'POST',
    body: JSON.stringify({ username, password })
  }).then(res => res.json()).then(res => {
    if (res.error) throw new Error(res.error)
    localStorage.setItem('token', res.token)
    return true
  }).catch(e => {
    console.error(e)
    return false
  })

export const upload = async (file: File, title: string, details: string) => {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('title', title)
  formData.append('details', details)

  const res = await fetch(`${ENDPOINT}/upload`, {
    method: 'PUT',
    body: formData,
    headers: {
      Authorization: `Bearer ${TOKEN}`
    }
  })

  if (res.status === 401) {
    localStorage.removeItem('token')
    window.location.reload()
  }

  return res.json()
}

export const translate = async (id: string) => fetch(`${ENDPOINT}/translate/${id}`).then(res => res.json()).then(res => res.details)

export const deleteImage = async (id: string) => fetch(`${ENDPOINT}/image/${id}`, {
  method: 'DELETE',
  headers: {
    Authorization: `Bearer ${TOKEN}`
  }
}).then(res => res.json()).then(({ success }) => success as boolean)
