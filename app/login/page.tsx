'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: window.location.origin }
    })
    if (error) alert(error.message)
    else setMessage("📩 Check your Gmail! May pinadala kaming login link.")
    setLoading(false)
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <form onSubmit={handleMagicLink} className="p-10 bg-white shadow-2xl rounded-3xl w-full max-w-sm border border-gray-100">
        <h1 className="text-2xl font-black text-blue-900 text-center uppercase tracking-tight">DTI Staff Access</h1>
        <p className="text-sm text-gray-500 text-center mt-2 mb-8 italic">No password needed. Just your email.</p>
        
        {message ? (
          <div className="p-4 bg-blue-50 text-blue-700 rounded-2xl text-center text-sm font-bold border border-blue-100 animate-bounce">
            {message}
          </div>
        ) : (
          <div className="space-y-4">
            <input 
              type="email" 
              placeholder="Enter your Gmail" 
              className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none"
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
            <button className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-blue-100">
              {loading ? 'Sending...' : 'Send Login Link'}
            </button>
          </div>
        )}
      </form>
    </div>
  )
}
