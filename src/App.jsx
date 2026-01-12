import React from 'react'
import { StudentsProvider } from './contexts/StudentsContext'
import AppRoutes from './routes/AppRoutes'
import './App.css'

function App() {
  return (
    <StudentsProvider>
      <AppRoutes />
    </StudentsProvider>
  )
}

export default App