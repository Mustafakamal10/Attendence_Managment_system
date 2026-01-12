import React, { useState } from 'react'
import Navbar from '../../Components/Navbar'
import Sidebar from '../../Components/Sidebar'
import { FaCheck, FaTimes } from "react-icons/fa";
import { useStudents } from '../../contexts/StudentsContext'

function TakeAttendance() {
  const { students, saveAttendance, findSession } = useStudents()
  const today = new Date().toISOString().slice(0, 10)
  
  const [className, setClassName] = useState('')
  const [section, setSection] = useState('')
  const [subject, setSubject] = useState('')
  const [date, setDate] = useState(today)
  const [active, setActive] = useState(false)
  const [attendanceMap, setAttendanceMap] = useState({})

  function handleStart() {
    if (!className || !section || !subject || !date) {
      return alert('Please select class, section, subject and date')
    }
    
    const filtered = students.filter(s => 
      s.class === className && s.section === section && s.subject === subject
    )
    
    if (filtered.length === 0) {
      return alert('No students found for the selected filters')
    }

    const session = findSession(date, { className, section, subject })
    const map = {}
    
    if (session && session.records) {
      session.records.forEach(r => (map[r.studentId] = r.status))
    } else {
      filtered.forEach(s => (map[s.id] = 'absent'))
    }
    
    setAttendanceMap(map)
    setActive(true)
  }

  function setStatus(studentId, status) {
    setAttendanceMap(prev => ({ ...prev, [studentId]: status }))
  }

  function handleSave() {
    const filtered = students.filter(s => 
      s.class === className && s.section === section && s.subject === subject
    )
    const arr = filtered.map(s => ({ 
      studentId: s.id, 
      status: attendanceMap[s.id] || 'absent' 
    }))
    saveAttendance(date, arr, { className, section, subject })
    alert('Attendance saved successfully!')
  }

  const visibleStudents = students.filter(s => 
    s.class === className && s.section === section && s.subject === subject
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <Navbar />

      {/* FIXED: Added lg:ml-64 for proper spacing */}
      <div className="lg:ml-64 pt-20 px-4 md:px-6 lg:px-8 pb-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-4 md:p-6 mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            Take Attendance
          </h1>
          <p className="text-gray-600 text-sm md:text-base">
            Mark student attendance for the day
          </p>
        </div>

        {/* Class Details Form */}
        <div className="bg-white rounded-lg shadow-md p-4 md:p-6 mb-6">
          <h2 className="text-lg md:text-xl font-semibold mb-4">Class Details</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            <div>
              <label className="block text-gray-700 mb-2 text-sm md:text-base font-medium">
                Class
              </label>
              <select
                className="w-full p-2 md:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm md:text-base"
                value={className}
                onChange={e => setClassName(e.target.value)}
              >
                <option value="">Select Class</option>
                <option value="9">9th</option>
                <option value="10">10th</option>
                <option value="11">11th</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 mb-2 text-sm md:text-base font-medium">
                Section
              </label>
              <select
                className="w-full p-2 md:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm md:text-base"
                value={section}
                onChange={e => setSection(e.target.value)}
              >
                <option value="">Select Section</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 mb-2 text-sm md:text-base font-medium">
                Subject
              </label>
              <select
                className="w-full p-2 md:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm md:text-base"
                value={subject}
                onChange={e => setSubject(e.target.value)}
              >
                <option value="">Select Subject</option>
                <option value="Mathematics">Mathematics</option>
                <option value="English">English</option>
                <option value="Science">Science</option>
                <option value="Computer">Computer</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 mb-2 text-sm md:text-base font-medium">
                Date
              </label>
              <input
                type="date"
                className="w-full p-2 md:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm md:text-base"
                value={date}
                onChange={e => setDate(e.target.value)}
              />
            </div>
          </div>

          <div className="mt-4 md:mt-6">
            <button
              onClick={handleStart}
              className="w-full sm:w-auto bg-blue-600 text-white px-6 py-2 md:py-3 rounded-lg hover:bg-blue-700 text-sm md:text-base"
            >
              Start Attendance
            </button>
          </div>
        </div>

        {/* Attendance List */}
        {active && (
          <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
            <h2 className="text-lg md:text-xl font-semibold mb-4">
              Attendance List ({visibleStudents.length} students)
            </h2>

            {visibleStudents.length === 0 ? (
              <p className="text-red-600">No students found for selected filters</p>
            ) : (
              <>
                {/* Desktop Table */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-200">
                        <th className="px-4 py-3 text-left text-sm font-semibold">Roll No</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold">Student Name</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold">Attendance Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {visibleStudents.map((s) => (
                        <tr key={s.id} className="hover:bg-gray-50 border-b">
                          <td className="px-4 py-3 text-sm">{s.roll}</td>
                          <td className="px-4 py-3 text-sm">{s.name}</td>
                          <td className="px-4 py-3 flex gap-3">
                            <button
                              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${
                                attendanceMap[s.id] === 'present'
                                  ? 'bg-green-100 text-green-700 font-semibold'
                                  : 'hover:bg-green-50 text-green-600'
                              }`}
                              onClick={() => setStatus(s.id, 'present')}
                            >
                              <FaCheck /> Present
                            </button>
                            <button
                              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${
                                attendanceMap[s.id] === 'absent'
                                  ? 'bg-red-100 text-red-700 font-semibold'
                                  : 'hover:bg-red-50 text-red-600'
                              }`}
                              onClick={() => setStatus(s.id, 'absent')}
                            >
                              <FaTimes /> Absent
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Cards */}
                <div className="md:hidden space-y-3">
                  {visibleStudents.map((s) => (
                    <div key={s.id} className="bg-gray-50 p-4 rounded-lg border">
                      <div className="mb-3">
                        <h3 className="font-semibold text-lg">{s.name}</h3>
                        <p className="text-sm text-gray-600">Roll: {s.roll}</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm ${
                            attendanceMap[s.id] === 'present'
                              ? 'bg-green-100 text-green-700 font-semibold'
                              : 'bg-gray-100 text-green-600'
                          }`}
                          onClick={() => setStatus(s.id, 'present')}
                        >
                          <FaCheck /> Present
                        </button>
                        <button
                          className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm ${
                            attendanceMap[s.id] === 'absent'
                              ? 'bg-red-100 text-red-700 font-semibold'
                              : 'bg-gray-100 text-red-600'
                          }`}
                          onClick={() => setStatus(s.id, 'absent')}
                        >
                          <FaTimes /> Absent
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6">
                  <button
                    onClick={handleSave}
                    className="w-full sm:w-auto bg-blue-600 text-white px-6 py-2 md:py-3 rounded-lg hover:bg-blue-700 text-sm md:text-base"
                  >
                    Save Attendance
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default TakeAttendance