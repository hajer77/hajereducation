import React ,{useRef, useState} from 'react'
import { Form ,Button,Card,Alert } from 'react-bootstrap'
import { Link ,useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Container } from "react-bootstrap";
import { doc, setDoc ,serverTimestamp } from "firebase/firestore";
import { db } from '../firebase';

export default function Signup() {
    const emailRef=useRef()
    const passwordRef=useRef()
    const passwordConfirmRef=useRef()
    const {signup  }= useAuth()
    const [error,setError]= useState("")
    const [loading ,setLoading]= useState(false)
    const navigate = useNavigate()


    //Signup && add user to firestore
    
    async function handleSubmit(e){
      e.preventDefault()

      if(passwordRef.current.value  !== 
        passwordConfirmRef.current.value){
          return setError('Passwords do not match')
        }

        try {
          setError("")
          setLoading(true)
          await signup(emailRef.current.value ,passwordRef.current.value).then(async(userRec)=>{
            const user = userRec.user;
            console.log("userUI:",user.uid);
            await await setDoc(doc(db, "users", user.uid), {
              email: emailRef.current.value,
              password: passwordRef.current.value,
              timestamp : serverTimestamp(),
            }).catch((error)=>{
              console.log(error);
            })
            });
         
           
            navigate("/login")
        
          
        } catch (error) {

          console.log(error)
          setError("Failed to create an account")
        }
        setLoading(false)
      
    }
  return (

    <Container
     className="d-flex align-items-center justify-content-center"
     style={ {minHeight : "100vh"}}
     >
    <div className="w-100" style={{maxWidth :"400px"}}>
    <Card className="text-center">
      <Card.Header>Register</Card.Header>
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
     

      <Form.Group className="mb-3" id="password-confirm">
        <Form.Label>Password Confirmation</Form.Label>
        <Form.Control type="password" placeholder="Password Confirmation" ref={passwordConfirmRef} required />
      </Form.Group>
      
        <Button disabled={loading} type="submit">
          Sign up
          </Button>

          </Form>
          </Card.Body>
      <Card.Footer className="text-muted">Already have an account ? <Link to ="/Login">Log In</Link></Card.Footer>
    </Card>
    </div>
    </Container>
  )
}
