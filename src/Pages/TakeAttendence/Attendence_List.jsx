import React, { useEffect, useMemo, useState } from 'react'
import { FaCheck, FaTimes } from "react-icons/fa";
import { useStudents } from '../../contexts/StudentsContext'

function Attendence_List({ className, section, subject, date, active }) {
    const { students, saveAttendance, findSession, getSessionsByDate, attendanceRecords } = useStudents()
    const today = date || new Date().toISOString().slice(0, 10) // YYYY-MM-DD

    const [attendanceMap, setAttendanceMap] = useState({})

    // visible students based on selected class/section/subject (case-insensitive, trimmed)
    const visibleStudents = useMemo(() => {
        const cn = (className || '').trim().toLowerCase()
        const sec = (section || '').trim().toLowerCase()
        const sub = (subject || '').trim().toLowerCase()

        function digits(x) {
            const m = (x || '').toString().match(/\d+/)
            return m ? m[0] : null
        }

        const cnDigits = digits(cn)

        return students.filter(s => {
            const sc = (s.class || '').toString().trim().toLowerCase()
            const ss = (s.section || '').toString().trim().toLowerCase()
            const sb = (s.subject || '').toString().trim().toLowerCase()

            const scDigits = digits(sc)
            const classMatch = (!cn) || (sc === cn) || (cnDigits && scDigits && cnDigits === scDigits)
            const sectionMatch = (!sec) || ss === sec
            const subjectMatch = (!sub) || sb === sub
            return classMatch && sectionMatch && subjectMatch
        })
    }, [students, className, section, subject])

    useEffect(() => {
        // initialize from saved attendance session for the selected filters
        const session = findSession(today, { className, section, subject })
        if (session && session.records && session.records.length) {
            const map = {}
            session.records.forEach(r => (map[r.studentId] = r.status))
            setAttendanceMap(map)
        } else {
            // default: all absent for visible students
            const map = {}
            visibleStudents.forEach(s => (map[s.id] = 'absent'))
            setAttendanceMap(map)
        }
    }, [visibleStudents, attendanceRecords, today, className, section, subject])

    function setStatus(studentId, status) {
        setAttendanceMap(prev => ({ ...prev, [studentId]: status }))
    }

    function handleSave() {
        if (!className || !section || !subject || !date) return alert('Please select class, section, subject and date before saving')
        const arr = visibleStudents.map(s => ({ studentId: s.id, status: attendanceMap[s.id] || 'absent' }))
        saveAttendance(today, arr, { className, section, subject })
        alert('Attendance saved for ' + today)
    }

    if (!active) {
        return (
            <div className="mt-6 ml-74 bg-white w-225 rounded-lg shadow-md p-6 mb-10">
                <h2 className="text-2xl font-semibold mb-6">Attendance List</h2>
                <div>Please select Class, Section, Subject and click "Start Attendance" to begin.</div>
            </div>
        )
    }

    // If no students match, show a helpful message
    if (visibleStudents.length === 0) {
        return (
            <div className="mt-6 ml-74 bg-white w-225 rounded-lg shadow-md p-6 mb-10">
                <h2 className="text-2xl font-semibold mb-6">Attendance List</h2>
                <div className="text-sm text-gray-600 mb-4">Selected: <strong>{className || 'All classes'}</strong> / <strong>{section || 'All sections'}</strong> / <strong>{subject || 'All subjects'}</strong> / <strong>{date}</strong></div>
                <div className="text-red-600">No students found for the selected filters. Please check that students exist with that Class/Section/Subject, or add students in the Students page.</div>
            </div>
        )
    }

    return (
        <div className="mt-6 ml-74 bg-white w-225 rounded-lg shadow-md p-6 mb-10">
            <h2 className="text-2xl font-semibold mb-6">Attendance List</h2>

            <div className="text-sm text-gray-600 mb-4">Selected: <strong>{className || 'All classes'}</strong> / <strong>{section || 'All sections'}</strong> / <strong>{subject || 'All subjects'}</strong> / <strong>{date}</strong> — <strong>{visibleStudents.length}</strong> student(s)</div>

            <table className="w-full table-auto border-collapse">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="px-4 py-2 text-left">Roll No</th>
                        <th className="px-4 py-2 text-left">Student Name</th>
                        <th className="px-4 py-2 text-left">Attendance Status</th>
                    </tr>
                </thead>

                <tbody>
                    {visibleStudents.map((s) => (
                        <tr key={s.id} className="hover:bg-gray-100">
                            <td className="px-4 py-2">{s.roll}</td>
                            <td className="px-4 py-2">{s.name}</td>
                            <td className="px-4 py-2 flex gap-4">
                                <button
                                    className={`flex items-center gap-2 px-3 py-1 rounded ${attendanceMap[s.id] === 'present' ? 'bg-green-100 text-green-700' : 'hover:bg-green-100 text-green-600'}`}
                                    onClick={() => setStatus(s.id, 'present')}
                                >
                                    <FaCheck /> Present
                                </button>
                                <button
                                    className={`flex items-center gap-2 px-3 py-1 rounded ${attendanceMap[s.id] === 'absent' ? 'bg-red-100 text-red-700' : 'hover:bg-red-100 text-red-600'}`}
                                    onClick={() => setStatus(s.id, 'absent')}
                                >
                                    <FaTimes /> Absent
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Save Button */}
            <div className="mt-6 text-right">
                <button onClick={handleSave} className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
                    Save Attendance
                </button>
            </div>
        </div>
    )
}

export default Attendence_List
