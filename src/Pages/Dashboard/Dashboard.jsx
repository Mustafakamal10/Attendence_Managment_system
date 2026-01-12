import React from 'react'
import Navbar from '../../Components/Navbar'
import Sidebar from '../../Components/Sidebar'
import { FaUsers, FaUserCheck, FaUserTimes } from "react-icons/fa";
import { useStudents } from '../../contexts/StudentsContext'

function Dashboard() {
  const { getTodayStats } = useStudents()
  const today = new Date().toISOString().slice(0, 10)
  const { total, present, absent, rate } = getTodayStats(today)

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <Navbar />
      
      {/* Main Content - Properly spaced from sidebar and navbar */}
      <div className="lg:ml-64 pt-20 px-4 md:px-6 lg:px-8 pb-8">
        {/* Header Section */}
        <div className="bg-white rounded-lg shadow-md p-4 md:p-6 mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            Dashboard
          </h1>
          <p className="text-gray-600 text-sm md:text-base">
            Welcome back! Here's your attendance overview
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6">
          {/* Total Students */}
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-semibold text-gray-600 text-sm md:text-base">
                Total Students
              </h2>
              <FaUsers className="text-blue-600 text-2xl md:text-3xl" />
            </div>
            <p className="text-3xl md:text-4xl font-bold text-blue-700">{total}</p>
          </div>

          {/* Present Today */}
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-semibold text-gray-600 text-sm md:text-base">
                Present Today
              </h2>
              <FaUserCheck className="text-green-600 text-2xl md:text-3xl" />
            </div>
            <p className="text-3xl md:text-4xl font-bold text-green-600">{present}</p>
          </div>

          {/* Absent Today */}
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow sm:col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-semibold text-gray-600 text-sm md:text-base">
                Absent Today
              </h2>
              <FaUserTimes className="text-red-600 text-2xl md:text-3xl" />
            </div>
            <p className="text-3xl md:text-4xl font-bold text-red-700">{absent}</p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
          <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6">
            Quick Stats
          </h2>
          
          <div className="space-y-3 md:space-y-4">
            <div className="bg-gray-50 p-3 md:p-4 rounded-lg flex justify-between items-center">
              <span className="text-gray-700 text-sm md:text-base">Attendance Rate Today</span>
              <span className="text-lg md:text-xl font-bold text-blue-700">{rate}%</span>
            </div>

            <div className="bg-gray-50 p-3 md:p-4 rounded-lg flex justify-between items-center">
              <span className="text-gray-700 text-sm md:text-base">Total Classes</span>
              <span className="text-lg md:text-xl font-bold text-blue-700">3</span>
            </div>

            <div className="bg-gray-50 p-3 md:p-4 rounded-lg flex justify-between items-center">
              <span className="text-gray-700 text-sm md:text-base">Total Sections</span>
              <span className="text-lg md:text-xl font-bold text-blue-700">3</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard