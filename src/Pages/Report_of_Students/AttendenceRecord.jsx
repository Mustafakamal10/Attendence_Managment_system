import React from 'react'
import { useStudents } from '../../contexts/StudentsContext'

function AttendenceRecord({ filters = {} }) {
  const { getAttendanceSessions } = useStudents()
  const sessions = getAttendanceSessions(filters)

  if (!sessions.length) {
    return (
      <div>
        <div className="mt-6 ml-74 bg-white w-225 rounded-lg shadow-md p-6">
          <div className="flex flex-col items-center justify-center text-center py-10">

            <h2 className="text-xl font-semibold mb-2 text-gray-700">
              No attendance records found for the selected filters.
            </h2>
            <p className="text-gray-500">
              Try selecting different filters or take attendance for this class.
            </p>

          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="mt-6 ml-74 bg-white w-225 rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4">Attendance Records</h2>
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Class</th>
              <th className="px-4 py-2 text-left">Section</th>
              <th className="px-4 py-2 text-left">Subject</th>
              <th className="px-4 py-2 text-left">Present</th>
              <th className="px-4 py-2 text-left">Absent</th>
            </tr>
          </thead>
          <tbody>
            {sessions.map(s => {
              const present = s.records.filter(r => r.status === 'present').length
              const absent = s.records.filter(r => r.status === 'absent').length
              return (
                <tr key={s.id} className="hover:bg-gray-100">
                  <td className="px-4 py-2">{s.date}</td>
                  <td className="px-4 py-2">{s.className || '—'}</td>
                  <td className="px-4 py-2">{s.section || '—'}</td>
                  <td className="px-4 py-2">{s.subject || '—'}</td>
                  <td className="px-4 py-2">{present}</td>
                  <td className="px-4 py-2">{absent}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AttendenceRecord
