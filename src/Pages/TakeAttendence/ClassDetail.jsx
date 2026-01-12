import React from 'react'

function ClassDetail({ className, section, subject, date, setClassName, setSection, setSubject, setDate, onStart }) {
    return (
        <div className="mt-6 ml-74 bg-white w-225 rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-6">Class Details</h2>

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
                        <option value="" disabled>
                            Select Class
                        </option>
                        <option value="9th">9th</option>
                        <option value="10th">10th</option>
                        <option value="11th">11th</option>
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
                        <option value="" disabled>
                            Select Section
                        </option>
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
                        <option value="" disabled>
                            Select Subject
                        </option>
                        <option value="math">Mathematics</option>
                        <option value="english">English</option>
                        <option value="science">Science</option>
                        <option value="computer">Computer</option>
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
                <button onClick={onStart} className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
                    Start Attendance
                </button>
            </div>
        </div>
    )
}

export default ClassDetail
