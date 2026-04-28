'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [msg, setMsg] = useState('')

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } }
    })
    if (error) alert(error.message)
    else setMsg("Success! Hintayin ang approval ni Admin bago mag-login.")
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <form onSubmit={handleRegister} className="p-8 bg-white shadow-xl rounded-3xl w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6">Staff Registration</h1>
        {msg && <p className="text-green-600 mb-4">{msg}</p>}
        <div className="space-y-4">
          <input className="w-full p-4 bg-gray-100 rounded-2xl outline-none" placeholder="Full Name" onChange={e => setFullName(e.target.value)} required />
          <input className="w-full p-4 bg-gray-100 rounded-2xl outline-none" type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} required />
          <input className="w-full p-4 bg-gray-100 rounded-2xl outline-none" type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} required />
          <button className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold">Register</button>
        </div>
      </form>
    </div>
  )
}
