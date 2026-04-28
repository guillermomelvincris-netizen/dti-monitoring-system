'use client'
import { supabase } from '@/lib/supabase'
import { useState } from 'react'

export default function LoginPage() {
  const [loading, setLoading] = useState(false)

  const handleGoogleLogin = async () => {
    setLoading(true)
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin, // Babalik sa dashboard pag click ng Google account
      },
    })
    
    if (error) {
      alert("Error: " + error.message)
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4 font-sans">
      <div className="p-10 bg-white shadow-2xl rounded-3xl w-full max-w-sm border border-gray-100 text-center">
        <h1 className="text-2xl font-black text-blue-900 uppercase mb-2">DTI Staff Access</h1>
        <p className="text-xs text-gray-500 mb-10">Use your official Google account to continue.</p>
        
        <button 
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 py-4 rounded-2xl font-bold text-gray-700 hover:bg-gray-50 transition-all shadow-sm active:scale-95 disabled:opacity-50"
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
          {loading ? 'Connecting...' : 'Continue with Google'}
        </button>

        <p className="mt-8 text-[10px] text-gray-400 uppercase tracking-widest">
          Secure Internal Access
        </p>
      </div>
    </div>
  )
}