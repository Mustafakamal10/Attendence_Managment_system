import React, { createContext, useContext, useEffect, useState } from 'react'
import defaultStudentsData from '../data/students.json'

const StudentsContext = createContext(null)

const STUDENTS_KEY = 'ams_students'
const ATTENDANCE_KEY = 'ams_attendance'

export function StudentsProvider({ children }) {
  const [students, setStudents] = useState([])
  const [attendanceRecords, setAttendanceRecords] = useState({})

  // load from localStorage on mount
  useEffect(() => {
    const s = localStorage.getItem(STUDENTS_KEY)
    const a = localStorage.getItem(ATTENDANCE_KEY)
    if (s) setStudents(JSON.parse(s))
    else {
      // load default students from JSON file
      setStudents(defaultStudentsData)
      localStorage.setItem(STUDENTS_KEY, JSON.stringify(defaultStudentsData))
    }
    if (a) setAttendanceRecords(JSON.parse(a))
  }, [])

  useEffect(() => {
    localStorage.setItem(STUDENTS_KEY, JSON.stringify(students))
  }, [students])

  useEffect(() => {
    localStorage.setItem(ATTENDANCE_KEY, JSON.stringify(attendanceRecords))
  }, [attendanceRecords])

  function addStudent({ name, roll, className, section, subject }) {
    const id = Date.now()
    const newStudent = {
      id,
      roll: Number(roll) || (students.length ? Math.max(...students.map(s => s.roll)) + 1 : 1),
      name,
      class: className,
      section,
      subject: subject || ''
    }
    setStudents(prev => [...prev, newStudent])
    return newStudent
  }

  function deleteStudent(id) {
    setStudents(prev => prev.filter(s => s.id !== id))
    // remove student entries from all attendance sessions
    setAttendanceRecords(prev => {
      const copy = { ...prev }
      Object.keys(copy).forEach(date => {
        copy[date] = copy[date]
          .map(session => ({ ...session, records: session.records.filter(r => r.studentId !== id) }))
          .filter(session => session.records.length)
      })
      return copy
    })
  }

  function saveAttendance(dateStr, attendanceArray, meta = {}) {
    // attendanceArray: [{ studentId, status: 'present'|'absent' }]
    // meta: { className, section, subject }
    setAttendanceRecords(prev => {
      const sessions = prev[dateStr] ? [...prev[dateStr]] : []
      const matchIndex = sessions.findIndex(s => s.className === (meta.className || '') && s.section === (meta.section || '') && s.subject === (meta.subject || ''))
      const sessionObj = {
        id: Date.now(),
        className: meta.className || '',
        section: meta.section || '',
        subject: meta.subject || '',
        timestamp: Date.now(),
        records: attendanceArray,
      }
      if (matchIndex >= 0) {
        sessions[matchIndex] = sessionObj
      } else {
        sessions.push(sessionObj)
      }
      return { ...prev, [dateStr]: sessions }
    })
  }

  function getSessionsByDate(dateStr) {
    return attendanceRecords[dateStr] || []
  }

  function findSession(dateStr, filters = {}) {
    const sessions = getSessionsByDate(dateStr)
    return sessions.find(s =>
      (!filters.className || s.className === filters.className) &&
      (!filters.section || s.section === filters.section) &&
      (!filters.subject || s.subject === filters.subject)
    )
  }

  function getAttendanceByDate(dateStr, filters = null) {
    // backward compatible: if filters provided, return records for matching session, else return flattened records
    if (filters) {
      const s = findSession(dateStr, filters)
      return s ? s.records : []
    }
    const sessions = getSessionsByDate(dateStr)
    return sessions.flatMap(s => s.records || [])
  }

  function getAttendanceSessions(filters = {}) {
    // filters may include date, className, section, subject — return matching sessions with date
    const res = []
    Object.keys(attendanceRecords).forEach(date => {
      attendanceRecords[date].forEach(session => {
        const match = (!filters.date || filters.date === date) &&
          (!filters.className || session.className === filters.className) &&
          (!filters.section || session.section === filters.section) &&
          (!filters.subject || session.subject === filters.subject)
        if (match) res.push({ date, ...session })
      })
    })
    return res
  }

  function getTodayStats(dateStr) {
    const arr = getAttendanceByDate(dateStr)
    const total = students.length
    const present = arr.filter(a => a.status === 'present').length
    const absent = arr.filter(a => a.status === 'absent').length
    const rate = total ? Math.round((present / total) * 100) : 0
    return { total, present, absent, rate }
  }

  return (
    <StudentsContext.Provider value={{
      students,
      addStudent,
      deleteStudent,
      saveAttendance,
      getAttendanceByDate,
      getSessionsByDate,
      findSession,
      getAttendanceSessions,
      getTodayStats,
      attendanceRecords
    }}>
      {children}
    </StudentsContext.Provider>
  )
}

export function useStudents() {
  const ctx = useContext(StudentsContext)
  if (!ctx) throw new Error('useStudents must be used within StudentsProvider')
  return ctx
}

export default StudentsContext