import React, { createContext, useContext, useEffect, useState } from 'react'
import defaultStudentsData from '../data/students.json'

const StudentsContext = createContext(null)

const STUDENTS_KEY = 'ams_students'
const ATTENDANCE_KEY = 'ams_attendance'

export function StudentsProvider({ children }) {
  const [students, setStudents] = useState([])
  const [attendanceRecords, setAttendanceRecords] = useState({})

  // Load students & attendance from localStorage
  useEffect(() => {
    const s = localStorage.getItem(STUDENTS_KEY)
    const a = localStorage.getItem(ATTENDANCE_KEY)
    if (s) {
      try {
        const parsed = JSON.parse(s)
        if (Array.isArray(parsed) && parsed.length) {
          setStudents(parsed)
        } else {
          // Stored students empty/invalid — using defaults
          setStudents(defaultStudentsData)
          localStorage.setItem(STUDENTS_KEY, JSON.stringify(defaultStudentsData))
        }
      } catch (err) {
        // Corrupted stored students — restoring defaults
        setStudents(defaultStudentsData)
        localStorage.setItem(STUDENTS_KEY, JSON.stringify(defaultStudentsData))
      }
    } else {
      // No stored students — using default data
      setStudents(defaultStudentsData)
      localStorage.setItem(STUDENTS_KEY, JSON.stringify(defaultStudentsData))
    }
    if (a) {
      try {
        setAttendanceRecords(JSON.parse(a))
      } catch (err) {
        // Corrupted stored attendance — reset
        setAttendanceRecords({})
        localStorage.setItem(ATTENDANCE_KEY, JSON.stringify({}))
      }
    }
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
    // Also remove student's attendance records
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
    // attendanceArray: [{ studentId, status }]
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

  // Normalize class/subject values (accepts variants like "10th" or "math")
  function normalizeClassName(v) {
    if (!v) return ''
    return v.toString().trim().toLowerCase().replace(/th$/,'')
  }
  function normalizeSubject(v) {
    if (!v) return ''
    const x = v.toString().trim().toLowerCase()
    if (x === 'math') return 'mathematics'
    if (x === 'comp') return 'computer'
    return x
  }

  function findSession(dateStr, filters = {}) {
    const sessions = getSessionsByDate(dateStr)
    return sessions.find(s => {
      const sc = normalizeClassName(s.className)
      const fc = normalizeClassName(filters.className)
      const ss = (s.section || '').toString().trim().toLowerCase()
      const fs = (filters.section || '').toString().trim().toLowerCase()
      const ssub = normalizeSubject(s.subject)
      const fsub = normalizeSubject(filters.subject)

      const classMatch = !filters.className || sc === fc
      const sectionMatch = !filters.section || ss === fs
      const subjectMatch = !filters.subject || ssub === fsub
      return classMatch && sectionMatch && subjectMatch
    })
  }

  function getAttendanceByDate(dateStr, filters = null) {
    // If filters provided, return that session's records; otherwise return all records for date
    if (filters) {
      const s = findSession(dateStr, filters)
      return s ? s.records : []
    }
    const sessions = getSessionsByDate(dateStr)
    return sessions.flatMap(s => s.records || [])
  }

  function getAttendanceSessions(filters = {}) {
    // Return sessions matching optional filters (date, className, section, subject)
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