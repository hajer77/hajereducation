import React ,{useRef, useState} from 'react'
import { Form ,Button,Card,Alert } from 'react-bootstrap'
import { Link ,useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'


export default function UpdateProfile() {
    const emailRef=useRef()
    const passwordRef=useRef()
    const passwordConfirmRef=useRef()
    const {currentUser , updateUserPassword ,updateUserEmail}= useAuth()
    const [error,setError]= useState("")
    const [loading ,setLoading]= useState(false)
    const navigate = useNavigate()

      function handleSubmit(e){
      e.preventDefault()

      if(passwordRef.current.value  !== 
        passwordConfirmRef.current.value){
          return setError('Passwords do not match')
        }
        
        const promises =[]
          setError("")
          setLoading(true)
        if(emailRef.current.value !== currentUser.email){
          promises.push(updateUserEmail(emailRef.current.value))
        }

        if(passwordRef.current.value){
          promises.push(updateUserPassword(passwordRef.current.value))
        }

        Promise.all(promises).then(()=>{
          navigate("/")
        }).catch(()=>{
          setError("Failed to update account")
        }).finally(()=>{
          setLoading(false)
        })




      
    }
  return (
    <>
    <Card className="text-center">
      <Card.Header>Update Profile</Card.Header>
      <Card.Body>
        <Card.Title>Hi</Card.Title>
        
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit ={handleSubmit}>
      <Form.Group className="mb-3" id="email">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email"  placeholder="Enter email" ref={emailRef} required defaultValue={currentUser.email}/>
        <Form.Text className="text-muted">
          your email
        </Form.Text>
      </Form.Group>
      

      <Form.Group className="mb-3" id="password">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Leave Blank to keep the same" ref={passwordRef}  />
      </Form.Group>
     

      <Form.Group className="mb-3" id="password-confirm">
        <Form.Label>Password Confirmation</Form.Label>
        <Form.Control type="password" placeholder="Leave Blank to keep the same" ref={passwordConfirmRef}  />
      </Form.Group>
      
        <Button disabled={loading} type="submit">
          Update
          </Button>

          </Form>
          </Card.Body>
      <Card.Footer className="text-muted"><Link to ="/">Cancel</Link></Card.Footer>
    </Card>
    </>
  )
}
