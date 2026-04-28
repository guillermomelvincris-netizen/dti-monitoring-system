"use client";
import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function Home() {
  const [employeeName, setEmployeeName] = useState("");
  const [status, setStatus] = useState("NOT SET");
  const [isSaving, setIsSaving] = useState(false);
  const [remarks, setRemarks] = useState("");

  // Step 1: "Remember Me" logic - kukunin ang name sa browser memory
  useEffect(() => {
    const savedName = localStorage.getItem("dti_employee_name");
    if (savedName) {
      setEmployeeName(savedName);
    }
  }, []);

  const updateStatus = async (newStatus: string) => {
    if (!employeeName) {
      alert("Please enter your name first.");
      return;
    }

    setIsSaving(true);
    // I-save ang name para sa susunod na gamit
    localStorage.setItem("dti_employee_name", employeeName);

    const { error } = await supabase
      .from('attendance')
      .insert([
        { 
          employee_name: employeeName, 
          status: newStatus,
          remarks: remarks // Isasama na natin ang remarks
        }
      ]);

    setIsSaving(false);

    if (error) {
      alert("Error: " + error.message);
    } else {
      setStatus(newStatus);
      alert(`Status updated to ${newStatus}!`);
      setRemarks(""); // I-clear ang remarks matapos mag-save
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-blue-100">
        
        {/* Header */}
        <div className="bg-blue-900 p-6 text-center text-white">
          <h1 className="text-2xl font-bold tracking-tight">DTI BAYOMBONG</h1>
          <p className="text-blue-200 text-sm">EMPLOYEE PRESENCE SYSTEM</p>
        </div>

        <div className="p-8 space-y-6">
          {/* Employee Name Input */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase mb-2 tracking-wider">
              Employee Name
            </label>
            <input 
              type="text" 
              placeholder="Enter Full Name"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-700 font-medium"
              value={employeeName}
              onChange={(e) => setEmployeeName(e.target.value)}
            />
          </div>

          {/* Live Status Display */}
          <div className="bg-blue-50 rounded-xl p-4 border border-dashed border-blue-200 text-center">
            <p className="text-[10px] font-bold text-blue-400 uppercase tracking-[0.2em] mb-1">Live Status</p>
            <p className={`text-xl font-black ${status === 'NOT SET' ? 'text-gray-400' : 'text-blue-900'}`}>
              {status}
            </p>
          </div>

          {/* Optional Remarks */}
          <div>
            <label className="block text-[10px] font-semibold text-gray-500 uppercase mb-2 tracking-wider">
              Remarks (e.g., Back at 2PM / Meeting at Solano)
            </label>
            <input 
              type="text" 
              placeholder="Optional message for clients..."
              className="w-full px-4 py-2 rounded-lg border border-gray-100 bg-gray-50 text-sm outline-none"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
            />
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 gap-3">
            <button 
              disabled={isSaving}
              onClick={() => updateStatus("IN OFFICE")}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all active:scale-95 disabled:opacity-50"
            >
              {isSaving ? "SAVING..." : "IN OFFICE"}
            </button>
            
            <button 
              disabled={isSaving}
              onClick={() => updateStatus("FIELD WORK")}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-xl transition-all active:scale-95 disabled:opacity-50"
            >
              FIELD WORK
            </button>

            <button 
              disabled={isSaving}
              onClick={() => updateStatus("MEETING")}
              className="w-full bg-blue-400 hover:bg-blue-500 text-white font-bold py-3 rounded-xl transition-all active:scale-95 disabled:opacity-50"
            >
              MEETING
            </button>

            <button 
              disabled={isSaving}
              onClick={() => updateStatus("OUT OF OFFICE")}
              className="w-full bg-gray-400 hover:bg-gray-500 text-white font-bold py-3 rounded-xl transition-all active:scale-95 disabled:opacity-50"
            >
              OUT OF OFFICE
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}