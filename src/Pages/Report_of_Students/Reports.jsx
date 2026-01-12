import React, { useState } from 'react'
import Navbar from '../../Components/Navbar'
import Sidebar from '../../Components/Sidebar'
import { useStudents } from '../../contexts/StudentsContext'

function Reports() {
  const { getAttendanceSessions } = useStudents()
  const [filters, setFilters] = useState({})
  const [className, setClassName] = useState('')
  const [section, setSection] = useState('')
  const [subject, setSubject] = useState('')
  const [date, setDate] = useState('')

  function handleSearch() {
    setFilters({ className, section, subject, date })
  }

  const sessions = getAttendanceSessions(filters)

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <Navbar />

      {/* FIXED: Added lg:ml-64 for proper spacing */}
      <div className="lg:ml-64 pt-20 px-4 md:px-6 lg:px-8 pb-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-4 md:p-6 mb-6">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-2">
            Attendance Reports
          </h1>
          <p className="text-gray-600 text-sm md:text-base">
            View attendance records and statistics
          </p>
        </div>

        {/* Filter Section */}
        <div className="bg-white rounded-lg shadow-md p-4 md:p-6 mb-6">
          <h2 className="text-lg md:text-xl font-semibold mb-4">Filter Reports</h2>

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
                <option value="">All Classes</option>
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
                <option value="">All Sections</option>
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
                <option value="">All Subjects</option>
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
              onClick={handleSearch}
              className="w-full sm:w-auto bg-blue-600 text-white px-6 py-2 md:py-3 rounded-lg hover:bg-blue-700 text-sm md:text-base"
            >
              Search Attendance
            </button>
          </div>
        </div>

        {/* Results Section */}
        <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
          <h2 className="text-lg md:text-xl font-semibold mb-4">
            Attendance Records ({sessions.length})
          </h2>

          {sessions.length === 0 ? (
            <div className="text-center py-8 md:py-12">
              <p className="text-gray-600 mb-2 text-sm md:text-base">
                No attendance records found for the selected filters.
              </p>
              <p className="text-gray-500 text-xs md:text-sm">
                Try selecting different filters or take attendance for this class.
              </p>
            </div>
          ) : (
            <>
              {/* Desktop Table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="px-4 py-3 text-left text-sm font-semibold">Date</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold">Class</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold">Section</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold">Subject</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold">Present</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold">Absent</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sessions.map(s => {
                      const present = s.records.filter(r => r.status === 'present').length
                      const absent = s.records.filter(r => r.status === 'absent').length
                      return (
                        <tr key={s.id} className="hover:bg-gray-50 border-b">
                          <td className="px-4 py-3 text-sm">{s.date}</td>
                          <td className="px-4 py-3 text-sm">{s.className || '—'}</td>
                          <td className="px-4 py-3 text-sm">{s.section || '—'}</td>
                          <td className="px-4 py-3 text-sm">{s.subject || '—'}</td>
                          <td className="px-4 py-3 text-sm">
                            <span className="text-green-600 font-semibold">{present}</span>
                          </td>
                          <td className="px-4 py-3 text-sm">
                            <span className="text-red-600 font-semibold">{absent}</span>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="md:hidden space-y-3">
                {sessions.map(s => {
                  const present = s.records.filter(r => r.status === 'present').length
                  const absent = s.records.filter(r => r.status === 'absent').length
                  return (
                    <div key={s.id} className="bg-gray-50 p-4 rounded-lg border">
                      <div className="mb-3">
                        <h3 className="font-semibold text-base mb-1">{s.date}</h3>
                        <p className="text-sm text-gray-600">
                          {s.className} - {s.section} - {s.subject}
                        </p>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-green-50 p-3 rounded-lg">
                          <p className="text-xs text-gray-600 mb-1">Present</p>
                          <p className="text-2xl font-bold text-green-600">{present}</p>
                        </div>
                        <div className="bg-red-50 p-3 rounded-lg">
                          <p className="text-xs text-gray-600 mb-1">Absent</p>
                          <p className="text-2xl font-bold text-red-600">{absent}</p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Reports