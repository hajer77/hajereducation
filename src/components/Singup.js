import React ,{useRef, useState} from 'react'
import { Form ,Button,Card,Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'

export default function Singup() {
    const emailRef=useRef()
    const passwordRef=useRef()
    const passwordConfirmRef=useRef()
    const {signup ,currentUser}= useAuth()
    const [error,setError]= useState("")
    const [loading ,setLoading]= useState(false)

    async function handleSubmit(e){
      e.preventDefault()

      if(passwordRef.current.value  !== 
        passwordConfirmRef.current.value){
          return setError('Passwords do not match')
        }

        try {
          setError("")
          setLoading(true)
          await signup(emailRef.current.value ,passwordRef.current.value)
        } catch (error) {
          console.log(error)
          console.log(emailRef.current.value)
          setError("Failed to create an account")
        }
        setLoading(false)
      
    }
  return (
    <>
    <Card className="text-center">
      <Card.Header>Register</Card.Header>
      <Card.Body>
        <Card.Title>Hi</Card.Title>
        {currentUser && currentUser.email}
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit ={handleSubmit}>
      <Form.Group className="mb-3" id="email">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email"  placeholder="Enter email" ref={emailRef} required/>
        <Form.Text className="text-muted">
          your email
        </Form.Text>
      </Form.Group>
      

      <Form.Group className="mb-3" id="password">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" ref={passwordRef} required />
      </Form.Group>
     

      <Form.Group className="mb-3" id="password-confirm">
        <Form.Label>Password Confirmation</Form.Label>
        <Form.Control type="password" placeholder="Password Confirmation" ref={passwordConfirmRef} required />
      </Form.Group>
      
        <Button disabled={loading} type="submit">
          Singn up
          </Button>

          </Form>
          </Card.Body>
      <Card.Footer className="text-muted">Already have an account ? Log In</Card.Footer>
    </Card>
    </>
  )
}
