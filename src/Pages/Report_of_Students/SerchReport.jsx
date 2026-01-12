import React, { useState } from 'react'

function SerchReport({ onSearch }) {
    const [className, setClassName] = useState('')
    const [section, setSection] = useState('')
    const [subject, setSubject] = useState('')
    const [date, setDate] = useState('')

    function handleSearch() {
        onSearch({ className, section, subject, date })
    }

    return (
        <div>
            <div className="mt-6 ml-74  bg-white w-225 rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-semibold mb-6">Filter Reports</h2>

                <div className="grid grid-cols-4 gap-6">
                    {/* Class Name Input */}
                    <div>
                        <label className="block text-gray-700 mb-2">
                            Class
                        </label>
                        <select
                            className="w-full p-2 border border-gray-300 rounded"
                            value={className}
                            onChange={e => setClassName(e.target.value)}
                        >
                            <option value="">All Classes</option>
                            <option value="9">9th</option>
                            <option value="10">10th</option>
                            <option value="11">11th</option>
                        </select>
                    </div>

                    {/* Section Dropdown */}
                    <div>
                        <label className="block text-gray-700 mb-2">
                            Section
                        </label>
                        <select
                            className="w-full p-2 border border-gray-300 rounded"
                            value={section}
                            onChange={e => setSection(e.target.value)}
                        >
                            <option value="">All Sections</option>
                            <option value="A">A</option>
                            <option value="B">B</option>
                            <option value="C">C</option>
                        </select>
                    </div>

                    {/* Subject Dropdown */}
                    <div>
                        <label className="block text-gray-700 mb-2">
                            Subject
                        </label>
                        <select
                            className="w-full p-2 border border-gray-300 rounded"
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
                    {/* Date Picker */}
                    <div>
                        <label className="block text-gray-700 mb-2">
                            Date
                        </label>
                        <input
                            type="date"
                            className="w-full p-2 border border-gray-300 rounded"
                            value={date}
                            onChange={e => setDate(e.target.value)}
                        />
                    </div>

                </div>

                {/* Button Section */}
                <div className="mt-6 text-right">
                    <button onClick={handleSearch} className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
                        Search Attendance
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SerchReport
