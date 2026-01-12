import React from 'react'
import { useStudents } from '../../contexts/StudentsContext'

function TodayAttendenceSheet() {
   const { getTodayStats } = useStudents()
   const today = new Date().toISOString().slice(0, 10)
   const { rate } = getTodayStats(today)
   return (
      <div>
         <div className="mt-10  bg-white h-80  ml-75 w-225 rounded-b-lg shadow-md">
            <div className='h-10 w-40 pt-6'>
               <h1 className='text-black text-2xl pl-2'>Quick Stats</h1>
            </div>
            <div className='bg-white  m-auto mt-6 h-41 w-210'>
               <div className='bg-gray-50 m-2 h-14 w-210 mb-4 rounded-lg shadow-md flex justify-between'>
                  <div className='pt-5 pl-2'>Attendance Rate Today</div>
                  <div className='pt-5 pr-2 text-xl text-blue-700'>{rate}%</div>
               </div>
               <div className='bg-gray-50 m-2 h-14 w-210 mb-4 rounded-lg shadow-md flex justify-between'>
                  <div className='pt-5 pl-2'>Total Classes</div>
                  <div className='pt-5 pr-2 text-xl text-blue-700'>2</div>
               </div>
               <div className='bg-gray-50 m-2 h-14 w-210 rounded-lg shadow-md flex justify-between'>
                  <div className='pt-5 pl-2'>Total Sections</div>
                  <div className='pt-5 pr-2 text-xl text-blue-700'>6</div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default TodayAttendenceSheet
