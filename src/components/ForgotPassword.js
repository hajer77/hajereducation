import React ,{useRef, useState} from 'react'
import { Form ,Button,Card,Alert } from 'react-bootstrap'
import { Link , useNavigate} from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function ForgotPassword() {
    const emailRef=useRef()
   
    const {resetPassword}= useAuth()
    const [message,setMessage]= useState("")
    const[error,setError]=useState("")
    const [loading ,setLoading]= useState(false)
    const navigate = useNavigate()

    async function handleSubmit(e){
      e.preventDefault()

     

       try {
         setMessage("")
         setError("")
          setLoading(true)
        await resetPassword(emailRef.current.value )
         setMessage("Check your Email for further instructions")
    //       navigate("/")
        } catch (error) {
         setError("Failed to reset Password")
         }
         setLoading(false)
      
     }
  return (
    <>
    <Card className="text-center">
      <Card.Header>Reset Password </Card.Header>
      <Card.Body>
        <Card.Title>Hi</Card.Title>
        
        {error && <Alert variant="danger">{error}</Alert>}

        {message && <Alert variant="success">{message}</Alert>}


        <Form onSubmit ={handleSubmit}>
      <Form.Group className="mb-3" id="email">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email"  placeholder="Enter email" ref={emailRef} required/>
        <Form.Text className="text-muted">
          your email
        </Form.Text>
      </Form.Group>
      

      
     

     
      
        <Button disabled={loading} type="submit">
          Reset Password
          </Button>
          </Form>

        <div className="w-100 text-center mt-3">
        <Link to="/login">Log In</Link>
        </div>

          </Card.Body>
      <Card.Footer className="text-muted">Don't have an account ? <Link to ="/Signup">Sign Up</Link> </Card.Footer>
    </Card>
    </>
  )
}
