import React from 'react'
import {Container,
        CssBaseline ,
        Box,
        TextField,
        Button,
        Alert } from '@mui/material';
import FirstMenu from './FirstMenu';
import CheckboxList  from './ListTodo';
import { useState } from 'react';
import { db } from '../firebase';
import { addDoc,
         collection ,
         serverTimestamp} from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext'

export default function Todo() {

  
const {currentUser }= useAuth() ; 
const [input, setInput] = useState("");
const[error,setError]=useState("");



//Add TODO
const addTodo = async (e) => {
  e.preventDefault(e);
  
  if (input === '') {
    setError('Please enter a valid todo');
    return;
  }
  await addDoc(collection(db, 'todos'), {
    todo: input,
    inprogress: false,
    timestamp : serverTimestamp(),
    user_uid:"/users/"+`${currentUser.uid}`,
  });
  setInput('');
};


  return (
   

    <React.Fragment>

       <FirstMenu/> 
       
      <CssBaseline />
      <Container maxWidth="sm">
        
        <Box sx={{ bgcolor: '#ccffff', height: '100vh' }} >
        <h1>List To DO 😃 </h1>
        {error && <Alert severity="warning">{error}</Alert>}
        <form onSubmit={addTodo}>
         <div>  
          
         <TextField sx={{width:'60vh'}}
                    value={input}
                    onChange={(e)=>setInput(e.target.value)}
                    label="Write todo" 
                    variant="filled"
                    color="secondary" 
                    focused
          />
        
         <Button type="submit" size="large" sx={{width:'20vh'}} variant="contained" color="secondary">
         Add 
        </Button>
      
        </div>
        </form>
        <CheckboxList/>
        
          
       </Box>
      </Container>
    </React.Fragment>
  )
}
