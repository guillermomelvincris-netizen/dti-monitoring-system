'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    // Sinusubukan nating mag-login sa Supabase Auth
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    
    if (error) {
      alert("Error: " + error.message)
      setLoading(false)
    } else {
      // Pag success, pupunta siya sa Dashboard (Main Page)
      router.push('/')
      router.refresh()
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4 font-sans">
      <form onSubmit={handleLogin} className="p-10 bg-white shadow-2xl rounded-3xl w-full max-w-sm border border-gray-100">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-black text-blue-900 uppercase tracking-tight">DTI Staff Access</h1>
          <p className="text-sm text-gray-500 mt-2">Enter your official credentials</p>
        </div>
        
        <div className="space-y-5">
          <div>
            <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1 ml-1 tracking-widest">Email Address</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className="w-full p-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900" 
              placeholder="email@dti.gov.ph" 
              required 
            />
          </div>
          
          <div>
            <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1 ml-1 tracking-widest">Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              className="w-full p-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900" 
              placeholder="••••••••" 
              required 
            />
          </div>
        </div>
        
        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold mt-10 hover:bg-blue-700 active:scale-[0.98] transition-all shadow-xl shadow-blue-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Verifying...' : 'Sign In'}
        </button>
        
        <p className="text-center text-[10px] text-gray-400 mt-8 uppercase tracking-widest">
          Authorized Personnel Only
        </p>
      </form>
    </div>
  )
}