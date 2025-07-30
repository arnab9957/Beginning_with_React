import { useState } from 'react'
import './App.css'
import UserContextProvider from './context/userContextProvider'
import Login from './components/login'
import Profile from './components/profile'


function App() {


  return (
    <UserContextProvider>
      <h1>Chalo ContexAPI</h1>
      <Login />
      <Profile />
    </UserContextProvider>
  )
}

export default App
