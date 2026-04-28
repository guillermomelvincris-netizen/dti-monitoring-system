"use client";
import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function PublicDirectory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [employees, setEmployees] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchStatuses = async () => {
    const { data, error } = await supabase
      .from('attendance')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      // Kunin lang ang pinakabagong status ng bawat tao
      const latest = data.reduce((acc: any[], current) => {
        const x = acc.find(item => item.employee_name === current.employee_name);
        if (!x) return acc.concat([current]);
        return acc;
      }, []);
      setEmployees(latest);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchStatuses();
    const channel = supabase
      .channel('public-updates')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'attendance' }, () => {
        fetchStatuses();
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, []);

  const filtered = employees.filter(e => 
    e.employee_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-white">
      {/* Sticky Header for Mobile */}
      <div className="sticky top-0 bg-blue-900 text-white p-5 shadow-lg z-10">
        <h1 className="text-xl font-bold">DTI BAYOMBONG</h1>
        <p className="text-xs text-blue-200">Live Employee Status</p>
        
        {/* Mobile Search Bar */}
        <div className="mt-4">
          <input 
            type="text" 
            placeholder="Search Staff Name..."
            className="w-full p-3 rounded-xl text-gray-800 text-sm outline-none focus:ring-2 focus:ring-yellow-500"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="p-4 space-y-3">
        {loading ? (
          <div className="text-center py-10 text-gray-400 italic text-sm">Loading staff directory...</div>
        ) : filtered.length > 0 ? (
          filtered.map((emp) => (
            <div key={emp.id} className="border border-gray-100 rounded-2xl p-4 shadow-sm flex items-center justify-between bg-gray-50">
              <div className="flex-1">
                <h2 className="font-bold text-gray-800">{emp.employee_name}</h2>
                <p className="text-[11px] text-gray-500 leading-tight mt-1">
                  {emp.remarks || "No specific remarks"}
                </p>
              </div>
              
              <div className="ml-4 text-right">
                <div className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter ${
                  emp.status === 'IN OFFICE' ? 'bg-green-500 text-white' :
                  emp.status === 'FIELD WORK' ? 'bg-blue-500 text-white' :
                  emp.status === 'MEETING' ? 'bg-orange-500 text-white' :
                  'bg-gray-400 text-white'
                }`}>
                  {emp.status}
                </div>
                <p className="text-[9px] text-gray-400 mt-2 italic">
                  As of {new Date(emp.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-20 text-gray-400 text-sm">No employee found.</div>
        )}
      </div>

      {/* Quick Footer Info */}
      <footer className="p-6 text-center text-[10px] text-gray-400 uppercase tracking-widest">
        DTI Nueva Vizcaya • Bayombong Office
      </footer>
    </main>
  );
}