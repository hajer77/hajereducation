import React ,{useRef, useState} from 'react'
import { Form ,Button,Card,Alert } from 'react-bootstrap'
import { Link , useNavigate} from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Login() {
    const emailRef=useRef()
    const passwordRef=useRef()
    const {login}= useAuth()
    const [error,setError]= useState("")
    const [loading ,setLoading]= useState(false)
    const navigate = useNavigate()

    async function handleSubmit(e){
      e.preventDefault()

     

        try {
          setError("")
          setLoading(true)
          await login(emailRef.current.value ,passwordRef.current.value)
          navigate("/")
        } catch (error) {
          console.log(error)
          console.log(emailRef.current.value)
          setError("Failed to sign in")
        }
        setLoading(false)
      
    }
  return (
    <>
    <Card className="text-center">
      <Card.Header>Log In </Card.Header>
      <Card.Body>
        <Card.Title>Hi</Card.Title>
        
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
     

     
      
        <Button disabled={loading} type="submit">
          Log In
          </Button>
          </Form>

        <div className="w-100 text-center mt-3">
        <Link to="/forgot-password">Forgot Password ?</Link>
        </div>

          </Card.Body>
      <Card.Footer className="text-muted">Don't have an account ? <Link to ="/Signup">Sign Up</Link> </Card.Footer>
    </Card>
    </>
  )
}
