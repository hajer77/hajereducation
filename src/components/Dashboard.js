import { async } from '@firebase/util'
import { CurrentUser } from 'firebase/auth'
import React from 'react'
import { useState } from 'react'
import { Card,Button ,Alert } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'


export default function Dashboard() {
  const[error,setError]=useState("")
  const {currentUser ,logout} =useAuth()
  const navigate = useNavigate()


   async function handleLogout(){
    setError('')

   try{
   await logout()
   navigate("/login")
   } catch {
  setError('Failed to log out')
  }
}


  return (
    <div>
      <Card className="text-center">
      <Card.Header>My account</Card.Header>
      <Card.Body>
        <Card.Title>Profile</Card.Title>
        {error && <Alert variant="danger">{error}</Alert>}
        <strong>Email:</strong>{currentUser.email}
        <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
          Update Profile
        </Link>
        <Card.Text>
         Profile
        </Card.Text>
        <Button variant="link" onClick={handleLogout}>
          Log out</Button>
      </Card.Body>
      <Card.Footer className="text-muted">HajerEducation</Card.Footer>
    </Card>
    </div>
  )
}
