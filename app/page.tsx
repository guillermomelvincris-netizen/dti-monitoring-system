'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function StaffDashboard() {
  const [user, setUser] = useState<any>(null)
  const [employee, setEmployee] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        // Kung hindi naka-login, itatapon sa Login Page
        router.push('/login')
      } else {
        setUser(user)
        // Hanapin ang profile gamit ang User ID na nilink natin sa Supabase
        const { data } = await supabase.from('employees').select('*').eq('user_id', user.id).single()
        setEmployee(data)
      }
    }
    checkUser()
  }, [router])

  async function updateStatus(status: string) {
    if (!user) return
    const { error } = await supabase.from('employees').update({ status }).eq('user_id', user.id)
    if (!error) setEmployee({ ...employee, status })
  }

  if (!employee && user) return <div className="p-10 text-center text-gray-500">Loading profile...</div>
  if (!user) return null 

  return (
    <div className="p-6 max-w-md mx-auto min-h-screen bg-white">
      <div className="flex justify-between items-center mb-10">
        <span className="text-xs font-bold text-blue-900 tracking-widest uppercase">DTI Staff Panel</span>
        <button onClick={() => supabase.auth.signOut().then(() => router.push('/login'))} className="text-xs text-red-500 font-medium">Logout</button>
      </div>

      <h1 className="text-3xl font-black text-gray-900 mb-1">{employee.name}</h1>
      <p className="text-gray-500 mb-8">Status: <span className="text-blue-600 font-bold">{employee.status}</span></p>

      <div className="grid gap-4">
        {['In Office', 'Field', 'Meeting', 'Leave'].map((s) => (
          <button
            key={s}
            onClick={() => updateStatus(s)}
            className={`p-5 rounded-2xl font-bold text-lg transition-all shadow-sm ${
              employee.status === s 
                ? 'bg-blue-600 text-white scale-[1.02] shadow-blue-200' 
                : 'bg-gray-50 text-gray-600 border border-gray-100 hover:bg-gray-100'
            }`}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  )
}