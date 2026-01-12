import React from 'react'
import { FaUsers, FaUserCheck, FaUserTimes } from "react-icons/fa";
import { useStudents } from '../../contexts/StudentsContext'

function TodayAttendenceinfo() {
    const { getTodayStats } = useStudents()
    const today = new Date().toISOString().slice(0, 10)
    const { total, present, absent } = getTodayStats(today)

    return (
        <div>
            <div className="ml-78 p-0 mr-75 mt-18">
                <h1 className="text-3xl font-bold mb-4 mr-45">Dashboard</h1>
                <p>Welcome back! Here's your attendance overview</p>
            </div>
            {/* Cards Section */}
            <div className="mt-10 flex justify-center ml-59">
                <div className="grid grid-cols-3 gap-7">

                    {/* Total Students */}
                    <div className="bg-white p-3 w-70 h-28 rounded-lg shadow-md">
                        <div className="flex items-center justify-between">
                            <h2 className="font-semibold text-gray-500">Total Students</h2>
                            <FaUsers className="text-blue-600 text-3xl" />
                        </div>
                        <p className="text-3xl mt-3 mr-66 text-blue-700">{total}</p>
                    </div>

                    {/* Attendance Today */}
                    <div className="bg-white p-2 w-70 h-28 rounded-lg shadow-md">
                        <div className="flex items-center justify-between">
                            <h2 className="font-semibold text-gray-500">Present Today</h2>
                            <FaUserCheck className="text-green-600 text-3xl" />
                        </div>
                        <p className="text-3xl mt-3  text-green-600 mr-66">{present}</p>
                    </div>

                    {/* Attendance Rate */}
                    <div className="bg-white p-2 w-70 h-28 rounded-lg shadow-md">
                        <div className="flex items-center justify-between">
                            <h2 className="font-semibold text-gray-500">Absent Today</h2>
                            <FaUserTimes className="text-red-600 text-3xl" />
                        </div>
                        <p className="text-3xl mt-3  text-red-700 mr-66">{absent}</p>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default TodayAttendenceinfo
