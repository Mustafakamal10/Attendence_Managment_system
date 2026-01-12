import React, { useState } from 'react'
import { FaUserPlus, FaTrash, FaTimes } from "react-icons/fa";
import Navbar from '../../Components/Navbar'
import Sidebar from '../../Components/Sidebar'
import { useStudents } from '../../contexts/StudentsContext'

function Students() {
  const { students, addStudent, deleteStudent } = useStudents()
  const [showForm, setShowForm] = useState(false)

  const [name, setName] = useState('')
  const [roll, setRoll] = useState('')
  const [className, setClassName] = useState('')
  const [section, setSection] = useState('')
  const [subject, setSubject] = useState('')

  function resetForm() {
    setName('')
    setRoll('')
    setClassName('')
    setSection('')
    setSubject('')
  }

  function handleAdd() {
    if (!name.trim()) return alert('Please enter student name')
    if (!subject.trim()) return alert('Please select a subject')
    addStudent({ name: name.trim(), roll: roll.trim(), className: className.trim(), section: section.trim(), subject: subject.trim() })
    resetForm()
    setShowForm(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <Navbar />

      {/* FIXED: Added lg:ml-64 for proper spacing */}
      <div className="lg:ml-64 pt-20 px-4 md:px-6 lg:px-8 pb-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-4 md:p-6 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-2">
              Students Management
            </h1>
            <p className="text-gray-600 text-sm md:text-base">Manage student records</p>
          </div>

          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg hover:bg-blue-700 flex items-center gap-2 text-sm md:text-base whitespace-nowrap"
          >
            <FaUserPlus />
            Add Student
          </button>
        </div>

        {/* ADD STUDENT FORM */}
        {showForm && (
          <div className="bg-white rounded-lg shadow-md p-4 md:p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg md:text-xl font-semibold">Add Student</h2>
              <button
                onClick={() => { setShowForm(false); resetForm() }}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes className="w-5 h-5 md:w-6 md:h-6" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
              <input
                value={name}
                onChange={e => setName(e.target.value)}
                type="text"
                placeholder="Student Name"
                className="border p-2 md:p-3 rounded-lg text-sm md:text-base focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <input
                value={roll}
                onChange={e => setRoll(e.target.value)}
                type="text"
                placeholder="Roll No"
                className="border p-2 md:p-3 rounded-lg text-sm md:text-base focus:ring-2 focus:ring-blue-500 outline-none"
              />

              <select
                value={className}
                onChange={e => setClassName(e.target.value)}
                className="border p-2 md:p-3 rounded-lg text-sm md:text-base focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="">Select Class</option>
                <option value="9th">9th</option>
                <option value="10th">10th</option>
                <option value="11th">11th</option>
              </select>

              <select
                value={section}
                onChange={e => setSection(e.target.value)}
                className="border p-2 md:p-3 rounded-lg text-sm md:text-base focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="">Select Section</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
              </select>

              <select
                value={subject}
                onChange={e => setSubject(e.target.value)}
                className="border p-2 md:p-3 rounded-lg text-sm md:text-base focus:ring-2 focus:ring-blue-500 outline-none sm:col-span-2"
              >
                <option value="">Select Subject</option>
                <option value="math">Mathematics</option>
                <option value="english">English</option>
                <option value="science">Science</option>
                <option value="computer">Computer</option>
              </select>
            </div>

            <div className="mt-4 flex gap-3 md:gap-4">
              <button
                onClick={handleAdd}
                className="bg-blue-600 text-white px-4 md:px-6 py-2 rounded-lg hover:bg-blue-700 text-sm md:text-base"
              >
                Add
              </button>
              <button
                onClick={() => { setShowForm(false); resetForm() }}
                className="bg-gray-300 px-4 md:px-6 py-2 rounded-lg hover:bg-gray-400 text-sm md:text-base"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* STUDENT LIST */}
        <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
          <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6">
            Student List ({students.length})
          </h2>

          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-3 text-left text-sm font-semibold">Roll No</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Student Name</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Class</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Section</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Subject</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((s) => (
                  <tr key={s.id} className="hover:bg-gray-50 border-b">
                    <td className="px-4 py-3 text-sm">{s.roll}</td>
                    <td className="px-4 py-3 text-sm">{s.name}</td>
                    <td className="px-4 py-3 text-sm">{s.class}</td>
                    <td className="px-4 py-3 text-sm">{s.section}</td>
                    <td className="px-4 py-3 text-sm">{s.subject || '—'}</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => deleteStudent(s.id)}
                        className="text-red-600 rounded px-3 py-2 bg-red-100 hover:bg-red-200 flex items-center gap-2 text-sm"
                      >
                        <FaTrash />
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-3">
            {students.map((s) => (
              <div key={s.id} className="bg-gray-50 p-4 rounded-lg border">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-lg">{s.name}</h3>
                    <p className="text-sm text-gray-600">Roll: {s.roll}</p>
                  </div>
                  <button
                    onClick={() => deleteStudent(s.id)}
                    className="text-red-600 p-2 bg-red-100 hover:bg-red-200 rounded"
                  >
                    <FaTrash />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-gray-600">Class:</span>
                    <span className="ml-2 font-medium">{s.class}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Section:</span>
                    <span className="ml-2 font-medium">{s.section}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-gray-600">Subject:</span>
                    <span className="ml-2 font-medium">{s.subject || '—'}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Students