'use client'

import React,  { useEffect,  useState } from 'react'
import { useAuth } from '@/providers/Auth'

const ChangeNameSection: React.FC = () => {
  const { user, updateUser } = useAuth()
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (user) {
      setName(user.name || '')
      setSurname(user.surname || '')
    }
  }, [user])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return
    try {
      await updateUser({ name, surname })
      setMessage('Zaktualizowano!')
    } catch {
      setMessage('Błąd aktualizacji!')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
      <h3 className="font-semibold text-xl">Zmień imię i nazwisko</h3>
      <div>
        <label className="block mb-1 font-medium">Imię</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="p-2 border rounded w-full"
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Nazwisko</label>
        <input
          type="text"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
          required
          className="p-2 border rounded w-full"
        />
      </div>
      <button type="submit">Zapisz zmiany</button>
      {message && <p className="mt-2">{message}</p>}
    </form>
  )
}

export default ChangeNameSection
